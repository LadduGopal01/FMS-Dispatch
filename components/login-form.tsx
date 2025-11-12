"use client"

import type React from "react"

import { useState } from "react"
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
    <Card className="w-full max-w-md p-8 shadow-lg">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Dispatch FMS</h1>
      <p className="text-muted-foreground mb-8">Fleet Management System</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>

      <p className="text-center text-muted-foreground text-sm mt-6">Demo: Use any username & password</p>
    </Card>
  )
}
