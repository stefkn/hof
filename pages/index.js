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

          <div className="z-1 relative">
            <p>
              Welcome to <b>house of focus.</b>
            </p>
            <p>
              We collect, curate and build things for enhancing focus, flow and productivity.
            </p>
            <b>
              For those who Do.
            </b>
          </div>

          <div className="goal-selector flex-wrap self-center object-center relative">

            <div className="goal m-auto text-center">
              <Link href={`/focus`}>
                <a class="index-button">
                  focus
                </a>
              </Link>
            </div>
            <div className="goal m-auto text-center">
              <Link href={`/learn`}>
                <a class="index-button">
                  learn
                </a>
              </Link>
            </div>
            <div className="goal m-auto text-center">
              <a class="index-button">
                shop
              </a>
            </div>
          </div>

          <div className="background-image absolute mx-auto z-0 -inset-0">
          </div>

          <div className="text-xs absolute bottom-px">
            {/* Photo by <a href="https://unsplash.com/@evieshaffer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Evie S.</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
            Photo by <a href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </div>
        </Container>
      </Layout>
    </>
  )
}
