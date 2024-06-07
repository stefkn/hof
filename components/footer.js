import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
        <div className="mt-12 ml-0 pt-6 flex flex-col lg:flex-row md:justify-around items-center absolute z-[1] w-full p-2 bg-slate-900/[.77] backdrop-blur-[12px]">
          <h2 className="no-text-shadow mb-10 text-2xl md:text-2xl font-bold tracking-tighter leading-tight font-serif text-white">
            <Link href="/" className="hover:text-teal-500">
              house of focus
            </Link>
          </h2>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/ text-slate-500">
            a digital space for focus and productivity
          </div>
          <div className="justify-center items-center lg:pl-4 lg:w-1/ lg:align-right text-slate-500 text-xs">
          Photo by <a href="https://unsplash.com/@augustinewong?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Augustine Wong</a> on <a href="https://unsplash.com/photos/silhouette-of-palm-tree-T0BYurbDK_M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
          </div>
        </div>
    </footer>
  );
}
