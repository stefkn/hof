import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import Kanban from '../components/kanban'
import Image from 'next/image'

import LeavesBackgroundImages from '../public/leaves.jpg'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>house of focus</title>
        </Head>

        <div className="fixed z-[-1] w-full h-full top-0">
          <Image
            src={LeavesBackgroundImages}
            alt="Picture of palm tree shadows on a wall"
            quality={100}
            layout="fill"
            className='brightness-[1.1] contrast-[0.7] z-[-1] saturation-[1.6] object-cover'
            placeholder='blur'
            priority={true}
          />
        </div>

        <div className="z-10 block relative">
          <Container>
            <Kanban />
          </Container>
        </div>
      </Layout>
    </>
  )
}