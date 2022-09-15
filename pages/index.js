import Head from 'next/head'
import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Link from 'next/link'
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

          <div className="mt-20 z-1 relative max-w-md backdrop-blur-md backdrop-brightness-105 p-4 rounded-xl border md:m-auto md:max-w-3xl md:mt-32 md:float-right">
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight font-serif">
              About
            </h2>
            <p className='mt-6'>
              house of focus is an online collective dedicated to enhancing mental performance.
            </p>
            <p className='mt-6'>
              We go about our mission using a variety of means; audio, music, techniques, gadgets, "lifehacks", supplements and more. We stay on top of the current scientific literature and the latest behavioural psychology to bring you evidence-based methods of sustaining higher levels of focus, for longer.
            </p>
            <p className='mt-6'>
              We began our search in 2020, and decided to create a place where we could share and expand our knowledge publicly, and to build a community for those who want to do great work, and seek refuge from distraction, interruption and disturbance.
            </p>
          </div>

          <div className="text-xs absolute bottom-0 left-2/4 text-slate-500 -rotate-90 relative">
            Photo by <a href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </div>
        </Container>
      </Layout>
    </>
  )
}
