import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "CodeCabin.dev | Engineering Leadership Stories",
  description:
    "A cozy corner of the internet for engineering leaders. Real stories, practical wisdom, and honest reflections from the trenches of software development.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <footer className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-200 mt-16">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg text-orange-900 mb-4">CodeCabin.dev</h3>
                <p className="text-orange-700 leading-relaxed">
                  A cozy corner for engineering leaders sharing real stories and practical wisdom.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-900 mb-4">Connect</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-orange-700 hover:text-orange-900 transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="block text-orange-700 hover:text-orange-900 transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="block text-orange-700 hover:text-orange-900 transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-orange-900 mb-4">Subscribe</h4>
                <p className="text-orange-700 mb-4">Get new stories delivered to your inbox</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-orange-200 mt-8 pt-8 text-center text-orange-600">
              <p>&copy; 2024 CodeCabin.dev. Built with care for the engineering community.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
