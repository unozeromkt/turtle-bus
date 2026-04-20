'use client'

async function testStorageUpload() {
  try {
    console.log('🧪 Iniciando test de Storage...')

    // 1. Verificar variables de entorno
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log('🔍 Variables de entorno:')
    console.log('  VITE_SUPABASE_URL:', url ? '✅ SET' : '❌ MISSING')
    console.log('  SUPABASE_PUBLISHABLE_KEY:', key ? '✅ SET' : '❌ MISSING')
    console.log('  SUPABASE_ANON_KEY (legacy):', anonKey ? '✅ SET' : '❌ MISSING')

    // 2. Verificar cliente Supabase
    const { supabase } = await import('@/lib/supabase')
    console.log('✅ Cliente Supabase inicializado')

    // 3. Listar buckets
    const response = await supabase.storage.listBuckets()
    if (response.error) {
      console.error('❌ Error listando buckets:', response.error)
      return
    }
    console.log('✅ Buckets disponibles:', response.data?.map(b => b.name))

    // 4. Crear archivo de test
    const testContent = 'Test image content'
    const blob = new Blob([testContent], { type: 'text/plain' })
    const file = new File([blob], 'test-image.txt', { type: 'text/plain' })

    console.log('📝 Archivo de test creado:', file.name, file.size)

    // 5. Intentar subir
    console.log('📤 Intentando subir a tour-featured bucket...')
    const { data, error } = await supabase.storage
      .from('tour-featured')
      .upload(`debug/test-${Date.now()}.txt`, file)

    if (error) {
      console.error('❌ Error en upload:', error.message)
      console.error('Details:', error)
      return
    }

    console.log('✅ Upload exitoso!')
    console.log('Ruta:', data?.path)

    // 6. Verificar que el archivo se creó
    const { data: files, error: listError } = await supabase.storage
      .from('tour-featured')
      .list('debug')

    if (listError) {
      console.error('❌ Error listando archivos:', listError)
      return
    }

    console.log('✅ Archivos en debug folder:', files?.map(f => f.name))
    console.log('🎉 Test completado exitosamente!')
  } catch (error) {
    console.error('❌ Error fatal:', error)
  }
}

export default function TestStoragePage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧪 Test de Storage</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-700">
          <strong>Instrucciones:</strong> Abre la consola del navegador (F12) y ejecuta en la consola:
        </p>
        <pre className="bg-white p-3 mt-2 rounded text-xs overflow-auto">
{`import('./test-storage-page').then(m => m.testStorageUpload())`}
        </pre>
      </div>

      <button
        onClick={() => testStorageUpload()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
      >
        ▶️ Ejecutar Test
      </button>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h2 className="font-bold mb-2">Qué verifica este test:</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Variables de entorno Supabase</li>
          <li>✓ Cliente Supabase funciona</li>
          <li>✓ Buckets están disponibles</li>
          <li>✓ Puedes subir archivos</li>
          <li>✓ Los archivos se guardan correctamente</li>
        </ul>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="font-bold text-yellow-800 mb-2">⚠️ Si falla el test:</h2>
        <ol className="space-y-2 text-sm text-yellow-700 list-decimal list-inside">
          <li>Verifica que RLS está DESHABILITADO en los buckets</li>
          <li>Confirma que los buckets existen (tour-featured, tour-gallery)</li>
          <li>Revisa las variables de entorno en .env.local</li>
          <li>Verifica permisos en Supabase Dashboard → Storage</li>
        </ol>
      </div>
    </div>
  )
}
