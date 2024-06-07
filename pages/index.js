import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import Kanban from '../components/kanban/kanban'
import Image from 'next/image'

import LeavesBackgroundImages from '../public/leaves.jpg'

export default function Index() {
  return (
    <>
      <div className="z-[-1] top-0 min-h-screen min-w-[200vw] md:min-w-full fixed">
        <Image
          src={LeavesBackgroundImages}
          alt="Picture of palm tree shadows on a wall"
          className='brightness-[0.7] contrast-[0.54] z-[-1] hue-rotate-[-174deg] invert-[1] saturate-[2.2]'
          placeholder='blur'
        />
      </div>
      <Layout>
        <Head>
          <title>house of focus</title>
        </Head>

        <div className="z-10 block relative">
          <Container>
            <Kanban />
          </Container>
        </div>
      </Layout>
    </>
  )
}