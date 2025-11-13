"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface IndentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function IndentModal({
  isOpen,
  onClose,
  onSubmit,
}: IndentModalProps) {
  const [formData, setFormData] = useState({
    plantName: "",
    partyName: "",
    vehicleNo: "",
    commodityType: "",
    pkts: "",
    bhartiSize: "",
    totalQuantity: "",
    remarks: "",
    officeDispatcherName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => !val)) {
      alert("Please fill all fields");
      return;
    }
    onSubmit(formData);
    setFormData({
      plantName: "",
      partyName: "",
      vehicleNo: "",
      commodityType: "",
      pkts: "",
      bhartiSize: "",
      totalQuantity: "",
      remarks: "",
      officeDispatcherName: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Full height card with dynamic viewport */}
      <Card className="w-full max-w-2xl h-[95dvh] md:h-auto md:max-h-[95vh] flex flex-col overflow-hidden shadow-lg border">
        {/* ===== STICKY HEADER ===== */}
        <header className="sticky top-0 z-20 flex items-center justify-center p-4 border-b border-border bg-card shadow-sm">
          <h2 className="text-xl font-bold">Create Indent</h2>
          <button
            onClick={onClose}
            className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* ===== SCROLLABLE CONTENT (with padding for header/footer) ===== */}
        <form
          id="indent-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-4 md:px-6 pt-4 pb-20 md:pb-6" // pb-20 reserves space for sticky footer
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* === Plant Name === */}
              <div>
                <label className="block text-sm font-medium mb-2">Plant Name</label>
                <select
                  value={formData.plantName}
                  onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-white"
                >
                  <option value="">Select Plant</option>
                  <option value="Shree Shyamji Paddy Processing Pvt Ltd">
                    Shree Shyamji Paddy Processing Pvt Ltd
                  </option>
                  <option value="Laddu Gopal Industries">Laddu Gopal Industries</option>
                  <option value="Radhe Govind Food Products">Radhe Govind Food Products</option>
                  <option value="Pellet Plant">Pellet Plant</option>
                </select>
              </div>

              {/* === Office Dispatcher === */}
              <div>
                <label className="block text-sm font-medium mb-2">Office Dispatcher Name</label>
                <select
                  value={formData.officeDispatcherName}
                  onChange={(e) =>
                    setFormData({ ...formData, officeDispatcherName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-white"
                >
                  <option value="">Select Office Dispatcher</option>
                  <option value="MNG. BHAGABA">MNG. BHAGABA</option>
                  <option value="CRM ASHOK">CRM ASHOK</option>
                  <option value="PYARI">PYARI</option>
                  <option value="MANISH (UP)">MANISH (UP)</option>
                  <option value="BINAY">BINAY</option>
                </select>
              </div>

              {/* === Party Name === */}
              <div>
                <label className="block text-sm font-medium mb-2">Party Name</label>
                <input
                  type="text"
                  placeholder="Enter party name"
                  value={formData.partyName}
                  onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* === Vehicle No === */}
              <div>
                <label className="block text-sm font-medium mb-2">Vehicle No</label>
                <input
                  type="text"
                  placeholder="Enter vehicle number"
                  value={formData.vehicleNo}
                  onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* === Commodity Type === */}
              <div>
                <label className="block text-sm font-medium mb-2">Commodity Type</label>
                <select
                  value={formData.commodityType}
                  onChange={(e) => setFormData({ ...formData, commodityType: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-white"
                >
                  <option value="">Select Commodity Type</option>
                  <option value="PADDY MOTA">PADDY MOTA</option>
                  <option value="PADDY NEW">PADDY NEW</option>
                  <option value="PADDY IR">PADDY IR</option>
                  <option value="CMR (FRK BOILED)">CMR (FRK BOILED)</option>
                  <option value="CMR (NON FRK BOILED)">CMR (NON FRK BOILED)</option>
                  <option value="CMR (FRK RAW)">CMR (FRK RAW)</option>
                  <option value="CMR (NON FRK RAW)">CMR (NON FRK RAW)</option>
                  <option value="RICE (FRK BOILED)">RICE (FRK BOILED)</option>
                  <option value="RICE (NON FRK BOILED)">RICE (NON FRK BOILED)</option>
                  <option value="RICE (FRK RAW)">RICE (FRK RAW)</option>
                  <option value="RICE (NON FRK RAW)">RICE (NON FRK RAW)</option>
                  <option value="MURI RICE">MURI RICE</option>
                  <option value="REJECTION (BOILED)">REJECTION (BOILED)</option>
                  <option value="REJECTION (RAW)">REJECTION (RAW)</option>
                  <option value="REJECTION (MURI)">REJECTION (MURI)</option>
                  <option value="BROKEN (RAW SORTEX)">BROKEN (RAW SORTEX)</option>
                  <option value="BROKEN (RAW NON SORTEX)">BROKEN (RAW NON SORTEX)</option>
                  <option value="BROKEN (BOILED)">BROKEN (BOILED)</option>
                  <option value="RICE BRAN (BOILED)">RICE BRAN (BOILED)</option>
                  <option value="RICE BRAN (RAW)">RICE BRAN (RAW)</option>
                  <option value="RICE BRAN (MURI)">RICE BRAN (MURI)</option>
                  <option value="HUSK">HUSK</option>
                  <option value="PELLETS (8 MM RICE HUSK)">PELLETS (8 MM RICE HUSK)</option>
                  <option value="PELLETS (8 MM SAW DUST)">PELLETS (8 MM SAW DUST)</option>
                  <option value="PELLETS (8 MM GROUNDNUT)">PELLETS (8 MM GROUNDNUT)</option>
                  <option value="PELLETS (16 MM RICE HUSK)">PELLETS (16 MM RICE HUSK)</option>
                  <option value="PELLETS (8 MM RICE HUSK & GROUNDNUT)">
                    PELLETS (8 MM RICE HUSK & GROUNDNUT)
                  </option>
                  <option value="PELLETS (16 MM GROUNDNUT)">PELLETS (16 MM GROUNDNUT)</option>
                  <option value="PELLETS (16 MM RICE HUSK & GROUNDNUT)">
                    PELLETS (16 MM RICE HUSK & GROUNDNUT)
                  </option>
                  <option value="BRIQUETTE (90 MM RICE HUSK)">BRIQUETTE (90 MM RICE HUSK)</option>
                  <option value="BRIQUETTE (90 MM GROUNDNUT)">BRIQUETTE (90 MM GROUNDNUT)</option>
                  <option value="BRIQUETTE (90 MM SAWDUST)">BRIQUETTE (90 MM SAWDUST)</option>
                  <option value="BRIQUETTE (90 MM RICE HUSK & GROUNDNUT)">
                    BRIQUETTE (90 MM RICE HUSK & GROUNDNUT)
                  </option>
                  <option value="KAJU CHILKA">KAJU CHILKA</option>
                  <option value="RAKHAD">RAKHAD</option>
                  <option value="PLASTIC PKT">PLASTIC PKT</option>
                  <option value="JUTE PKT">JUTE PKT</option>
                </select>
              </div>

              {/* === No. of PKTS === */}
              <div>
                <label className="block text-sm font-medium mb-2">No. of PKTS</label>
                <input
                  type="text"
                  placeholder="Enter number of packets"
                  value={formData.pkts}
                  onChange={(e) => setFormData({ ...formData, pkts: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* === Bharti Size === */}
              <div>
                <label className="block text-sm font-medium mb-2">Bharti Size</label>
                <input
                  type="text"
                  placeholder="Enter bharti size"
                  value={formData.bhartiSize}
                  onChange={(e) => setFormData({ ...formData, bhartiSize: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* === Total Quantity === */}
              <div>
                <label className="block text-sm font-medium mb-2">Total Quantity</label>
                <input
                  type="text"
                  placeholder="Enter total quantity"
                  value={formData.totalQuantity}
                  onChange={(e) => setFormData({ ...formData, totalQuantity: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* === Remarks === */}
            <div>
              <label className="block text-sm font-medium mb-2">Remarks</label>
              <textarea
                placeholder="Enter remarks"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                rows={3}
              />
            </div>
          </div>
        </form>

        {/* ===== STICKY FOOTER (Buttons) ===== */}
        <footer className="sticky bottom-0 z-20 border-t border-border bg-card p-4 shadow-lg">
          <div className="flex gap-3 pb-[max(env(safe-area-inset-bottom),1rem)]">
            <Button
type="submit"
              form="indent-form"
              className="flex-1 shadow-md hover:shadow-lg transition-shadow"
            >
              Create Indent
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent shadow-md hover:shadow-lg transition-shadow"
            >
              Cancel
            </Button>
          </div>
        </footer>
      </Card>
    </div>
  );
}