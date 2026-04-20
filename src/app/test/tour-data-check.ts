// Este archivo es para verificar que los datos se guardan y recuperan correctamente
// Copiar esta función en la consola del navegador después de hacer cambios en el admin

// Para verificar que los datos se guardaron en Supabase:
async function checkTourData() {
  const tourSlug = 'nombre-del-tour-slug' // CAMBIAR ESTO
  
  const response = await fetch(`/api/tours/${tourSlug}`)
  const data = await response.json()
  
  console.log('===== TOUR DATA CHECK =====')
  console.log('Includes:', data.includes, typeof data.includes)
  console.log('Excludes:', data.excludes, typeof data.excludes)
  console.log('Itinerary:', data.itinerary, typeof data.itinerary)
  console.log('Full tour:', data)
  
  // Verificar que son arrays
  if (Array.isArray(data.includes)) {
    console.log('✅ Includes es un array')
  } else {
    console.error('❌ Includes NO es un array:', data.includes)
  }
  
  if (Array.isArray(data.excludes)) {
    console.log('✅ Excludes es un array')
  } else if (data.excludes === null) {
    console.log('✅ Excludes es null (válido)')
  } else {
    console.error('❌ Excludes NO es un array:', data.excludes)
  }
  
  if (Array.isArray(data.itinerary)) {
    console.log('✅ Itinerary es un array')
  } else if (data.itinerary === null) {
    console.log('✅ Itinerary es null (válido)')
  } else {
    console.error('❌ Itinerary NO es un array:', data.itinerary)
  }
}

// Ejecutar: checkTourData()
