import { useState } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { RemoveScroll } from 'react-remove-scroll'

export function YoutubeCard({ videoId, title, description }: { videoId: string; title: string; description: string }) {
  const [isOpen, setIsOpen] = useState(null)
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
  const button = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.5, type: 'spring' } },
    exit: { opacity: 0, scale: 0.9, transition: { delay: 0 } },
  }
  return (
    <>
      <motion.div
        layoutId={videoId}
        onClick={() => setIsOpen(true)}
        className="relative z-0 cursor-pointer bg-transparent @container">
        <motion.img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          className="block aspect-video w-full object-cover"
        />
        <div className="mt-2.5 text-lg font-bold leading-tight">{title}</div>
        <div className="mt-1 line-clamp-2 text-sm">{description}</div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial="initial" animate="animate" exit="exit" className="fixed inset-0 z-50">
              <motion.div
                variants={variants}
                className="absolute inset-0 bg-white/50 bg-noise text-black backdrop-blur dark:bg-black/50 dark:text-white"></motion.div>
              <RemoveScroll className="fixed inset-0 z-50 overflow-auto">
                <div className="sticky top-0 z-10 flex h-0">
                  <motion.button
                    variants={button}
                    className="absolute right-5 top-5 cursor-pointer rounded-full border border-black/10 bg-white/50 p-2 backdrop-blur transition-colors hover:border-black/20 dark:border-white/20 dark:bg-black/50 dark:hover:border-white/30"
                    onClick={() => setIsOpen(null)}>
                    <X size={32} strokeWidth={1} />
                  </motion.button>
                </div>
                <div
                  onClick={() => setIsOpen(null)}
                  className="relative z-0 flex min-h-full w-full items-center justify-center p-5">
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    layoutId={videoId}
                    className="pointer-events-auto z-10 flex w-[90%] max-w-[1000px] flex-col">
                    <div className="overflow-hidden rounded-lg shadow-2xl">
                      <YouTubeEmbed videoid={videoId} />
                    </div>
                    <div className="pt-5">
                      <div className="text-lg font-bold leading-tight">{title}</div>
                      <div className="mt-2 text-sm">{description}</div>
                    </div>
                  </motion.div>
                </div>
              </RemoveScroll>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
