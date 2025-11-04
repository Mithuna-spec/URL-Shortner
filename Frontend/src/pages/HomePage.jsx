import React from 'react'
import UrlForm from '../components/UrlForm.jsx'
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        URL Shortener
                    </h1>
                    <p className="text-gray-600">
                        Shorten your long URLs in seconds
                    </p>
                </div>
                <UrlForm/>
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Simply paste your long URL and get a short link instantly!</p>
                </div>
            </div>
        </div>
  )
}
export default HomePage