import bgImage from '../public/indexbg2-proc.png'
import Image from 'next/image'

export default function BackgroundImage() {
  return (
    <div className="z-0 fixed bottom-px h-screen w-screen">
      <Image
        src={bgImage}
        placeholder='blur'
        layout="fill"
        objectFit="cover"
        quality={90}
      />
    </div>
  )
}
