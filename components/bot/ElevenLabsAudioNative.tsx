// ElevenLabsAudioNative.tsx

'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export type ElevenLabsProps = {
  publicUserId: string
  textColorRgba?: string
  backgroundColorRgba?: string
  children?: React.ReactNode
}

export const ElevenLabsAudioNative = ({
  publicUserId,
  textColorRgba,
  backgroundColorRgba,
  children,
}: ElevenLabsProps) => {
  const [colorScheme, setColorScheme] = useState<string | null>(null)
  const pathname = usePathname()
  const isDocs = pathname?.startsWith('/docs')
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://elevenlabs.io/player/audioNativeHelper.js'
    script.async = true
    document.body.appendChild(script)

    // get colorScheme from html style
    const colorScheme = document.documentElement.style.getPropertyValue('color-scheme')
    setColorScheme(colorScheme)
    return () => {
      document.body.removeChild(script)
    }
  }, [pathname])

  return isDocs ? (
    <div
      id="elevenlabs-audionative-widget"
      data-height="90"
      data-width="100%"
      data-frameborder="no"
      data-scrolling="no"
      data-publicuserid={publicUserId}
      data-playerurl="https://elevenlabs.io/player/index.html"
      data-small="True"
      data-textcolor={colorScheme === 'light' ? 'rgba(0, 0, 0, 1.0)' : 'rgba(255, 255, 255, 1.0)'}
      data-backgroundcolor={colorScheme === 'light' ? 'rgba(255, 255, 255, 1.0)' : 'rgba(0, 0, 0, 0)'}
      key={pathname}>
      {children}
    </div>
  ) : (
    <> </>
  )
}

export default ElevenLabsAudioNative
