"use client"

import type React from "react"

import { useState } from "react"

import { User, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify({ username, email: `${username}@dispatch.com` }))

    // Initialize data structures if they don't exist
    if (!localStorage.getItem("indents")) localStorage.setItem("indents", JSON.stringify([]))
    if (!localStorage.getItem("loadingPoints")) localStorage.setItem("loadingPoints", JSON.stringify([]))
    if (!localStorage.getItem("loadingComplete")) localStorage.setItem("loadingComplete", JSON.stringify([]))
    if (!localStorage.getItem("gatePass")) localStorage.setItem("gatePass", JSON.stringify([]))

    router.push("/dashboard")
  }

  return (
<Card className="w-full max-w-md p-5 sm:p-8 shadow-lg border">
<h1 className="text-2xl sm:text-3xl font-bold text-center text-foreground">Dispatch FMS</h1>
<p className="text-muted-foreground text-center mb-1">Fleet Management System</p>

<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

        <div className="relative">
          <label className="block text-sm font-semibold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
          />
          <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/8 text-muted-foreground" />
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
          />
          <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/8 text-muted-foreground" />
        </div>

<Button className="w-full shadow-md hover:shadow-lg transition-shadow duration-200" type="submit">
          Sign In
        </Button>
      </form>

      <p className="text-center text-muted-foreground text-sm mt-6">Demo: Use any username & password</p>
    </Card>
  )
}
