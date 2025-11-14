"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Clock } from "lucide-react";

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
    driverNumber: "",
    billDetails: "",
    transporterDetails: "",
    commodityType1: "",
    commodityType2: "",
    commodityType3: "",
    totalPkts: "",
    totalQty: "",
    packetSize: "",
    netWeight: "",
    rate: "",
    invoiceValue: "",
    invoiceNumber: "",
    lot: "",
    unloadingWeight: "",
  });

  const isViewMode = initialData?.isViewMode || false;
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<
    Array<{ id: string; gatepassSerialNo: string; date: string }>
  >([]);

  // Load history when modal opens
  useEffect(() => {
    if (isOpen) {
      const savedGatePasses = JSON.parse(
        localStorage.getItem("gatePass") || "[]"
      );
      // Get last 5 gate passes for history
      const recentGatePasses = savedGatePasses.slice(-5).map((gp: any) => ({
        id: gp.id,
        gatepassSerialNo: gp.gatepassSerialNo,
        date: gp.date,
      }));
      setHistory(recentGatePasses);
    }
  }, [isOpen]);

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
        driverNumber: initialData.driverNumber || "",
        billDetails: initialData.billDetails || "",
        transporterDetails: initialData.transporterDetails || "",
        commodityType1: initialData.commodityType1 || "",
        commodityType2: initialData.commodityType2 || "",
        commodityType3: initialData.commodityType3 || "",
        totalPkts: initialData.totalPkts || "",
        totalQty: initialData.totalQty || "",
        packetSize: initialData.packetSize || "",
        netWeight: initialData.netWeight || "",
        rate: initialData.rate || "",
        invoiceValue: initialData.invoiceValue || "",
        invoiceNumber: initialData.invoiceNumber || "",
        lot: initialData.lot || "",
        unloadingWeight: initialData.unloadingWeight || "",
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
      driverNumber: "",
      billDetails: "",
      transporterDetails: "",
      commodityType1: "",
      commodityType2: "",
      commodityType3: "",
      totalPkts: "",
      totalQty: "",
      packetSize: "",
      netWeight: "",
      rate: "",
      invoiceValue: "",
      invoiceNumber: "",
      lot: "",
      unloadingWeight: "",
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
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              {isViewMode ? "View Gate Pass" : "Issue Gate Pass"}
            </h2>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-muted-foreground hover:text-foreground"
                title="View history"
              >
                <Clock className="w-4 h-4" />
              </button>
              {showHistory && history.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-border z-10">
                  <div className="p-2 border-b border-border">
                    <p className="text-sm font-medium text-slate-700">
                      Recent Gate Passes
                    </p>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {history.map((item) => (
                      <button
                        key={item.id}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors"
                        onClick={() => {
                          // Find the full gate pass data
                          const fullData = JSON.parse(
                            localStorage.getItem("gatePass") || "[]"
                          ).find((gp: any) => gp.id === item.id);
                          if (fullData) {
                            setFormData({
                              ...formData,
                              ...fullData,
                              isViewMode: true,
                            });
                            setShowHistory(false);
                          }
                        }}
                      >
                        <div className="font-medium">
                          {item.gatepassSerialNo}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.date}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

              {/* ---------- Driver Number ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Driver Number</label>
                <input
                  type="text"
                  placeholder="Driver's Contact Number"
                  value={formData.driverNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, driverNumber: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Bill Details ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Bill Details</label>
                <input
                  type="text"
                  placeholder="Bill/Invoice Details"
                  value={formData.billDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, billDetails: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Transporter Details ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Transporter Details
                </label>
                <input
                  type="text"
                  placeholder="Transporter Name/Company"
                  value={formData.transporterDetails}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transporterDetails: e.target.value,
                    })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
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

              {/* ---------- Total Quantity ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Total Quantity</label>
                <input
                  type="text"
                  placeholder="Total Quantity"
                  value={formData.totalQty}
                  onChange={(e) =>
                    setFormData({ ...formData, totalQty: e.target.value })
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

              {/* ---------- Net Weight ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Net Weight (kg)</label>
                <input
                  type="number"
                  placeholder="Net Weight"
                  value={formData.netWeight}
                  onChange={(e) =>
                    setFormData({ ...formData, netWeight: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Rate ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Rate (₹)</label>
                <input
                  type="number"
                  placeholder="Rate per unit"
                  value={formData.rate}
                  onChange={(e) =>
                    setFormData({ ...formData, rate: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Invoice Value ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Invoice Value (₹)</label>
                <input
                  type="number"
                  placeholder="Invoice Value"
                  value={formData.invoiceValue}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceValue: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Invoice Number ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Invoice Number</label>
                <input
                  type="text"
                  placeholder="Invoice Number"
                  value={formData.invoiceNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNumber: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Lot ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Lot Number</label>
                <input
                  type="text"
                  placeholder="Lot Number"
                  value={formData.lot}
                  onChange={(e) =>
                    setFormData({ ...formData, lot: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Unloading Weight ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Unloading Weight (kg)
                </label>
                <input
                  type="number"
                  placeholder="Unloading Weight"
                  value={formData.unloadingWeight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unloadingWeight: e.target.value,
                    })
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
