import {NextResponse} from 'next/server'
// import validator from 'validator'
import {z as zod} from 'zod'
import {fromZodError} from 'zod-validation-error'

import * as db from '@/app/lib/db'
import * as schema from '@/app/lib/schema'

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
    let parsedData = {}
    try {
        parsedData = await schema.insertLeadTableSchema.parse(data)
    } catch (error) {
        if (error instanceof zod.ZodError) {
            const validationError = fromZodError(error)
            return NextResponse.json({errorList: validationError}, {status: 400})
        }
        return NextResponse.json({message: "Some Server Error"}, {status: 500})
    }
    const {email} = parsedData
    if (!email) {
        return NextResponse.json({message: "A valid email is required"}, {status: 400})
    }
    const dbNow = await db.dbNow()
    const leadResult = await db.addLead({email: email})
    
    const resultData = {
        leadResult: leadResult, 
        dbNow: dbNow
    }
    return NextResponse.json(resultData, {status: 201})

}