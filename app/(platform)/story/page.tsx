import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/data-table'
import { columns } from './_components/columns'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'

const StoryPage = async () => {
  const { userId } = auth()

  const stories = await prisma.story.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      userId: userId!
    }
  })

  return (
    <div className='flex flex-col space-y-5 w-full'>
      <div className='flex items-center justify-between '>
        <h1 className='font-semibold'>
          My stories
        </h1>
        <Link href="/story/new">
          <Button>
            <Plus className='mr-2 h-5 w-5' />
            Create new story
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable
        data={stories}
        columns={columns}
        searchValue='title'
        placeholder='Search by title...'
      />
    </div>
  )
}

export default StoryPage