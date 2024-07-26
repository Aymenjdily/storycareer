import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params } : { params: { saveId: string } }) {
    const { userId } = auth()

    if(!userId) {
        return NextResponse.json("Unauthorized", { status: 500 })
    }

    const existingSave = await prisma.save.findUnique({
        where :{
            id: params.saveId
        }
    })

    if(!existingSave) {
        return NextResponse.json("Save not found", { status: 404 })
    }

    const deletedSave = await prisma.save.delete({
        where: {
            id: params.saveId
        }
    })

    return NextResponse.json("Save deleted", { status: 201 })
}