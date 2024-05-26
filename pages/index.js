import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import Kanban from '../components/kanban'
import Image from 'next/image'

import LeavesBackgroundImages from '../public/leaves.jpg'

export default function Index() {
  return (
    <>
      <div className="z-[-1] top-0 min-h-screen min-w-[200vw] md:min-w-full fixed">
        <Image
          src={LeavesBackgroundImages}
          alt="Picture of palm tree shadows on a wall"
          className='brightness-[1.1] contrast-[0.7] z-[-1] saturation-[1.6]'

          placeholder='blur'
          objectFit='cover'
          objectPosition='center'
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