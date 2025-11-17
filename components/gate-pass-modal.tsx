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

/* ============================================================= */
/*  COMMODITY DATA – 12 Types + Sub-Types                        */
/* ============================================================= */
const COMMODITY_TYPES = [
  { value: "Paddy", label: "Paddy" },
  { value: "Muri Rice", label: "Muri Rice" },
  { value: "Rice", label: "Rice" },
  { value: "Solvent Plant", label: "Solvent Plant" },
  { value: "Rejection", label: "Rejection" },
  { value: "Biomass", label: "Biomass" },
  { value: "CMR", label: "CMR" },
  { value: "Husk", label: "Husk" },
  { value: "Mota Kunda", label: "Mota Kunda" },
  { value: "Gunny", label: "Gunny" },
  { value: "Plastic Pkt", label: "Plastic Pkt" },
  { value: "Jute Pkt", label: "Jute Pkt" },
] as const;

type CommodityType = (typeof COMMODITY_TYPES)[number]["value"];

const COMMODITY_SUBTYPES: Record<
  CommodityType,
  { value: string; label: string }[]
> = {
  Paddy: [
    { value: "PADDY MOTA", label: "PADDY MOTA" },
    { value: "PADDY NEW", label: "PADDY NEW" },
    { value: "PADDY IR", label: "PADDY IR" },
  ],
  "Muri Rice": [{ value: "MURI RICE", label: "MURI RICE" }],
  Rice: [
    { value: "RICE (FRK BOILED)", label: "RICE (FRK BOILED)" },
    { value: "RICE (NON FRK BOILED)", label: "RICE (NON FRK BOILED)" },
    { value: "RICE (FRK RAW)", label: "RICE (FRK RAW)" },
    { value: "RICE (NON FRK RAW)", label: "RICE (NON FRK RAW)" },
    { value: "BROKEN (RAW SORTEX)", label: "BROKEN (RAW SORTEX)" },
    { value: "BROKEN (RAW NON SORTEX)", label: "BROKEN (RAW NON SORTEX)" },
    { value: "BROKEN (BOILED)", label: "BROKEN (BOILED)" },
    { value: "RICE BRAN (BOILED)", label: "RICE BRAN (BOILED)" },
    { value: "RICE BRAN (RAW)", label: "RICE BRAN (RAW)" },
    { value: "RICE BRAN (MURI)", label: "RICE BRAN (MURI)" },
    { value: "RICE BRAN (MURI SILKY)", label: "RICE BRAN (MURI SILKY)" },
  ],
  "Solvent Plant": [
    { value: "KAJU CHILKA", label: "KAJU CHILKA" },
    { value: "RAKHAD", label: "RAKHAD" },
  ],
  Rejection: [
    { value: "REJECTION (BOILED)", label: "REJECTION (BOILED)" },
    { value: "REJECTION (RAW)", label: "REJECTION (RAW)" },
    { value: "REJECTION (MURI)", label: "REJECTION (MURI)" },
  ],
  Biomass: [
    { value: "PELLETS (8 MM RICE HUSK)", label: "PELLETS (8 MM RICE HUSK)" },
    { value: "PELLETS (8 MM SAW DUST)", label: "PELLETS (8 MM SAW DUST)" },
    { value: "PELLETS (8 MM GROUNDNUT)", label: "PELLETS (8 MM GROUNDNUT)" },
    {
      value: "PELLETS (8 MM RICE HUSK & GROUNDNUT)",
      label: "PELLETS (8 MM RICE HUSK & GROUNDNUT)",
    },
    { value: "PELLETS (16 MM RICE HUSK)", label: "PELLETS (16 MM RICE HUSK)" },
    { value: "PELLETS (16 MM GROUNDNUT)", label: "PELLETS (16 MM GROUNDNUT)" },
    {
      value: "PELLETS (16 MM RICE HUSK & GROUNDNUT)",
      label: "PELLETS (16 MM RICE HUSK & GROUNDNUT)",
    },
    {
      value: "BRIQUETTE (90 MM RICE HUSK)",
      label: "BRIQUETTE (90 MM RICE HUSK)",
    },
    {
      value: "BRIQUETTE (90 MM GROUNDNUT)",
      label: "BRIQUETTE (90 MM GROUNDNUT)",
    },
    { value: "BRIQUETTE (90 MM SAWDUST)", label: "BRIQUETTE (90 MM SAWDUST)" },
    {
      value: "BRIQUETTE (90 MM RICE HUSK & GROUNDNUT)",
      label: "BRIQUETTE (90 MM RICE HUSK & GROUNDNUT)",
    },
  ],
  CMR: [
    { value: "CMR (FRK BOILED)", label: "CMR (FRK BOILED)" },
    { value: "CMR (NON FRK BOILED)", label: "CMR (NON FRK BOILED)" },
    { value: "CMR (FRK RAW)", label: "CMR (FRK RAW)" },
    { value: "CMR (NON FRK RAW)", label: "CMR (NON FRK RAW)" },
  ],
  Husk: [{ value: "HUSK", label: "HUSK" }],
  "Mota Kunda": [{ value: "MOTA KUNDA", label: "MOTA KUNDA" }],
  Gunny: [{ value: "JUTE PKT", label: "JUTE PKT" }],
  "Plastic Pkt": [{ value: "PLASTIC PKT", label: "PLASTIC PKT" }],
  "Jute Pkt": [{ value: "JUTE PKT", label: "JUTE PKT" }],
};

