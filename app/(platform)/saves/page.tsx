import React from 'react'
import { auth } from '@clerk/nextjs/server';

const SavesPage = async () => {
    const { userId } = auth()

    const saves = await

  return (
    <div>SavesPage</div>
  )
}

export default SavesPage