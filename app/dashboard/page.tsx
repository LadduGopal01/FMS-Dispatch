"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Truck, CheckCircle, RotateCcw } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [stats, setStats] = useState({
    indents: 0,
    pending: 0,
    completed: 0,
    gatePasses: 0,
  })

  useEffect(() => {
    setIsClient(true)
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/")
      return
    }

    updateStats()
  }, [router])

  const updateStats = () => {
    const indents = JSON.parse(localStorage.getItem("indents") || "[]")
    const loadingPoints = JSON.parse(localStorage.getItem("loadingPoints") || "[]")
    const loadingComplete = JSON.parse(localStorage.getItem("loadingComplete") || "[]")
    const gatePass = JSON.parse(localStorage.getItem("gatePass") || "[]")

    setStats({
      indents: indents.length,
      pending: indents.length - loadingPoints.length,
      completed: loadingComplete.length,
      gatePasses: gatePass.length,
    })
  }

  const handleReset = () => {
    if (confirm("Are you sure? This will clear all data.")) {
      localStorage.setItem("indents", JSON.stringify([]))
      localStorage.setItem("loadingPoints", JSON.stringify([]))
      localStorage.setItem("loadingComplete", JSON.stringify([]))
      localStorage.setItem("gatePass", JSON.stringify([]))
      updateStats()
    }
  }

  if (!isClient) return null

  const statCards = [
    { label: "Total Indents", value: stats.indents, icon: FileText, color: "bg-blue-500/10" },
    { label: "Pending Loadings", value: stats.pending, icon: Truck, color: "bg-orange-500/10" },
    { label: "Completed Loadings", value: stats.completed, icon: CheckCircle, color: "bg-green-500/10" },
    { label: "Gate Passes", value: stats.gatePasses, icon: BarChart3, color: "bg-purple-500/10" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto md:ml-0">
        <div className="p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to Dispatch FMS</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.label} className={`p-6 ${card.color}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">{card.label}</p>
                      <p className="text-3xl font-bold mt-2">{card.value}</p>
                    </div>
                    <Icon className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Data Management</h2>
            <Button onClick={handleReset} variant="destructive">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Data
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}
