"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import IndentModal from "@/components/indent-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Indent {
  indentNo: string
  plantName: string
  partyName: string
  vehicleNo: string
  commodityType: string
  pkts: string
  bhartiSize: string
  totalQuantity: string
  remarks: string
}

export default function IndentPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [indents, setIndents] = useState<Indent[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nextIndentNo, setNextIndentNo] = useState(1)

  useEffect(() => {
    setIsClient(true)
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/")
      return
    }

    loadIndents()
  }, [router])

  const loadIndents = () => {
    const stored = JSON.parse(localStorage.getItem("indents") || "[]")
    setIndents(stored)
    setNextIndentNo(stored.length + 1)
  }

  const handleAddIndent = (data: Omit<Indent, "indentNo">) => {
    const newIndent: Indent = {
      ...data,
      indentNo: `IND-${String(nextIndentNo).padStart(3, "0")}`,
    }
    const updated = [...indents, newIndent]
    setIndents(updated)
    localStorage.setItem("indents", JSON.stringify(updated))
    setNextIndentNo(nextIndentNo + 1)
    setIsModalOpen(false)
  }

  if (!isClient) return null

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Indent Management</h1>
              <p className="text-muted-foreground">Create and manage indents</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Indent
            </Button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Card>
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Indent No</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Plant</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Party</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Vehicle No</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Commodity</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {indents.map((indent) => (
                    <tr key={indent.indentNo} className="border-t border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm font-semibold text-primary">{indent.indentNo}</td>
                      <td className="px-6 py-4 text-sm">{indent.plantName}</td>
                      <td className="px-6 py-4 text-sm">{indent.partyName}</td>
                      <td className="px-6 py-4 text-sm">{indent.vehicleNo}</td>
                      <td className="px-6 py-4 text-sm">{indent.commodityType}</td>
                      <td className="px-6 py-4 text-sm">{indent.totalQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {indents.map((indent) => (
              <Card key={indent.indentNo} className="p-4">
                <p className="text-sm font-semibold text-primary mb-2">{indent.indentNo}</p>
                <p className="text-sm">
                  <span className="font-medium">Plant:</span> {indent.plantName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Party:</span> {indent.partyName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Vehicle:</span> {indent.vehicleNo}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Qty:</span> {indent.totalQuantity}
                </p>
              </Card>
            ))}
          </div>

          {indents.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">
              <p>No indents created yet. Click "Create Indent" to get started.</p>
            </Card>
          )}
        </div>
      </main>

      <IndentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddIndent} />
    </div>
  )
}
