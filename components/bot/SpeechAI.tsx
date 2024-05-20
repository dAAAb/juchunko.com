'use client'
import { useEffect, useState, useRef, use } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { BotMessageSquare, Minus, Bot, User, RotateCcw, MessageCircleQuestion, Send, Copy, Check } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useCompletion } from 'ai/react'
import { useLocalStorage } from 'usehooks-ts'
import Markdown from 'react-markdown'
import { usePathname } from 'next/navigation'
function Message({ from, content }: { from: 'me' | 'ai'; content: string }) {
  const [copied, setCopied] = useState(false)
  async function copyToClipboard(text: string) {
    if ('clipboard' in navigator) {
      setCopied(true)
      await navigator.clipboard.writeText(text + '🤖')
      setTimeout(() => setCopied(false), 500)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'me' ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: from === 'me' ? 50 : -50, height: 0 }}>
      <div className={twMerge('mb-2 flex w-full items-start gap-2', from === 'me' ? 'flex-row-reverse' : '')}>
        {from === 'me' && (
          <div
            className={twMerge(
              'rounded-full p-2',
              from === 'me'
                ? 'bg-gray-100 text-gray-500 shadow-inner' // from user
                : 'bg-blue-50 text-blue-500 dark:bg-white/10 dark:text-white/90', // from bot
            )}>
            {from === 'me' ? <User /> : <Bot />}
          </div>
        )}
        <div
          className={twMerge(
            'rounded-lg',
            from === 'me'
              ? 'bg-gray-200 text-gray-800' // from user
              : 'bg-blue-50 text-slate-800 dark:bg-white/10 dark:text-white/90', // from bot
          )}>
          {from === 'ai' && (
            <div className="flex items-center justify-between rounded-t-lg bg-blue-100 px-4 py-2 text-sm font-bold dark:bg-black/10">
              <div className="flex items-center gap-2">
                <Bot size={16} />
                AI 小助手
              </div>
              <button onClick={() => copyToClipboard(content)} className="hover:opacity-75 active:opacity-100">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
          <Markdown
            className={twMerge('prose prose-sm break-all px-4 py-2 text-sm', from === 'me' ? '' : 'dark:prose-invert')}>
            {content}
          </Markdown>
        </div>
      </div>
    </motion.div>
  )
}

export default function SpeechAI() {
  const filename = usePathname()
  const [hide, setHide] = useState(false)
  const y = useMotionValue(16)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const [active, setActive] = useState(false)
  const [messages, setMessages] = useLocalStorage<
    {
      content: string
      role: 'user' | 'assistant'
    }[]
  >(`speech-ai-messages-${filename}`, [])
  const { completion, input, setInput, isLoading, handleInputChange, handleSubmit } = useCompletion({
    body: {
      filename,
      messages,
    },
  })
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setMessages(messages.concat({ role: 'user', content: input }))
    setInput('')
    return handleSubmit(e)
  }
  function sendDefaultMessage(message: string) {
    setInput(message)
    setTimeout(() => {
      submitButtonRef.current?.click()
    }, 100)
  }

  useEffect(() => {
    if (completion) {
      if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
        setMessages([...messages.slice(0, -1), { role: 'assistant', content: completion }])
      } else {
        setMessages([...messages, { role: 'assistant', content: completion }])
      }
    }
  }, [completion])
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messages, active])
  useEffect(() => {
    const isDoc = !filename?.startsWith('/docs')
    setHide(isDoc)
    setActive(false)
  }, [filename])
  useEffect(() => {
    function handleScroll() {
      const footer = document.getElementById('footer')!
      const rect = footer.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const top = rect.y - windowHeight
      const isBottom = top < 0

      console.log()
      y.set(isBottom ? 16 - top : 16)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  if (hide) return null
  return (
    <>
      {active ? (
        <motion.div
          className="fixed right-4 w-[min(400px,calc(100vw-32px))]"
          key={1}
          layoutId="speech-ai"
          style={{ bottom: y }}>
          <motion.div
            className="flex items-center justify-between rounded-t-lg bg-blue-500 p-2 text-white"
            layoutId="speech-ai-header">
            <div className="flex items-center gap-2 px-2 font-semibold">
              <motion.div layoutId="speech-ai-header-icon">
                <BotMessageSquare size={24} />
              </motion.div>
              AI 小助手
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg p-2 text-white hover:bg-black/5 active:bg-black/10"
                onClick={() => setMessages([])}>
                <RotateCcw size={24} />
              </button>
              <button
                className="rounded-lg p-2 text-white hover:bg-black/5 active:bg-black/10"
                onClick={() => setActive(false)}>
                <Minus size={24} />
              </button>
            </div>
          </motion.div>
          <motion.div
            className="h-[400px] overflow-y-scroll bg-white/90 p-2 shadow-lg backdrop-blur-xl dark:bg-[#232323]/90"
            ref={messageContainerRef}>
            <Message from="ai" content="嗨，我是這個網站的 AI 小助手！有什麼可以幫助你的？" />
            <AnimatePresence>
              {messages.map((m, index) => (
                <Message from={m.role === 'user' ? 'me' : 'ai'} content={m.content} key={index} />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {!isLoading && (
                <motion.div
                  className="flex flex-col gap-2 pl-12 text-blue-800 dark:text-pink-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}>
                  {[
                    `整理這頁的重點`,
                    `提供相關的背景資訊`,
                    `這頁的主要觀點是什麼？`,
                    '可以給我這個主題的詳細解釋嗎？',
                    '幫我生成一個這段內容的問答',
                  ]
                    .filter((x) => !messages.some((m) => m.content === x))
                    .map((message, index) => (
                      <button
                        onClick={() => sendDefaultMessage(message)}
                        className="flex items-center gap-2 text-left text-sm hover:opacity-75 active:opacity-50"
                        key={index}>
                        <MessageCircleQuestion />
                        {message}
                      </button>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <form
            className="rounded-b-lg bg-slate-100/90 p-2 text-blue-800 shadow-xl backdrop-blur-xl dark:bg-[#252525]/90 dark:text-blue-100"
            onSubmit={onSubmit}>
            <div className="flex gap-2">
              <input
                className="w-full rounded-lg bg-white/90 p-2 outline-none dark:bg-white/10"
                placeholder="在此輸入文字⋯⋯"
                value={input}
                onChange={handleInputChange}
                required
              />
              <button
                type="submit"
                ref={submitButtonRef}
                className="shrink-0 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 active:bg-blue-700">
                <Send />
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div className="fixed right-4" key={0} layoutId="speech-ai" style={{ bottom: y }}>
          <motion.button
            className="rounded-lg bg-blue-500 p-4 text-white shadow-lg"
            onClick={() => setActive(true)}
            layoutId="speech-ai-header"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}>
            <motion.div layoutId="speech-ai-header-icon">
              <BotMessageSquare size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </>
  )
}
