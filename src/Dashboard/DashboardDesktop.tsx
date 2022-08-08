import React from 'react'

const DashboardDesktop = ({children}:any) => {
  return (
    <main className='view'>
      <div className='container'>{children}</div>
    </main>
  )
}

export default DashboardDesktop