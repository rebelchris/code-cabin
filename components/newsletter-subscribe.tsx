"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail, Loader2 } from "lucide-react"

interface NewsletterSubscribeProps {
  className?: string
  variant?: "default" | "compact" | "inline"
}

export function NewsletterSubscribe({ className, variant = "default" }: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe")
      }

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to my newsletter.",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "compact") {
    return (
      <div className={`rounded-xl border border-border/50 bg-card p-4 shadow-sm ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/70">
            <Mail className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-foreground">Stay Updated</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Get the latest posts delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full"
          />
          <Button type="submit" disabled={isLoading} size="sm" className="w-full">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    )
  }

  // Default variant
  return (
    <div className={`rounded-xl border border-border/50 bg-card p-6 shadow-sm ${className}`}>
      <div className="text-center mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/70 mx-auto mb-4">
          <Mail className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Subscribe to Newsletter
        </h3>
        <p className="text-muted-foreground">
          Get the latest posts and insights delivered directly to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-full"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Subscribing...
            </>
          ) : (
            "Subscribe Now"
          )}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        No spam, unsubscribe at any time.
      </p>
    </div>
  )
}
