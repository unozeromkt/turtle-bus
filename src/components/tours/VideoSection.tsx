import { PlayCircle } from 'lucide-react'

interface VideoSectionProps {
  videoUrl?: string
  title?: string
}

export function VideoSection({ videoUrl, title = 'Video de la experiencia' }: VideoSectionProps) {
  if (!videoUrl) return null

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url)
      const hostname = parsedUrl.hostname.replace('www.', '')
      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)

      if (hostname === 'youtu.be') {
        const videoId = pathSegments[0]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
      }

      if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
        if (parsedUrl.pathname === '/watch') {
          const videoId = parsedUrl.searchParams.get('v')
          return videoId ? `https://www.youtube.com/embed/${videoId}` : null
        }

        if (pathSegments[0] === 'shorts' || pathSegments[0] === 'embed') {
          const videoId = pathSegments[1]
          return videoId ? `https://www.youtube.com/embed/${videoId}` : null
        }
      }

      if (hostname === 'vimeo.com' || hostname === 'player.vimeo.com') {
        const videoId = pathSegments[pathSegments.length - 1]
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null
      }
    } catch {
      return null
    }

    return null
  }

  const embedUrl = getYouTubeEmbedUrl(videoUrl)
  if (!embedUrl) return null

  return (
    <section>
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
