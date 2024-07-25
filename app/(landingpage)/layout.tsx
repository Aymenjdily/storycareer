import React from 'react'

const LadingPageLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div>
        navbar
        <main>
            {children}
        </main>
        footer
    </div>
  )
}

export default LadingPageLayout