"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface LoadingCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: any;
}

export default function LoadingCompleteModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: LoadingCompleteModalProps) {
  const [formData, setFormData] = useState({
    indentNo: "",
    unloadingMunsiName: "",
    partyName: "",
    vehicleNo: "",
    driverName: "",
    commodity: "",
    quality: "",
    pkts: "",
    bhartiSize: "",
    quantity: "",
    packetType: "",
    packetName: "",
    status2: "",
  });

  const isViewMode = initialData?.isViewMode || false;

  useEffect(() => {
    if (initialData) {
      setFormData({
        indentNo: initialData.indentNo || "",
        unloadingMunsiName: initialData.unloadingMunsiName || "",
        partyName: initialData.partyName || "",
        vehicleNo: initialData.vehicleNo || "",
        driverName: initialData.driverName || "",
        commodity: initialData.commodity || "",
        quality: initialData.quality || "",
        pkts: initialData.pkts || "",
        bhartiSize: initialData.bhartiSize || "",
        quantity: initialData.quantity || "",
        packetType: initialData.packetType || "",
        packetName: initialData.packetName || "",
        status2: initialData.status2 || "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.driverName || !formData.status2) {
      alert("Please fill required fields");
      return;
    }
    onSubmit(formData);
    setFormData({
      indentNo: "",
      unloadingMunsiName: "",
      partyName: "",
      vehicleNo: "",
      driverName: "",
      commodity: "",
      quality: "",
      pkts: "",
      bhartiSize: "",
      quantity: "",
      packetType: "",
      packetName: "",
      status2: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 md:p-4">
      <Card className="w-full h-full md:max-w-2xl md:max-h-[90vh] md:h-auto overflow-y-auto rounded-none md:rounded-lg">
        <div className="flex items-center justify-between p-10 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold">
            {isViewMode ? "View Loading Complete" : "Mark Loading Complete"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
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
              placeholder="Unloading Munsi Name"
              value={formData.unloadingMunsiName}
              onChange={(e) =>
                setFormData({ ...formData, unloadingMunsiName: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Party Name"
              value={formData.partyName}
              onChange={(e) =>
                setFormData({ ...formData, partyName: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Vehicle No"
              value={formData.vehicleNo}
              onChange={(e) =>
                setFormData({ ...formData, vehicleNo: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Driver Name"
              value={formData.driverName}
              onChange={(e) =>
                setFormData({ ...formData, driverName: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Commodity"
              value={formData.commodity}
              onChange={(e) =>
                setFormData({ ...formData, commodity: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Quality"
              value={formData.quality}
              onChange={(e) =>
                setFormData({ ...formData, quality: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="No. of PKTS"
              value={formData.pkts}
              onChange={(e) =>
                setFormData({ ...formData, pkts: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Bharti Size"
              value={formData.bhartiSize}
              onChange={(e) =>
                setFormData({ ...formData, bhartiSize: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Types of Packets"
              value={formData.packetType}
              onChange={(e) =>
                setFormData({ ...formData, packetType: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Packet Name"
              value={formData.packetName}
              onChange={(e) =>
                setFormData({ ...formData, packetName: e.target.value })
              }
              disabled={isViewMode}
              className={`px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isViewMode ? "bg-muted" : ""
              }`}
            />
          </div>

          <input
            type="text"
            placeholder="Status2"
            value={formData.status2}
            onChange={(e) =>
              setFormData({ ...formData, status2: e.target.value })
            }
            disabled={isViewMode}
            className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              isViewMode ? "bg-muted" : ""
            }`}
          />

          <div className="flex gap-3 pt-4">
            {!isViewMode && (
              <>
                <Button type="submit" className="flex-1">
                  Mark Complete
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 bg-transparent"
                >
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
  );
}
