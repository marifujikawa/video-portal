import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import '../styles/globals.css'
import '../styles/animations.css'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import VideoCardSkeleton from '../components/video/VideoSkeleton/VideoCardSkeleton'
import VideoDetailSkeleton from '../components/video/VideoSkeleton/VideoDetailSkeleton'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [navigationType, setNavigationType] = useState<'TO_DETAIL' | 'FROM_DETAIL' | 'OTHER'>('OTHER')

  useEffect(() => {
    const handleStart = (url: string) => {
      const currentPath = router.asPath
      const isCurrentlyOnDetailPage = currentPath.match(/^\/video\/\d+$/)
      const isGoingToDetailPage = url.match(/^\/video\/\d+$/)
     
      if (isCurrentlyOnDetailPage && !isGoingToDetailPage) {
        setNavigationType('FROM_DETAIL')
      } else if (!isCurrentlyOnDetailPage && isGoingToDetailPage) {
        setNavigationType('TO_DETAIL')
      } else {
        setNavigationType('OTHER')
      }
      
      setLoading(true)
    }
    
    const handleComplete = () => {
      setLoading(false)
      setNavigationType('OTHER')
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const showDetailSkeleton = navigationType === 'TO_DETAIL'

  return (
    <>
      <Head>
        <title>Video Portal</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <main className="container">
            {loading ? (
              showDetailSkeleton ? (
                <VideoDetailSkeleton />
              ) : (
                <div className="loading-page">
                  <div className="hero-placeholder"></div>
                  
                  {['Continuar reprodução', 'Ao vivo', 'Minha lista'].map((category, index) => (
                    <div key={`section-${index}`} className="skeleton-section">
                      <div className="skeleton-section-header">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-buttons"></div>
                      </div>
                      <div className="skeleton-grid">
                        {[...Array(6)].map((_, i) => (
                          <VideoCardSkeleton key={`global-skeleton-${category}-${i}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <Component {...pageProps} />
            )}
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
