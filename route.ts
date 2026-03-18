import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const { confirmation, email, fullName, phone } = body
    // Trigger nNode customer_onboarding workflow
    const workflowResponse = await fetch('https://api.nnode.ai/workflows/run', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NNODE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workflow: 'customer_onboarding',
        inputs: {
          EMAIL_ADDRESS: email,
          PHONE_NUMBER: phone,
          FULL_NAME: fullName,
          FLIGHT_CONFIRMATION_EMAIL: email,
          BOOKING_REFERENCE: confirmation
        }
      })
    })
    if (!workflowResponse.ok) {
      throw new Error('Failed to trigger onboarding workflow')
    }
    const workflowResult = await workflowResponse.json()
    // Store flight in your database
    // const flight = await db.flights.create({
    //   data: {
    //     userId,
    //     confirmation,
    //     status: 'monitoring',
    //     jobId: workflowResult.job_id
    //   }
    // })
    return NextResponse.json({
      success: true,
      jobId: workflowResult.job_id,
      message: 'Flight added successfully! Monitoring started.'
    })
  } catch (error) {
    console.error('Add flight error:', error)
    return NextResponse.json(
      { error: 'Failed to add flight' },
      { status: 500 }
    )
  }
}
// Handle nNode webhook callbacks
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { job_id, status, artifacts, workflow } = body
    if (workflow === 'smart_rebooker' && status === 'completed') {
      // Flight rebooking options found
      const notification = artifacts?.NOTIFICATION_MESSAGE
      const delivery = artifacts?.DELIVERY_CONFIRMATION
      if (notification && delivery) {
        // Send real-time notification to customer
        // You could use WebSockets, Server-Sent Events, or push notifications here
        // For now, just log it
        console.log('Rebooking options found for job:', job_id)
        console.log('Notification:', notification)
      }
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
