import Link from 'next/link'

export default function Header() {
  return (
    <div className="p-2">
      <h1 className="text-m font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 font-serif">
        <Link href="/" className="hover:underline">
          house of focus
        </Link>
      </h1>
    </div>
  );
}
