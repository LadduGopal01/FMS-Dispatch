"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import GatePassModal from "@/components/gate-pass-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GatePass {
  indentNo: string
  gatepassSerialNo: string
  date: string
  partyName: string
  vehicleNo: string
  driverName: string
  commodityType1: string
  commodityType2: string
  commodityType3: string
  totalPkts: string
  packetSize: string
}

export default function GatePassPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState<any[]>([])
  const [gatePasses, setGatePasses] = useState<GatePass[]>([])
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
    const storedLc = JSON.parse(localStorage.getItem("loadingComplete") || "[]")
    const storedGp = JSON.parse(localStorage.getItem("gatePass") || "[]")
    setLoadingComplete(storedLc)
    setGatePasses(storedGp)
  }

  const handleOpenModal = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleViewHistory = (item: any) => {
    setSelectedItem({ ...item, isViewMode: true })
    setIsModalOpen(true)
  }

  const handleAddGatePass = (data: GatePass) => {
    const updated = [...gatePasses, data]
    setGatePasses(updated)
    localStorage.setItem("gatePass", JSON.stringify(updated))
    setIsModalOpen(false)
  }

  if (!isClient) return null

  const pendingItems = loadingComplete.filter((lc) => !gatePasses.find((gp) => gp.indentNo === lc.indentNo))
  const historyItems = gatePasses

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gate Pass Management</h1>
          <p className="text-muted-foreground mb-8">Generate and manage gate passes for shipments</p>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="pending">Pending ({pendingItems.length})</TabsTrigger>
              <TabsTrigger value="history">History ({historyItems.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6 space-y-4">
              {pendingItems.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  <p>No pending items for gate pass</p>
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
                            <th className="px-6 py-3 text-left text-sm font-semibold">Vehicle</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingItems.map((item) => (
                            <tr key={item.indentNo} className="border-t border-border hover:bg-muted/50">
                              <td className="px-6 py-4 text-sm font-semibold text-primary">{item.indentNo}</td>
                              <td className="px-6 py-4 text-sm">{item.driverName}</td>
                              <td className="px-6 py-4 text-sm">{item.vehicleNo}</td>
                              <td className="px-6 py-4">
                                <Button size="sm" onClick={() => handleOpenModal(item)}>
                                  Issue Pass
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
                        <p className="text-sm font-semibold text-primary mb-2">{item.indentNo}</p>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Driver:</span> {item.driverName}
                        </p>
                        <p className="text-sm mb-3">
                          <span className="font-medium">Vehicle:</span> {item.vehicleNo}
                        </p>
                        <Button size="sm" className="w-full" onClick={() => handleOpenModal(item)}>
                          Issue Pass
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
                  <p>No gate passes issued yet</p>
                </Card>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <Card>
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Gate Pass No</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Indent No</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Party</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {historyItems.map((item) => (
                            <tr key={item.gatepassSerialNo} className="border-t border-border hover:bg-muted/50">
                              <td className="px-6 py-4 text-sm font-semibold text-primary">{item.gatepassSerialNo}</td>
                              <td className="px-6 py-4 text-sm">{item.indentNo}</td>
                              <td className="px-6 py-4 text-sm">{item.date}</td>
                              <td className="px-6 py-4 text-sm">{item.partyName}</td>
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
                      <Card key={item.gatepassSerialNo} className="p-4">
                        <p className="text-sm font-semibold text-primary mb-2">{item.gatepassSerialNo}</p>
                        <div className="space-y-1 mb-3">
                          <p className="text-xs">
                            <span className="font-medium">Indent No:</span> {item.indentNo}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Date:</span> {item.date}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Party:</span> {item.partyName}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Vehicle:</span> {item.vehicleNo}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Driver:</span> {item.driverName}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Total Packets:</span> {item.totalPkts}
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

      <GatePassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddGatePass}
        initialData={selectedItem}
        nextSerialNo={gatePasses.length + 1}
      />
    </div>
  )
}
