import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import {
  Mountain,
  TreePine,
} from "lucide-react"

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
        <footer className="bg-foreground text-background py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 flex items-center gap-3">
                <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-xl">
                  <TreePine className="h-6 w-6 text-primary" />
                  <Mountain className="h-4 w-4 text-primary opacity-70" />
                </div>
                <div>
                  <p className="font-heading font-black text-xl">CodeCabin.dev</p>
                  <p className="text-sm opacity-70">Where engineering leaders gather</p>
                </div>
              </div>
              <div className="text-sm opacity-70">© 2024 CodeCabin.dev. Built with care and coffee.</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
