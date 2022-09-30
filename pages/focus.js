import Head from 'next/head'
import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import CountdownApp from '../components/countdown'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>house of focus</title>
        </Head>

        <Container>
          <Intro />
          <CountdownApp />
        </Container>
      </Layout>
    </>
  )
}

