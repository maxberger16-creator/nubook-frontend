'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import {
  PlusIcon,
  BellIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  AirplaneIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
interface Flight {
  id: string
  confirmation: string
  airline: string
  route: string
  departureTime: string
  status: 'on_time' | 'delayed' | 'cancelled' | 'monitoring'
  monitoring: boolean
}
interface Alert {
  id: string
  flightId: string
  type: 'delay' | 'cancellation' | 'rebooking_found'
  message: string
  timestamp: string
  actionRequired: boolean
}
export default function Dashboard() {
  const { user } = useUser()
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: '1',
      confirmation: 'DL2847',
      airline: 'Delta',
      route: 'JFK → LAX',
      departureTime: '2024-03-25T15:00:00Z',
      status: 'monitoring',
      monitoring: true
    }
  ])
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      flightId: '1',
      type: 'rebooking_found',
      message: 'Better rebooking options found for DL2847 - saves 2 hours!',
      timestamp: new Date().toISOString(),
      actionRequired: true
    }
  ])
  const [showAddFlight, setShowAddFlight] = useState(false)
  const [newFlight, setNewFlight] = useState({
    confirmation: '',
    email: ''
  })
  const handleAddFlight = async () => {
    if (!newFlight.confirmation) return
    // In real app, this would call your nNode customer_onboarding workflow
    const flight: Flight = {
      id: Date.now().toString(),
      confirmation: newFlight.confirmation.toUpperCase(),
      airline: 'Delta', // Would be parsed from confirmation
      route: 'JFK → LAX', // Would be parsed
      departureTime: new Date().toISOString(),
      status: 'monitoring',
      monitoring: true
    }
    setFlights([...flights, flight])
    setNewFlight({ confirmation: '', email: '' })
    setShowAddFlight(false)
    toast.success('Flight added! Monitoring started.')
  }
  const getStatusIcon = (status: Flight['status']) => {
    switch (status) {
      case 'on_time':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'delayed':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />
      case 'cancelled':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      default:
        return <AirplaneIcon className="w-5 h-5 text-blue-500" />
    }
  }
  const getStatusText = (status: Flight['status']) => {
    switch (status) {
      case 'on_time': return 'On Time'
      case 'delayed': return 'Delayed'
      case 'cancelled': return 'Cancelled'
      default: return 'Monitoring'
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Flight Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName || 'Traveler'}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <BellIcon className="w-6 h-6 text-gray-500" />
                {alerts.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </div>
              <UserButton />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">
                  {flights.length}
                </div>
                <div className="text-gray-600">Flights Monitored</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-green-600">
                  {flights.filter(f => f.status === 'on_time').length}
                </div>
                <div className="text-gray-600">On Time</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">
                  {alerts.filter(a => a.actionRequired).length}
                </div>
                <div className="text-gray-600">Action Required</div>
              </div>
            </div>
            {/* Flights List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Flights
                </h2>
                <button
                  onClick={() => setShowAddFlight(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Flight
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {flights.map((flight) => (
                  <div key={flight.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-900">
                            {flight.confirmation}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {flight.airline}
                          </span>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(flight.status)}
                            <span className={`text-sm ${
                              flight.status === 'on_time' ? 'text-green-600' :
                              flight.status === 'delayed' ? 'text-yellow-600' :
                              flight.status === 'cancelled' ? 'text-red-600' :
                              'text-blue-600'
                            }`}>
                              {getStatusText(flight.status)}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {flight.route} • {new Date(flight.departureTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          Departs {new Date(flight.departureTime).toLocaleTimeString()}
                        </div>
                        {flight.monitoring && (
                          <div className="text-xs text-green-600 mt-1">
                            ✓ Monitoring active
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Sidebar - Alerts */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Alerts
                </h2>
              </div>
              <div className="p-6">
                {alerts.length > 0 ? (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                        alert.actionRequired ? 'border-orange-500 bg-orange-50' : 'border-blue-500 bg-blue-50'
                      }`}>
                        <p className="text-sm text-gray-900 mb-2">
                          {alert.message}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                          {alert.actionRequired && (
                            <button className="text-orange-600 hover:text-orange-700 font-medium">
                              View Options
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No alerts yet. We'll notify you of any flight changes.
                  </p>
                )}
              </div>
            </div>
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Actions
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  📧 Forward confirmation email
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  ⚙️ Update preferences
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  📱 Enable SMS alerts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Flight Modal */}
      {showAddFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Add Flight to Monitor
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flight Confirmation Number
                </label>
                <input
                  type="text"
                  value={newFlight.confirmation}
                  onChange={(e) => setNewFlight({...newFlight, confirmation: e.target.value})}
                  placeholder="e.g., DL2847, AA1234"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or paste confirmation email
                </label>
                <textarea
                  value={newFlight.email}
                  onChange={(e) => setNewFlight({...newFlight, email: e.target.value})}
                  placeholder="Paste your flight confirmation email here..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddFlight}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Flight
                </button>
                <button
                  onClick={() => setShowAddFlight(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
