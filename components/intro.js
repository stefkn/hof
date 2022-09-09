import { CMS_NAME, CMS_URL } from '../lib/constants'
import Link from 'next/link'

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 font-serif">
        <Link href={`/`}>
          <a className="hover:underline">house of focus</a>
        </Link>
      </h1>
      <h4 className="text-right md:text-right text-lg mt-5 md:pl-8 font-sans">
        Live right in your mind.
      </h4>
    </section>
  )
}
