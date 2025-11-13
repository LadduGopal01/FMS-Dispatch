"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface GatePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: any;
  nextSerialNo: number;
}

export default function GatePassModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  nextSerialNo,
}: GatePassModalProps) {
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
  });

  const isViewMode = initialData?.isViewMode || false;

  /* ------------------------------------------------------------------ */
  /*  Reset form when modal opens / initialData / nextSerialNo changes */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        indentNo: initialData.indentNo || "",
        gatepassSerialNo:
          initialData.gatepassSerialNo ||
          `GP-${String(nextSerialNo).padStart(3, "0")}`,
        date: initialData.date || new Date().toISOString().split("T")[0],
        partyName: initialData.partyName || "",
        vehicleNo: initialData.vehicleNo || "",
        driverName: initialData.driverName || "",
        commodityType1: initialData.commodityType1 || "",
        commodityType2: initialData.commodityType2 || "",
        commodityType3: initialData.commodityType3 || "",
        totalPkts: initialData.totalPkts || "",
        packetSize: initialData.packetSize || "",
      });
    }
  }, [initialData, isOpen, nextSerialNo]);

  /* ------------------------------------------------------------------ */
  /*  Submit handler                                                    */
  /* ------------------------------------------------------------------ */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.partyName || !formData.vehicleNo) {
      alert("Please fill required fields");
      return;
    }
    onSubmit(formData);
    // reset for next open
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
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 md:p-4">
      {/* -------------------------------------------------------------- */}
      {/* Card – full height on mobile, max‑height on larger screens    */}
      {/* -------------------------------------------------------------- */}
      <Card className="w-full h-[95dvh] md:max-w-2xl md:max-h-[90vh] md:h-auto flex flex-col overflow-hidden rounded-none md:rounded-lg shadow-lg">
        {/* ==================== STICKY HEADER ==================== */}
        <header className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-border bg-card shadow-sm">
          <h2 className="text-xl font-bold">
            {isViewMode ? "View Gate Pass" : "Issue Gate Pass"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* ==================== SCROLLABLE FORM ==================== */}
        <form
          id="gatepass-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-4 md:px-6 pt-4 pb-32 md:pb-16"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ---------- Indent No (disabled) ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Indent No</label>
                <input
                  type="text"
                  placeholder="Indent No"
                  value={formData.indentNo}
                  disabled
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
                />
              </div>

              {/* ---------- Gate Pass Serial No (disabled) ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Gate Pass Serial No
                </label>
                <input
                  type="text"
                  placeholder="Gate Pass Serial No"
                  value={formData.gatepassSerialNo}
                  disabled
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
                />
              </div>

              {/* ---------- Date ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Party Name (disabled in view) ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Party Name</label>
                <input
                  type="text"
                  placeholder="Party Name"
                  value={formData.partyName}
                  disabled
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
                />
              </div>

              {/* ---------- Vehicle No (disabled in view) ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Vehicle No</label>
                <input
                  type="text"
                  placeholder="Vehicle No"
                  value={formData.vehicleNo}
                  disabled
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
                />
              </div>

              {/* ---------- Driver Name (disabled in view) ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Driver Name</label>
                <input
                  type="text"
                  placeholder="Driver Name"
                  value={formData.driverName}
                  disabled
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
                />
              </div>

              {/* ---------- Commodity Type 1 ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Commodity Type 1</label>
                <input
                  type="text"
                  placeholder="Commodity Type 1"
                  value={formData.commodityType1}
                  onChange={(e) =>
                    setFormData({ ...formData, commodityType1: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Commodity Type 2 ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Commodity Type 2</label>
                <input
                  type="text"
                  placeholder="Commodity Type 2"
                  value={formData.commodityType2}
                  onChange={(e) =>
                    setFormData({ ...formData, commodityType2: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Commodity Type 3 ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Commodity Type 3</label>
                <input
                  type="text"
                  placeholder="Commodity Type 3"
                  value={formData.commodityType3}
                  onChange={(e) =>
                    setFormData({ ...formData, commodityType3: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Total PKTS ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Total PKTS</label>
                <input
                  type="text"
                  placeholder="Total PKTS"
                  value={formData.totalPkts}
                  onChange={(e) =>
                    setFormData({ ...formData, totalPkts: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Size of Packets ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Size of Packets</label>
                <input
                  type="text"
                  placeholder="Size of Packets"
                  value={formData.packetSize}
                  onChange={(e) =>
                    setFormData({ ...formData, packetSize: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </form>

        {/* ==================== STICKY FOOTER ==================== */}
        <footer className="sticky bottom-0 z-20 border-t border-border bg-card p-4 shadow-lg">
          <div className="flex gap-3 pb-[max(env(safe-area-inset-bottom),1rem)]">
            {/* ----- Edit mode buttons ----- */}
            {!isViewMode && (
              <>
                <Button
                  type="submit"
                  form="gatepass-form"
                  className="flex-1 shadow-md hover:shadow-lg transition-shadow"
                >
                  Issue Gate Pass
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 bg-transparent shadow-md hover:shadow-lg transition-shadow"
                >
                  Cancel
                </Button>
              </>
            )}

            {/* ----- View‑only button ----- */}
            {isViewMode && (
              <Button
                type="button"
                onClick={onClose}
                className="w-full shadow-md hover:shadow-lg transition-shadow"
              >
                Close
              </Button>
            )}
          </div>
        </footer>
      </Card>
    </div>
  );
}
