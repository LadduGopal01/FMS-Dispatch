"use client";

import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface IndentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  indent: {
    indentNo: string;
    plantName: string;
    officeDispatcherName: string;
    partyName: string;
    vehicleNo: string;
    commodityType: string;
    pkts: string;
    bhartiSize: string;
    totalQuantity: string;
    remarks: string;
  } | null;
}

export default function IndentDetailsModal({
  isOpen,
  onClose,
  indent,
}: IndentDetailsModalProps) {
  if (!isOpen || !indent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Indent Details</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <DetailRow label="Indent No" value={indent.indentNo} />
            <DetailRow label="Plant Name" value={indent.plantName} />
            <DetailRow
              label="Office Dispatcher"
              value={indent.officeDispatcherName}
            />
            <DetailRow label="Party Name" value={indent.partyName} />
            <DetailRow label="Vehicle No" value={indent.vehicleNo} />
            <DetailRow label="Commodity Type" value={indent.commodityType} />
            <DetailRow label="No. of PKTS" value={indent.pkts} />
            <DetailRow label="Bharti Size" value={indent.bhartiSize} />
            <DetailRow label="Total Quantity" value={indent.totalQuantity} />
            <DetailRow label="Remarks" value={indent.remarks} />
          </div>

          <div className="pt-4">
            <Button onClick={onClose} className="w-full" variant="outline">
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium text-slate-600">{label}:</span>
      <span className="text-slate-800 text-right">{value || "-"}</span>
    </div>
  );
}
