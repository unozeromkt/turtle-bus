'use client'

import { useRef, useState } from 'react'
import { Play } from 'lucide-react'

export function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play()
    setPlaying(true)
  }

  return (
    <div className="relative aspect-[9/16] max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
      <video
        ref={videoRef}
        src="/videos/guatapeaventura.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        preload="metadata"
        playsInline
        controls={playing}
        onEnded={() => setPlaying(false)}
      />

      {/* Cover overlay — visible until play */}
      {!playing && (
        <button
          type="button"
          aria-label="Reproducir video"
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center group cursor-pointer"
          style={{
            background:
              'linear-gradient(160deg, rgba(0,0,0,0.25) 0%, rgba(90,115,50,0.55) 50%, rgba(0,0,0,0.65) 100%)',
          }}
        >
          {/* Pulsing ring */}
          <span className="absolute w-24 h-24 rounded-full bg-white/10 animate-ping" />

          {/* Play button */}
          <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-orange/80 group-hover:border-accent-orange group-hover:shadow-[0_0_40px_rgba(242,131,29,0.65)]">
            <Play size={32} className="text-white fill-white translate-x-0.5" />
          </span>

          {/* Label */}
          <span className="mt-5 text-white text-xs font-black uppercase tracking-[0.2em] opacity-75 group-hover:opacity-100 transition-opacity">
            Ver aventura
          </span>
        </button>
      )}
    </div>
  )
}
