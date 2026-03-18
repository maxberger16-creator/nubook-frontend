'use client'
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])
  const features = [
    {
      icon: ClockIcon,
      title: "5-Minute Response",
      description: "Get rebooking options in minutes, not hours on hold with airlines"
    },
    {
      icon: GlobeAltIcon,
      title: "Search All Airlines",
      description: "We check every airline, not just your original booking"
    },
    {
      icon: CurrencyDollarIcon,
      title: "Smart Recommendations",
      description: "AI matches your preferences: speed vs cost vs comfort"
    }
  ]
  const testimonials = [
    {
      text: "Saved me 4 hours when my Delta flight was cancelled. Found a better United option before Delta even offered alternatives.",
      author: "Sarah M., Business Traveler"
    },
    {
      text: "The auto-rebooking feature is game-changing. Woke up to find my delayed flight automatically rebooked to arrive 2 hours earlier.",
      author: "Mike R., Frequent Flyer"
    }
  ]
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl">
              Never Get Stuck by
              <span className="text-blue-600"> Flight Delays</span> Again
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered flight monitoring that finds better rebooking options faster than airline customer service.
              Get proactive alerts and personalized alternatives before you even know there's a problem.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <SignUpButton mode="modal">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                  Start Free Trial
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Why nubook Beats Airline Customer Service
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We're faster, smarter, and cover more options than calling the airline
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              How nubook Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Forward Confirmation", desc: "Email us your flight confirmation" },
              { step: "2", title: "AI Monitors 24/7", desc: "We track delays before you know about them" },
              { step: "3", title: "Smart Alternatives", desc: "AI finds better options across all airlines" },
              { step: "4", title: "Instant Notifications", desc: "Get SMS/email with booking links" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Loved by Travelers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl">
                <p className="text-lg mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-gray-400">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Pricing */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0/month",
                features: ["Flight monitoring", "Email alerts", "Manual rebooking help"],
                cta: "Start Free"
              },
              {
                name: "Smart",
                price: "$9/month",
                features: ["Everything in Free", "SMS alerts", "AI rebooking recommendations", "Priority support"],
                cta: "Most Popular",
                popular: true
              },
              {
                name: "Auto",
                price: "$29/month",
                features: ["Everything in Smart", "Automatic rebooking", "Refund processing", "24/7 concierge"],
                cta: "Go Premium"
              }
            ].map((plan, index) => (
              <div key={index} className={`rounded-xl p-8 border-2 ${
                plan.popular ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'
              }`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  {plan.price}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <SignUpButton mode="modal">
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    {plan.cta}
                  </button>
                </SignUpButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
