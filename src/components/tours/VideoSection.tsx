import { PlayCircle } from 'lucide-react'

interface VideoSectionProps {
  videoUrl?: string
  title?: string
}

export function VideoSection({ videoUrl, title = 'Video de la experiencia' }: VideoSectionProps) {
  if (!videoUrl) return null

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = ''
    
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0] || ''
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
    } else if (url.includes('vimeo.com/')) {
      videoId = url.split('vimeo.com/')[1]?.split('?')[0] || ''
      return `https://player.vimeo.com/video/${videoId}`
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  const embedUrl = getYouTubeEmbedUrl(videoUrl)
  if (!embedUrl) return null

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlayCircle size={28} className="text-accent-orange" />
        {title}
      </h2>
      
      <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg">
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="Tour video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
