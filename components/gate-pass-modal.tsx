"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface GatePassModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData: any
  nextSerialNo: number
}

export default function GatePassModal({ isOpen, onClose, onSubmit, initialData, nextSerialNo }: GatePassModalProps) {
  const [formData, setFormData] = useState({
    indentNo: "",
    gatepassSerialNo: "",
    date: new Date().toISOString().split("T")[0],
    partyName: "",
    vehicleNo: "",
    driverName: "",
    commodityType1: "",
    commodityType2: "",
    commodityType3: "",
    totalPkts: "",
    packetSize: "",
  })

  const isViewMode = initialData?.isViewMode || false

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        indentNo: initialData.indentNo || "",
        gatepassSerialNo: initialData.gatepassSerialNo || `GP-${String(nextSerialNo).padStart(3, "0")}`,
        date: initialData.date || new Date().toISOString().split("T")[0],
        partyName: initialData.partyName || "",
        vehicleNo: initialData.vehicleNo || "",
        driverName: initialData.driverName || "",
        commodityType1: initialData.commodityType1 || "",
        commodityType2: initialData.commodityType2 || "",
        commodityType3: initialData.commodityType3 || "",
        totalPkts: initialData.totalPkts || "",
        packetSize: initialData.packetSize || "",
      })
    }
  }, [initialData, isOpen, nextSerialNo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.partyName || !formData.vehicleNo) {
      alert("Please fill required fields")
      return
    }
    onSubmit(formData)
    setFormData({
      indentNo: "",
      gatepassSerialNo: "",
      date: new Date().toISOString().split("T")[0],
      partyName: "",
      vehicleNo: "",
      driverName: "",
      commodityType1: "",
      commodityType2: "",
      commodityType3: "",
      totalPkts: "",
      packetSize: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold">{isViewMode ? "View Gate Pass" : "Issue Gate Pass"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Indent No"
              value={formData.indentNo}
              disabled
              className="px-4 py-2 border border-border rounded-lg bg-muted"
            />
            <input
              type="text"
              placeholder="Gate Pass Serial No"
              value={formData.gatepassSerialNo}
              disabled
              className="px-4 py-2 border border-border rounded-lg bg-muted"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${isViewMode ? "bg-muted" : ""}`}
            />
            <input
              type="text"
              placeholder="Party Name"
              value={formData.partyName}
              disabled
              className="px-4 py-2 border border-border rounded-lg bg-muted"
            />
            <input
              type="text"
              placeholder="Vehicle No"
              value={formData.vehicleNo}
              disabled
              className="px-4 py-2 border border-border rounded-lg bg-muted"
            />
            <input
              type="text"
              placeholder="Driver Name"
              value={formData.driverName}
              disabled
              className="px-4 py-2 border border-border rounded-lg bg-muted"
            />
            <input
              type="text"
              placeholder="Commodity Type 1"
              value={formData.commodityType1}
              onChange={(e) => setFormData({ ...formData, commodityType1: e.target.value })}
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${isViewMode ? "bg-muted" : ""}`}
            />
            <input
              type="text"
              placeholder="Commodity Type 2"
              value={formData.commodityType2}
              onChange={(e) => setFormData({ ...formData, commodityType2: e.target.value })}
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${isViewMode ? "bg-muted" : ""}`}
            />
            <input
              type="text"
              placeholder="Commodity Type 3"
              value={formData.commodityType3}
              onChange={(e) => setFormData({ ...formData, commodityType3: e.target.value })}
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${isViewMode ? "bg-muted" : ""}`}
            />
            <input
              type="text"
              placeholder="Total PKTS"
              value={formData.totalPkts}
              onChange={(e) => setFormData({ ...formData, totalPkts: e.target.value })}
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${isViewMode ? "bg-muted" : ""}`}
            />
            <input
              type="text"
              placeholder="Size of Packets"
              value={formData.packetSize}
              onChange={(e) => setFormData({ ...formData, packetSize: e.target.value })}
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${isViewMode ? "bg-muted" : ""}`}
            />
          </div>

          <div className="flex gap-3 pt-4">
            {!isViewMode && (
              <>
                <Button type="submit" className="flex-1">
                  Issue Gate Pass
                </Button>
                <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </>
            )}
            {isViewMode && (
              <Button type="button" onClick={onClose} className="w-full">
                Close
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
