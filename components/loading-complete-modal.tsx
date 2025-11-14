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

  /* ------------------------------------------------------------------ */
  /*  Reset form when modal opens / initialData changes                 */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (initialData && isOpen) {
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

  /* ------------------------------------------------------------------ */
  /*  Submit handler                                                    */
  /* ------------------------------------------------------------------ */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.driverName || !formData.status2) {
      alert("Please fill required fields");
      return;
    }
    onSubmit(formData);
    // reset for next open
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
            {isViewMode ? "View Loading Complete" : "Mark Loading Complete"}
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
          id="loading-complete-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-4 md:px-6 pt-4 pb-20 md:pb-6"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ---------- Indent No (disabled) ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Indent No</label>
                <input
                  type="text"
                  placeholder="Enter indent number"
                  value={formData.indentNo}
                  disabled
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
                />
              </div>

              {/* ---------- Munsi Name ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Munsi Name</label>
                <select
                  value={formData.unloadingMunsiName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unloadingMunsiName: e.target.value,
                    })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : "bg-white"
                  }`}
                >
                  <option value="">Select Munsi Name</option>
                  <option value="FM PANDA">FM PANDA</option>
                  <option value="SAHOO">SAHOO</option>
                  <option value="SUMAN">SUMAN</option>
                  <option value="KASHA">KASHA</option>
                  <option value="TULSI">TULSI</option>
                  <option value="BANCHHOR">BANCHHOR</option>
                  <option value="VINAY">VINAY</option>
                </select>
              </div>

              {/* ---------- Party Name ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Party Name</label>
                <input
                  type="text"
                  placeholder="Enter party name"
                  value={formData.partyName}
                  onChange={(e) =>
                    setFormData({ ...formData, partyName: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Vehicle No ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Vehicle No</label>
                <input
                  type="text"
                  placeholder="Enter vehicle number"
                  value={formData.vehicleNo}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleNo: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Driver Name (required) ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Driver Name</label>
                <input
                  type="text"
                  placeholder="Enter driver name"
                  value={formData.driverName}
                  onChange={(e) =>
                    setFormData({ ...formData, driverName: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Commodity ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Commodity</label>
                <select
                  value={formData.commodity}
                  onChange={(e) =>
                    setFormData({ ...formData, commodity: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : "bg-white"
                  }`}
                >
                  <option value="">Select Commodity</option>
                  <option value="PADDY MOTA">PADDY MOTA</option>
                  <option value="PADDY NEW">PADDY NEW</option>
                  <option value="PADDY IR">PADDY IR</option>
                  <option value="CMR (FRK BOILED)">CMR (FRK BOILED)</option>
                  <option value="CMR (NON FRK BOILED)">
                    CMR (NON FRK BOILED)
                  </option>
                  <option value="CMR (FRK RAW)">CMR (FRK RAW)</option>
                  <option value="CMR (NON FRK RAW)">CMR (NON FRK RAW)</option>
                  <option value="RICE (FRK BOILED)">RICE (FRK BOILED)</option>
                  <option value="RICE (NON FRK BOILED)">
                    RICE (NON FRK BOILED)
                  </option>
                  <option value="RICE (FRK RAW)">RICE (FRK RAW)</option>
                  <option value="RICE (NON FRK RAW)">RICE (NON FRK RAW)</option>
                  <option value="MURI RICE">MURI RICE</option>
                  <option value="REJECTION (BOILED)">REJECTION (BOILED)</option>
                  <option value="REJECTION (RAW)">REJECTION (RAW)</option>
                  <option value="REJECTION (MURI)">REJECTION (MURI)</option>
                  <option value="BROKEN (RAW SORTEX)">
                    BROKEN (RAW SORTEX)
                  </option>
                  <option value="BROKEN (RAW NON SORTEX)">
                    BROKEN (RAW NON SORTEX)
                  </option>
                  <option value="BROKEN (BOILED)">BROKEN (BOILED)</option>
                  <option value="RICE BRAN (BOILED)">RICE BRAN (BOILED)</option>
                  <option value="RICE BRAN (RAW)">RICE BRAN (RAW)</option>
                  <option value="RICE BRAN (MURI)">RICE BRAN (MURI)</option>
                  <option value="RICE BRAN (MURI SILKY)">
                    RICE BRAN (MURI SILKY)
                  </option>
                  <option value="HUSK">HUSK</option>
                  <option value="PELLETS (8 MM RICE HUSK)">
                    PELLETS (8 MM RICE HUSK)
                  </option>
                  <option value="PELLETS (8 MM SAW DUST)">
                    PELLETS (8 MM SAW DUST)
                  </option>
                  <option value="PELLETS (8 MM GROUNDNUT)">
                    PELLETS (8 MM GROUNDNUT)
                  </option>
                  <option value="PELLETS (8 MM RICE HUSK & GROUNDNUT)">
                    PELLETS (8 MM RICE HUSK & GROUNDNUT)
                  </option>
                  <option value="PELLETS (16 MM RICE HUSK)">
                    PELLETS (16 MM RICE HUSK)
                  </option>
                  <option value="PELLETS (16 MM GROUNDNUT)">
                    PELLETS (16 MM GROUNDNUT)
                  </option>
                  <option value="PELLETS (16 MM RICE HUSK & GROUNDNUT)">
                    PELLETS (16 MM RICE HUSK & GROUNDNUT)
                  </option>
                  <option value="BRIQUETTE (90 MM RICE HUSK)">
                    BRIQUETTE (90 MM RICE HUSK)
                  </option>
                  <option value="BRIQUETTE (90 MM GROUNDNUT)">
                    BRIQUETTE (90 MM GROUNDNUT)
                  </option>
                  <option value="BRIQUETTE (90 MM SAWDUST)">
                    BRIQUETTE (90 MM SAWDUST)
                  </option>
                  <option value="BRIQUETTE (90 MM RICE HUSK & GROUNDNUT)">
                    BRIQUETTE (90 MM RICE HUSK & GROUNDNUT)
                  </option>
                  <option value="KAJU CHILKA">KAJU CHILKA</option>
                  <option value="RAKHAD">RAKHAD</option>
                  <option value="PLASTIC PKT">PLASTIC PKT</option>
                  <option value="JUTE PKT">JUTE PKT</option>
                  <option value="MOTA KUNDA">MOTA KUNDA</option>
                </select>
              </div>

              {/* ---------- Quality ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Quality</label>
                <input
                  type="text"
                  placeholder="Enter quality"
                  value={formData.quality}
                  onChange={(e) =>
                    setFormData({ ...formData, quality: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- No. of PKTS ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">No. of PKTS</label>
                <input
                  type="text"
                  placeholder="Enter number of packets"
                  value={formData.pkts}
                  onChange={(e) =>
                    setFormData({ ...formData, pkts: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Bharti Size ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Bharti Size</label>
                <input
                  type="text"
                  placeholder="Enter bharti size"
                  value={formData.bhartiSize}
                  onChange={(e) =>
                    setFormData({ ...formData, bhartiSize: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Quantity ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Quantity</label>
                <input
                  type="text"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Packet Type ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Packet Type</label>
                <input
                  type="text"
                  placeholder="Enter packet type"
                  value={formData.packetType}
                  onChange={(e) =>
                    setFormData({ ...formData, packetType: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>

              {/* ---------- Packet Name ---------- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Packet Name</label>
                <input
                  type="text"
                  placeholder="Enter packet name"
                  value={formData.packetName}
                  onChange={(e) =>
                    setFormData({ ...formData, packetName: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>
            </div>

            {/* ---------- Status (required) ---------- */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status2}
                onChange={(e) =>
                  setFormData({ ...formData, status2: e.target.value })
                }
                disabled={isViewMode}
                className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  isViewMode ? "bg-muted" : "bg-white"
                }`}
              >
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
              </select>
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
                  form="loading-complete-form"
                  className="flex-1 shadow-md hover:shadow-lg transition-shadow"
                >
                  Mark Complete
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
