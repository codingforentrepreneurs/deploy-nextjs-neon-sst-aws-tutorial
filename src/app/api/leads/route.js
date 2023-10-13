import {NextResponse} from 'next/server'
import * as db from '@/app/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' 
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function POST(request){ // HTTP POST
    const contentType = await request.headers.get("content-type")
    if (contentType !== "application/json") {
        return NextResponse.json({message: "Invalid request"}, {status: 415})
    }
    const data = await request.json()
    const {email} = data
    if (!email) {
        return NextResponse.json({message: "Email is required"}, {status: 400})
    }
    const dbNow = await db.dbNow()
    const leadResult = await db.addLead({email: email})
    
    const resultData = {
        leadResult: leadResult, 
        dbNow: dbNow
    }
    return NextResponse.json(resultData, {status: 201})

}