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
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-18">
      <Card className="w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-lg border">
        <div className="flex items-center justify-center p-10 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold">Create Indent</h2>
          <button onClick={onClose} className="absolute right-6 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plant Name</label>
              <input
                type="text"
                placeholder="Enter plant name"
                value={formData.plantName}
                onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Party Name</label>
              <input
                type="text"
                placeholder="Enter party name"
                value={formData.partyName}
                onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle No</label>
              <input
                type="text"
                placeholder="Enter vehicle number"
                value={formData.vehicleNo}
                onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Commodity Type</label>
              <input
                type="text"
                placeholder="Enter commodity type"
                value={formData.commodityType}
                onChange={(e) => setFormData({ ...formData, commodityType: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">No. of PKTS</label>
              <input
                type="text"
                placeholder="Enter number of packets"
                value={formData.pkts}
                onChange={(e) => setFormData({ ...formData, pkts: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bharti Size</label>
              <input
                type="text"
                placeholder="Enter bharti size"
                value={formData.bhartiSize}
                onChange={(e) => setFormData({ ...formData, bhartiSize: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Quantity</label>
              <input
                type="text"
                placeholder="Enter total quantity"
                value={formData.totalQuantity}
                onChange={(e) => setFormData({ ...formData, totalQuantity: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Remarks</label>
            <textarea
              placeholder="Enter remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 shadow-md hover:shadow-lg transition-shadow">
              Create Indent
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent shadow-md hover:shadow-lg transition-shadow">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
