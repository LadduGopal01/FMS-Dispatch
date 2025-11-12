"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import LoadingPointModal from "@/components/loading-point-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LoadingPoint {
  indentNo: string
  vehicleReached: string
  status1: string
}

export default function LoadingPointPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [indents, setIndents] = useState<any[]>([])
  const [loadingPoints, setLoadingPoints] = useState<LoadingPoint[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndent, setSelectedIndent] = useState<string>("")

  useEffect(() => {
    setIsClient(true)
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/")
      return
    }

    loadData()
  }, [router])

  const loadData = () => {
    const storedIndents = JSON.parse(localStorage.getItem("indents") || "[]")
    const storedLp = JSON.parse(localStorage.getItem("loadingPoints") || "[]")
    setIndents(storedIndents)
    setLoadingPoints(storedLp)
  }

  const handleOpenModal = (indentNo: string) => {
    setSelectedIndent(indentNo)
    setIsModalOpen(true)
  }

  const handleAddLoadingPoint = (data: LoadingPoint) => {
    const updated = [...loadingPoints, data]
    setLoadingPoints(updated)
    localStorage.setItem("loadingPoints", JSON.stringify(updated))
    setIsModalOpen(false)
  }

  if (!isClient) return null

  const pendingIndents = indents.filter((i) => !loadingPoints.find((lp) => lp.indentNo === i.indentNo))
  const historyItems = loadingPoints

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Loading Point Management</h1>
          <p className="text-muted-foreground mb-8">Manage loading operations at the loading point</p>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="pending">Pending ({pendingIndents.length})</TabsTrigger>
              <TabsTrigger value="history">History ({historyItems.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6 space-y-4">
              {pendingIndents.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  <p>No pending indents</p>
                </Card>
              ) : (
                <div className="hidden md:block overflow-x-auto">
                  <Card>
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Indent No</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Plant</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Party</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingIndents.map((indent) => (
                          <tr key={indent.indentNo} className="border-t border-border hover:bg-muted/50">
                            <td className="px-6 py-4 text-sm font-semibold text-primary">{indent.indentNo}</td>
                            <td className="px-6 py-4 text-sm">{indent.plantName}</td>
                            <td className="px-6 py-4 text-sm">{indent.partyName}</td>
                            <td className="px-6 py-4">
                              <Button size="sm" onClick={() => handleOpenModal(indent.indentNo)}>
                                Process
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-6 space-y-4">
              {historyItems.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  <p>No history yet</p>
                </Card>
              ) : (
                <div className="hidden md:block overflow-x-auto">
                  <Card>
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Indent No</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Vehicle Reached</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyItems.map((item) => (
                          <tr key={item.indentNo} className="border-t border-border hover:bg-muted/50">
                            <td className="px-6 py-4 text-sm font-semibold text-primary">{item.indentNo}</td>
                            <td className="px-6 py-4 text-sm">{item.vehicleReached}</td>
                            <td className="px-6 py-4 text-sm">{item.status1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <LoadingPointModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLoadingPoint}
        indentNo={selectedIndent}
      />
    </div>
  )
}
