import React from 'react'
import Navbar from './_components/navbar'
import Footer from './_components/footer'

const LadingPageLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
        <Navbar />
        <main className='h-full'>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default LadingPageLayout