import Head from 'next/head'
import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import CountdownApp from '../components/countdown'
import BackgroundImage from '../components/bg-image'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>house of focus</title>
        </Head>
        <BackgroundImage />
        <Container>
          <Intro />
          <CountdownApp />
        </Container>
      </Layout>
    </>
  )
}

