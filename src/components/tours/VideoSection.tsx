import { PlayCircle } from 'lucide-react'

interface VideoSectionProps {
  videoUrl?: string
  title?: string
}

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/

export function VideoSection({ videoUrl, title = 'Video de la experiencia' }: VideoSectionProps) {
  if (!videoUrl) return null

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    const normalizedUrl = url.trim()

    if (!normalizedUrl) {
      return null
    }

    if (YOUTUBE_ID_REGEX.test(normalizedUrl)) {
      return `https://www.youtube-nocookie.com/embed/${normalizedUrl}?rel=0&modestbranding=1&playsinline=1`
    }

    const urlWithProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(normalizedUrl)
      ? normalizedUrl
      : `https://${normalizedUrl}`

    try {
      const parsedUrl = new URL(urlWithProtocol)
      const hostname = parsedUrl.hostname.replace('www.', '')
      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)

      const buildYouTubeEmbedUrl = (videoId?: string | null) => {
        if (!videoId || !YOUTUBE_ID_REGEX.test(videoId)) {
          return null
        }

        return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`
      }

      if (hostname === 'youtu.be') {
        return buildYouTubeEmbedUrl(pathSegments[0])
      }

      if (hostname === 'youtube.com' || hostname === 'm.youtube.com' || hostname === 'youtube-nocookie.com') {
        if (parsedUrl.pathname === '/watch') {
          return buildYouTubeEmbedUrl(parsedUrl.searchParams.get('v'))
        }

        if (pathSegments[0] === 'shorts' || pathSegments[0] === 'embed') {
          return buildYouTubeEmbedUrl(pathSegments[1])
        }

        if (pathSegments[0] === 'live') {
          return buildYouTubeEmbedUrl(pathSegments[1])
        }
      }

      if (hostname === 'vimeo.com' || hostname === 'player.vimeo.com') {
        const videoId = pathSegments[pathSegments.length - 1]
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null
      }
    } catch {
      const youtubeMatch = normalizedUrl.match(
        /(?:youtube\.com\/(?:shorts|embed|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      )

      if (youtubeMatch?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1&playsinline=1`
      }

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
