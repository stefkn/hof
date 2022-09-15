import Link from 'next/link'

export default function Intro() {
  return (
    <section className="
    -z-20
    fixed rotate-[-90deg] top-[7rem] left-[-5rem]
    flex-col flex items-left
    md:relative md:flex-row md:justify-between md:top-0 md:left-0 md:rotate-0 md:mt-16 md:mb-16 md:mb-12">
      <h1 className="
        text-6xl
        font-serif
        font-bold
        tracking-tighter
        leading-tight

        md:text-8xl
        md:pr-8
      ">
        <Link href={`/`}>
          <a className="hover:text-teal-500">
            house of focus
          </a>
        </Link>
      </h1>
      <h4 className="
        text-left
        font-sans
        text-md
        mt-0

        md:text-right
        md:pl-8
        md:mt-20
        z-10
      ">
        Live right in your mind.
      </h4>
    </section>
  )
}
