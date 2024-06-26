import { BsThreads, BsFacebook, BsInstagram, BsTiktok, BsYoutube, BsTwitterX } from 'react-icons/bs'
import Assistant from './bot/Assistant'
function SoicalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-600 active:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 dark:active:text-gray-100">
      {children}
    </a>
  )
}
export default function Footer() {
  return (
    <>
      <Assistant />
      <div
        className="border-t border-gray-200 bg-gray-50 py-6 dark:border-neutral-800 dark:bg-neutral-900 print:bg-transparent"
        id="footer">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center justify-between gap-6 px-4 lg:flex-row-reverse">
          <div className="flex gap-6">
            <SoicalLink href="https://fb.com/dr.juchunko/">
              <BsFacebook className="h-6 w-6" />
            </SoicalLink>
            <SoicalLink href="https://instagr.am/dr.juchunko/">
              <BsInstagram className="h-6 w-6" />
            </SoicalLink>
            <SoicalLink href="https://tiktok.com/@dr.juchunko">
              <BsTiktok className="h-6 w-6" />
            </SoicalLink>
            <SoicalLink href="https://threads.net/@dr.juchunko">
              <BsThreads className="h-6 w-6" />
            </SoicalLink>
            <SoicalLink href="https://youtube.com/@dr.juchunko">
              <BsYoutube className="h-6 w-6" />
            </SoicalLink>
            <SoicalLink href="https://x.com/@dAAAb">
              <BsTwitterX className="h-6 w-6" />
            </SoicalLink>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">©2024 JUCHUNKO.COM All rights reserved.</div>
        </div>
      </div>
    </>
  )
}
