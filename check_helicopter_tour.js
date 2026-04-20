const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ogduawqbqpbgcunrvumu.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY  // Use environment variable

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkTour() {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select(`
        id,
        slug,
        title,
        includes,
        excludes,
        itinerary,
        tour_faqs (id, question, answer),
        testimonials (id, author, content, rating)
      `)
      .eq('slug', 'tour-guatape-helicoptero')
      .single()

    if (error) throw error
    
    console.log('========== TOUR DEL HELICÓPTERO EN SUPABASE ==========')
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkTour()
