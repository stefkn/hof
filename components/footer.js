import Container from './container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="mt-96 ml-1/2 flex flex-col lg:flex-row items-center absolute z-[1]">
          <h2 className="no-text-shadow mb-10 text-6xl md:text-7xl font-bold tracking-tighter leading-tight font-serif text-white">
            <Link href="/">
              <a className="hover:text-teal-500">house of focus</a>
            </Link>
          </h2>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/ text-white">
            your oasis in a world of distraction.
          </div>
        </div>
      </Container>
      <div className="bg-slate-900 w-full h-screen z-1 relative"></div>
    </footer>
  )
}
