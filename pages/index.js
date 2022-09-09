import Head from 'next/head'
import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>house of focus</title>
        </Head>
        <Container>
          <Intro />

          <div className="goal-selector flex-wrap self-center object-center relative">
            <div className="goal m-auto w-40 text-center">
              <h2 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight font-serif my-20">
                <Link href={`/focus`}>
                  <a className="hover:underline text-shadow">focus</a>
                </Link>
              </h2>
            </div>
            <div className="goal m-auto w-40 text-center">
              <h2 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight font-serif my-20">
                <Link href={`/learn`}>
                  <a className="hover:underline text-shadow">learn</a>
                </Link>
              </h2>
            </div>
            <div className="goal m-auto w-40 text-center">
              <h2 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight font-serif my-20">
                <Link href={`/shop`}>
                  <a className="hover:underline text-shadow">shop</a>
                </Link>
              </h2>
            </div>
          </div>

          <div className="background-image absolute mx-auto z-0 -inset-0">
          </div>

          <div className="text-xs">
            Photo by <a href="https://unsplash.com/@evieshaffer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Evie S.</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </div>
        </Container>
      </Layout>
    </>
  )
}
