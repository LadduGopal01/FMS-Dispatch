"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import LoadingCompleteModal from "@/components/loading-complete-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LoadingComplete {
  indentNo: string
  unloadingMunsiName: string
  partyName: string
  vehicleNo: string
  driverName: string
  commodity: string
  quality: string
  pkts: string
  bhartiSize: string
  quantity: string
  packetType: string
  packetName: string
  status2: string
}

export default function LoadingCompletePage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [loadingPoints, setLoadingPoints] = useState<any[]>([])
  const [loadingComplete, setLoadingComplete] = useState<LoadingComplete[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

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
    const storedLp = JSON.parse(localStorage.getItem("loadingPoints") || "[]")
    const storedLc = JSON.parse(localStorage.getItem("loadingComplete") || "[]")
    setLoadingPoints(storedLp)
    setLoadingComplete(storedLc)
  }

  const handleOpenModal = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleViewHistory = (item: any) => {
    setSelectedItem({ ...item, isViewMode: true })
    setIsModalOpen(true)
  }

  const handleAddLoadingComplete = (data: any) => {
    // Implementation for adding loading complete data
    const updatedLoadingComplete = [...loadingComplete, data]
    setLoadingComplete(updatedLoadingComplete)
    localStorage.setItem("loadingComplete", JSON.stringify(updatedLoadingComplete))
    setIsModalOpen(false)
  }

  if (!isClient) return null

  const pendingItems = loadingPoints.filter((lp) => !loadingComplete.find((lc) => lc.indentNo === lp.indentNo))
  const historyItems = loadingComplete

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Loading Complete Management</h1>
          <p className="text-muted-foreground mb-8">Complete loading operations and update inventory</p>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="pending">Pending ({pendingItems.length})</TabsTrigger>
              <TabsTrigger value="history">History ({historyItems.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6 space-y-4">
              {pendingItems.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  <p>No pending items</p>
                </Card>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <Card>
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Indent No</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingItems.map((item) => (
                            <tr key={item.indentNo} className="border-t border-border hover:bg-muted/50">
                              <td className="px-6 py-4 text-sm font-semibold text-primary">{item.indentNo}</td>
                              <td className="px-6 py-4 text-sm">{item.status1}</td>
                              <td className="px-6 py-4">
                                <Button size="sm" onClick={() => handleOpenModal(item)}>
                                  Complete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </div>

                  <div className="md:hidden space-y-4">
                    {pendingItems.map((item) => (
                      <Card key={item.indentNo} className="p-4">
                        <p className="text-sm font-semibold text-primary mb-3">{item.indentNo}</p>
                        <p className="text-sm mb-3">
                          <span className="font-medium">Status:</span> {item.status1}
                        </p>
                        <Button size="sm" className="w-full" onClick={() => handleOpenModal(item)}>
                          Complete
                        </Button>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-6 space-y-4">
              {historyItems.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  <p>No completed items yet</p>
                </Card>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <Card>
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Indent No</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Driver</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {historyItems.map((item) => (
                            <tr key={item.indentNo} className="border-t border-border hover:bg-muted/50">
                              <td className="px-6 py-4 text-sm font-semibold text-primary">{item.indentNo}</td>
                              <td className="px-6 py-4 text-sm">{item.driverName}</td>
                              <td className="px-6 py-4 text-sm">{item.status2}</td>
                              <td className="px-6 py-4">
                                <Button size="sm" variant="outline" onClick={() => handleViewHistory(item)}>
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </div>

                  <div className="md:hidden space-y-4">
                    {historyItems.map((item) => (
                      <Card key={item.indentNo} className="p-4">
                        <p className="text-sm font-semibold text-primary mb-2">{item.indentNo}</p>
                        <div className="space-y-1 mb-3">
                          <p className="text-xs">
                            <span className="font-medium">Driver:</span> {item.driverName}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Vehicle:</span> {item.vehicleNo}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Party:</span> {item.partyName}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Commodity:</span> {item.commodity}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Quantity:</span> {item.quantity}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Status:</span> {item.status2}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => handleViewHistory(item)}
                        >
                          View Details
                        </Button>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <LoadingCompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLoadingComplete}
        initialData={selectedItem}
      />
    </div>
  )
}
