import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { reference } = await req.json() //extract reference from request body

        if (!reference) {
            return NextResponse.json({ error: "Transaction reference is required" }, { status: 400 })
        }

        const response = await fetch(`https;??api.paystack.co/transaction/verify/${reference}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            }
        })
        
        const data = await response.json()

        if (data.status && data.data.status === "success") {
            return NextResponse.json({ success: true, data: data.data }, { status: 200 })
        } else {
            return NextResponse.json({ success: false, error: "Transaction verification failed" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 500 })
    }
}