/* ============================================================= */
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
    billWeight: "",
    cmrNumber: "",
    transporterDetails: "",
    commodityType1: "",
    commoditySubType1: "",
    commodityType2: "",
    commoditySubType2: "",
    commodityType3: "",
    commoditySubType3: "",
    totalPkts: "",
    totalQty: "",
    packetSize: "",
    bhartiSize: "",
    netWeight: "",
    rate: "",
    invoiceValue: "",
    invoiceNumber: "",
    lot: "",
    unloadingWeight: "",
  });

  const isViewMode = !!initialData?.isViewMode;
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<
    Array<{ id: string; gatepassSerialNo: string; date: string }>
  >([]);

  /* --------------------- Load History --------------------- */
  useEffect(() => {
    if (isOpen) {
      const saved = JSON.parse(localStorage.getItem("gatePass") || "[]");
      const recent = saved.slice(-5).map((gp: any) => ({
        id: gp.id,
        gatepassSerialNo: gp.gatepassSerialNo,
        date: gp.date,
      }));
      setHistory(recent);
    }
  }, [isOpen]);

  /* --------------------- Reset / Fill Form --------------------- */
  useEffect(() => {
    if (initialData && isOpen) {
      const defaultSerial = `GP-${String(nextSerialNo).padStart(3, "0")}`;
      setFormData({
        indentNo: initialData.indentNo ?? "",
        gatepassSerialNo: initialData.gatepassSerialNo ?? defaultSerial,
        date: initialData.date ?? new Date().toISOString().split("T")[0],
        partyName: initialData.partyName ?? "",
        vehicleNo: initialData.vehicleNo ?? "",
        driverName: initialData.driverName ?? "",
        driverNumber: initialData.driverNumber ?? "",
        billDetails: initialData.billDetails ?? "",
        billWeight: initialData.billWeight ?? "",
        cmrNumber: initialData.cmrNumber ?? "",
        transporterDetails: initialData.transporterDetails ?? "",
        commodityType1: initialData.commodityType1 ?? "",
        commoditySubType1: initialData.commoditySubType1 ?? "",
        commodityType2: initialData.commodityType2 ?? "",
        commoditySubType2: initialData.commoditySubType2 ?? "",
        commodityType3: initialData.commodityType3 ?? "",
        commoditySubType3: initialData.commoditySubType3 ?? "",
        totalPkts: initialData.totalPkts ?? "",
        totalQty: initialData.totalQty ?? "",
        packetSize: initialData.packetSize ?? "",
        bhartiSize: initialData.bhartiSize ?? "",
        netWeight: initialData.netWeight ?? "",
        rate: initialData.rate ?? "",
        invoiceValue: initialData.invoiceValue ?? "",
        invoiceNumber: initialData.invoiceNumber ?? "",
        lot: initialData.lot ?? "",
        unloadingWeight: initialData.unloadingWeight ?? "",
      });
    }
  }, [initialData, isOpen, nextSerialNo]);

  /* --------------------- Submit Handler --------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.partyName || !formData.vehicleNo) {
      alert("Please fill required fields");
      return;
    }
    onSubmit(formData);
    // reset
    setFormData({
      indentNo: "",
      gatepassSerialNo: `GP-${String(nextSerialNo + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      partyName: "",
      vehicleNo: "",
      driverName: "",
      driverNumber: "",
      billDetails: "",
      billWeight: "",
      cmrNumber: "",
      transporterDetails: "",
      commodityType1: "",
      commoditySubType1: "",
      commodityType2: "",
      commoditySubType2: "",
      commodityType3: "",
      commoditySubType3: "",
      totalPkts: "",
      totalQty: "",
      packetSize: "",
      bhartiSize: "",
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

  /* --------------------- Helper: Sub-Type Options --------------------- */
  const getSubTypes = (type: string) =>
    type && COMMODITY_SUBTYPES[type as CommodityType]
      ? COMMODITY_SUBTYPES[type as CommodityType]
      : [];

  /* --------------------- Load Full History Item --------------------- */
  const loadHistoryItem = (id: string) => {
    const saved = JSON.parse(localStorage.getItem("gatePass") || "[]");
    const full = saved.find((gp: any) => gp.id === id);
    if (full) {
      setFormData({ ...full, isViewMode: true });
      setShowHistory(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 md:p-4">
      <Card className="w-full h-[95dvh] md:max-w-3xl md:max-h-[90vh] md:h-auto flex flex-col overflow-hidden rounded-none md:rounded-lg shadow-lg">
        {/* ==================== HEADER ==================== */}
        <header className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-border bg-card shadow-sm">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              {isViewMode ? "View Gate Pass" : "Issue Gate Pass"}
            </h2>

            {/* History button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowHistory((v) => !v)}
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
                        onClick={() => loadHistoryItem(item.id)}
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

        {/* ==================== FORM ==================== */}
        <form
          id="gatepass-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-4 md:px-6 pt-4 pb-32 md:pb-16"
        >
          <div className="space-y-6">
            {/* Responsive grid */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* ---- Date ---- */}
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
              {/* ---- Indent No ---- */}
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
              {/* ---- Gate Pass Serial No ---- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Gate Pass Serial No
                </label>
                <input
                  type="text"
                  placeholder="Gate Pass Serial No"
                  value={formData.gatepassSerialNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gatepassSerialNo: e.target.value,
                    })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>
              {/* ---- Party Name ---- */}
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
              {/* ==================== COMMODITY 1 ==================== */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Commodity Type 1</label>
                <select
                  value={formData.commodityType1}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({
                      ...formData,
                      commodityType1: val,
                      commoditySubType1: "",
                    });
                  }}
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : "bg-white"
                  }`}
                >
                  <option value="">Select Type</option>
                  {COMMODITY_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Commodity Sub-Type 1
                </label>
                <select
                  value={formData.commoditySubType1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commoditySubType1: e.target.value,
                    })
                  }
                  disabled={isViewMode || !formData.commodityType1}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode || !formData.commodityType1
                      ? "bg-muted"
                      : "bg-white"
                  }`}
                >
                  <option value="">
                    {formData.commodityType1
                      ? "Select Sub-Type"
                      : "Select Type First"}
                  </option>
                  {getSubTypes(formData.commodityType1).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* ==================== COMMODITY 2 ==================== */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Commodity Type 2</label>
                <select
                  value={formData.commodityType2}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({
                      ...formData,
                      commodityType2: val,
                      commoditySubType2: "",
                    });
                  }}
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : "bg-white"
                  }`}
                >
                  <option value="">Select Type</option>
                  {COMMODITY_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Commodity Sub-Type 2
                </label>
                <select
                  value={formData.commoditySubType2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commoditySubType2: e.target.value,
                    })
                  }
                  disabled={isViewMode || !formData.commodityType2}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode || !formData.commodityType2
                      ? "bg-muted"
                      : "bg-white"
                  }`}
                >
                  <option value="">
                    {formData.commodityType2
                      ? "Select Sub-Type"
                      : "Select Type First"}
                  </option>
                  {getSubTypes(formData.commodityType2).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* ==================== COMMODITY 3 ==================== */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Commodity Type 3</label>
                <select
                  value={formData.commodityType3}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({
                      ...formData,
                      commodityType3: val,
                      commoditySubType3: "",
                    });
                  }}
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : "bg-white"
                  }`}
                >
                  <option value="">Select Type</option>
                  {COMMODITY_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Commodity Sub-Type 3
                </label>
                <select
                  value={formData.commoditySubType3}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commoditySubType3: e.target.value,
                    })
                  }
                  disabled={isViewMode || !formData.commodityType3}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode || !formData.commodityType3
                      ? "bg-muted"
                      : "bg-white"
                  }`}
                >
                  <option value="">
                    {formData.commodityType3
                      ? "Select Sub-Type"
                      : "Select Type First"}
                  </option>
                  {getSubTypes(formData.commodityType3).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* ---- Transporter Type ---- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Transporter Type</label>
                <select
                  value={formData.transporterDetails}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transporterDetails: e.target.value,
                    })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : "bg-white"
                  }`}
                >
                  <option value="">Select Transporter Type</option>
                  <option value="Transport Vehicle">Transport Vehicle</option>
                  <option value="Party Vehicle">Party Vehicle</option>
                  <option value="Company Vehicle">Company Vehicle</option>
                </select>
              </div>
              {/* ---- Vehicle No ---- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Vehicle No</label>
                <input
                  type="text"
                  placeholder="Vehicle No"
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
              {/* ---- Total PKTS ---- */}
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
              {/* ---- Bharti Size ---- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Bharti Size</label>
                <input
                  type="text"
                  placeholder="Bharti Size"
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
              {/* ---- Net Weight ---- */}
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
              {/* ---- Rate ---- */}
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
              </div>{" "}
              {/* ---- Bill Details ---- */}
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
              {/* ---- Bill Weight ---- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Bill Weight (kg)</label>
                <input
                  type="number"
                  placeholder="Bill Weight"
                  value={formData.billWeight}
                  onChange={(e) =>
                    setFormData({ ...formData, billWeight: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>
                            {/* ---- Invoice Number ---- */}
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
                            {/* ---- Invoice Value ---- */}
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
              {/* ---- Driver Name ---- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Driver Name</label>
                <input
                  type="text"
                  placeholder="Driver Name"
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
              {/* ---- Driver Number ---- */}
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
                            {/* ---- Unloading Weight ---- */}
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
              {/* ---- CMR Number ---- */}
              <div className="space-y-1">
                <label className="text-sm font-medium">CMR Number</label>
                <input
                  type="text"
                  placeholder="CMR/Consignment Note Number"
                  value={formData.cmrNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cmrNumber: e.target.value })
                  }
                  disabled={isViewMode}
                  className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    isViewMode ? "bg-muted" : ""
                  }`}
                />
              </div>
              {/* ---- Total Quantity ---- */}
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
              {/* ---- Size of Packets ---- */}
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


              {/* ---- Lot ---- */}
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

            </div>
          </div>
        </form>

        {/* ==================== FOOTER ==================== */}
        <footer className="sticky bottom-0 z-20 border-t border-border bg-card p-4 shadow-lg">
          <div className="flex gap-3 pb-[max(env(safe-area-inset-bottom),1rem)]">
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
