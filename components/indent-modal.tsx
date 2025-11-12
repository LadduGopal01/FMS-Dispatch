"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface IndentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function IndentModal({ isOpen, onClose, onSubmit }: IndentModalProps) {
  const [formData, setFormData] = useState({
    plantName: "",
    partyName: "",
    vehicleNo: "",
    commodityType: "",
    pkts: "",
    bhartiSize: "",
    totalQuantity: "",
    remarks: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).some((val) => !val)) {
      alert("Please fill all fields")
      return
    }
    onSubmit(formData)
    setFormData({
      plantName: "",
      partyName: "",
      vehicleNo: "",
      commodityType: "",
      pkts: "",
      bhartiSize: "",
      totalQuantity: "",
      remarks: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold">Create Indent</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Plant Name"
              value={formData.plantName}
              onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Party Name"
              value={formData.partyName}
              onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Vehicle No"
              value={formData.vehicleNo}
              onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Commodity Type"
              value={formData.commodityType}
              onChange={(e) => setFormData({ ...formData, commodityType: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="No. of PKTS"
              value={formData.pkts}
              onChange={(e) => setFormData({ ...formData, pkts: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Bharti Size"
              value={formData.bhartiSize}
              onChange={(e) => setFormData({ ...formData, bhartiSize: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Total Quantity"
              value={formData.totalQuantity}
              onChange={(e) => setFormData({ ...formData, totalQuantity: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <textarea
            placeholder="Remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Create Indent
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
