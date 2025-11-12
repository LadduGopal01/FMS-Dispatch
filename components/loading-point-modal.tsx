"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface LoadingPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  indentNo: string;
}

export default function LoadingPointModal({
  isOpen,
  onClose,
  onSubmit,
  indentNo,
}: LoadingPointModalProps) {
  const [formData, setFormData] = useState({
    vehicleReached: "No",
    status1: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.status1) {
      alert("Please fill all fields");
      return;
    }
    onSubmit({
      indentNo,
      vehicleReached: formData.vehicleReached,
      status1: formData.status1,
    });
    setFormData({ vehicleReached: "No", status1: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10">
      <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Process Loading Point</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Indent No (Read-only)
            </label>
            <input
              type="text"
              value={indentNo}
              disabled
              className="w-full px-4 py-2 border border-border rounded-lg bg-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Vehicle Reached at Loading Point
            </label>
            <select
              value={formData.vehicleReached}
              onChange={(e) =>
                setFormData({ ...formData, vehicleReached: e.target.value })
              }
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <input
              type="text"
              placeholder="Enter status"
              value={formData.status1}
              onChange={(e) =>
                setFormData({ ...formData, status1: e.target.value })
              }
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
