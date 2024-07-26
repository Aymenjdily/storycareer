import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params } : { params : { storyId: string } }) {
    const { userId } = auth()

    if(!userId) {
        return NextResponse.json("Unauthorized", { status: 500 })
    }

    const body = await req.json()

    const existingStory = await prisma.story.findUnique({
        where :{
            id: params.storyId
        }
    })

    if(!existingStory) {
        return NextResponse.json("Story not found", { status: 404 })
    }

    const updatedStory = await prisma.story.update
    ({
        where: {
            id: params.storyId
        },
        data: {
            ...body
        }
    })

    return NextResponse.json(updatedStory, { status: 201 })
}

export async function DELETE(req: NextRequest, { params } : { params : { storyId: string } }) {
    const { userId } = auth()

    if(!userId) {
        return NextResponse.json("Unauthorized", { status: 500 })
    }

    const existingStory = await prisma.story.findUnique({
        where :{
            id: params.storyId
        }
    })

    if(!existingStory) {
        return NextResponse.json("Story not found", { status: 404 })
    }

    const deletedStory = await prisma.story.delete({
        where: {
            id: params.storyId
        }
    })

    return NextResponse.json("Story deleted", { status: 201 })
}