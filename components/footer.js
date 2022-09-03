import Container from './container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
        <h2 className="mb-10 text-6xl md:text-7xl font-bold tracking-tighter leading-tight font-serif text-white">
          <Link href="/">
            <a className="hover:underline">house of focus</a>
          </Link>
        </h2>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/ text-white">
          your oasis in a world of distraction.
        </div>
        </div>
      </Container>
    </footer>
  )
}
