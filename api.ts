import axios from 'axios'
// Configure API base URL - replace with your nNode API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('clerk_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export interface FlightData {
  confirmation: string
  email?: string
  phone?: string
  fullName: string
}
export interface RebookingRequest {
  customerId: string
  flightConfirmation: string
  bookingPlatform: string
  departureAirport: string
  arrivalAirport: string
  originalDepartureTime: string
  triggerReason?: string
  urgencyLevel?: string
}
// Customer Onboarding API
export const onboardCustomer = async (data: FlightData) => {
  try {
    const response = await api.post('/workflows/customer_onboarding/run', {
      inputs: {
        EMAIL_ADDRESS: data.email,
        PHONE_NUMBER: data.phone,
        FULL_NAME: data.fullName,
        FLIGHT_CONFIRMATION_EMAIL: data.email,
      }
    })
    return response.data
  } catch (error) {
    console.error('Onboarding error:', error)
    throw error
  }
}
// Smart Rebooker API
export const triggerSmartRebooker = async (data: RebookingRequest) => {
  try {
    const response = await api.post('/workflows/smart_rebooker/run', {
      inputs: {
        CUSTOMER_ID: data.customerId,
        FLIGHT_CONFIRMATION: data.flightConfirmation,
        BOOKING_PLATFORM: data.bookingPlatform,
        DEPARTURE_AIRPORT: data.departureAirport,
        ARRIVAL_AIRPORT: data.arrivalAirport,
        ORIGINAL_DEPARTURE_TIME: data.originalDepartureTime,
        TRIGGER_REASON: data.triggerReason || 'delay',
        URGENCY_LEVEL: data.urgencyLevel || 'standard'
      }
    })
    return response.data
  } catch (error) {
    console.error('Smart rebooker error:', error)
    throw error
  }
}
// Auto Rebooker API (Premium)
export const triggerAutoRebooker = async (data: {
  customerId: string
  flightConfirmation: string
  delayType: string
  currentStatus: string
}) => {
  try {
    const response = await api.post('/workflows/auto_rebooker/run', {
      inputs: {
        CUSTOMER_ID: data.customerId,
        FLIGHT_CONFIRMATION: data.flightConfirmation,
        DELAY_TYPE: data.delayType,
        CURRENT_STATUS: data.currentStatus
      }
    })
    return response.data
  } catch (error) {
    console.error('Auto rebooker error:', error)
    throw error
  }
}
// Job Status API
export const getJobStatus = async (jobId: string) => {
  try {
    const response = await api.get(`/jobs/${jobId}/status`)
    return response.data
  } catch (error) {
    console.error('Job status error:', error)
    throw error
  }
}
// Webhooks for real-time updates
export const setupFlightMonitoring = async (customerId: string) => {
  try {
    const response = await api.post('/webhooks/flight-monitor', {
      name: `monitor-${customerId}`,
      workflow_name: 'smart_rebooker',
      customer_id: customerId
    })
    return response.data
  } catch (error) {
    console.error('Webhook setup error:', error)
    throw error
  }
}
