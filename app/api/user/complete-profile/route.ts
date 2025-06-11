import { NextResponse } from "next/server"
import { completeProfileSchema } from "@/lib/validator"
import { updateUser } from "@/lib/actions/user.actions"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("📦 Received in API:", body)
    const validatedData = completeProfileSchema.parse(body)

    const { day, month, year, clerkId, ...rest } = validatedData

    if (!clerkId) {
      return NextResponse.json({ error: "Missing clerkId" }, { status: 400 })
    }

    const dateOfBirth = new Date(`${year}-${month}-${day}`)

    await updateUser(clerkId, {
      ...rest,
      dateOfBirth
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
