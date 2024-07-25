import React from 'react'
import Navbar from './_components/navbar'

const LadingPageLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
        <Navbar />
        <main className='h-full'>
            {children}
        </main>
        footer
    </div>
  )
}

export default LadingPageLayout