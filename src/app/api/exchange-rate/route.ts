import { NextResponse } from 'next/server'

export const revalidate = 21600

type TrmRecord = {
  valor?: string
  vigenciadesde?: string
  vigenciahasta?: string
}

const TRM_ENDPOINT = 'https://www.datos.gov.co/resource/32sa-8pi3.json?%24limit=10&%24order=vigenciadesde%20DESC'

function parseTrmValue(value: string | undefined) {
  if (!value) {
    return null
  }

  const parsed = Number.parseFloat(value.replace(/,/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}

function pickCurrentRecord(records: TrmRecord[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    records.find((record) => {
      if (!record.vigenciadesde) {
        return false
      }

      const startDate = new Date(record.vigenciadesde)
      startDate.setHours(0, 0, 0, 0)
      return startDate.getTime() <= today.getTime()
    }) ?? records[0]
  )
}

export async function GET() {
  try {
    const response = await fetch(TRM_ENDPOINT, {
      next: { revalidate },
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`TRM request failed with status ${response.status}`)
    }

    const records = (await response.json()) as TrmRecord[]
    const currentRecord = pickCurrentRecord(records)
    const trm = parseTrmValue(currentRecord?.valor)

    if (!trm) {
      throw new Error('TRM value missing in response')
    }

    return NextResponse.json({
      trm,
      validFrom: currentRecord?.vigenciadesde ?? null,
      validTo: currentRecord?.vigenciahasta ?? null,
    })
  } catch (error) {
    console.error('Error fetching TRM:', error)

    return NextResponse.json(
      {
        trm: null,
        validFrom: null,
        validTo: null,
      },
      { status: 200 }
    )
  }
}