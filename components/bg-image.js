import bgImage from '../public/indexbg2-proc.png'
import Image from 'next/image'

export default function BackgroundImage() {
  return (
    <div className="z-0 fixed bottom-px h-screen w-screen pointer-events-none">
      <Image
        className='pointer-events-none opacity-95 brightness-110'
        src={bgImage}
        layout="fill"
        objectFit="cover"
        quality={50}
        placeholder="blur"
        priority
      />
    </div>
  )
}
