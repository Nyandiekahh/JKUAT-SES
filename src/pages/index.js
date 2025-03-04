// File: src/pages/index.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Preloader from '@/components/Preloader'
import HomePage from '@/components/HomePage'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating content loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Society of Engineering Students - JKUAT</title>
        <meta name="description" content="The official website of the Society of Engineering Students at Jomo Kenyatta University of Agriculture and Technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {loading && <Preloader />}
      <HomePage />
    </>
  )
}