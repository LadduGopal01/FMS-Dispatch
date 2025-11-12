"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import IndentModal from "@/components/indent-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Indent {
  indentNo: string;
  plantName: string;
  partyName: string;
  vehicleNo: string;
  commodityType: string;
  pkts: string;
  bhartiSize: string;
  totalQuantity: string;
  remarks: string;
}

export default function IndentPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [indents, setIndents] = useState<Indent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextIndentNo, setNextIndentNo] = useState(1);

  useEffect(() => {
    setIsClient(true);
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
      return;
    }
    loadIndents();
  }, [router]);

  const loadIndents = () => {
    const stored = JSON.parse(
      localStorage.getItem("indents") || "[]"
    ) as Indent[];
    setIndents(stored);
    setNextIndentNo(stored.length + 1);
  };

  const handleAddIndent = (data: Omit<Indent, "indentNo">) => {
    const newIndent: Indent = {
      ...data,
      indentNo: `IND-${String(nextIndentNo).padStart(3, "0")}`,
    };
    const updated = [...indents, newIndent];
    setIndents(updated);
    localStorage.setItem("indents", JSON.stringify(updated));
    setNextIndentNo(nextIndentNo + 1);
    setIsModalOpen(false);
    // Optional: trigger re-render if needed
    loadIndents();
  };

  if (!isClient) return null;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header + CTA */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                  Indent Management
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  Create and manage indents
                </p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="h-11 px-5 text-sm font-medium bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Indent
              </Button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm">
            <Card className="border-0">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    {[
                      "Indent No",
                      "Plant Name",
                      "Party Name",
                      "Vehicle No",
                      "Commodity Type",
                      "No. of PKTS",
                      "Bharti Size",
                      "Total Quantity",
                      "Remarks",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {indents.map((indent) => (
                    <tr
                      key={indent.indentNo}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                        {indent.indentNo}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {indent.plantName}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {indent.partyName}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {indent.vehicleNo}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {indent.commodityType}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {indent.pkts}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {indent.bhartiSize}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {indent.totalQuantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {indent.remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Mobile & Tablet Cards */}
          <div className="lg:hidden space-y-4">
            {indents.length === 0 ? (
              <Card className="p-8 text-center bg-white/80 backdrop-blur">
                <p className="text-slate-500">
                  No indents created yet. Tap <strong>Create Indent</strong> to
                  get started.
                </p>
              </Card>
            ) : (
              indents.map((indent) => (
                <Card
                  key={indent.indentNo}
                  className="p-5 bg-white shadow-sm border-0 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-blue-600">
                      {indent.indentNo}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-slate-600">
                        Plant Name:
                      </span>{" "}
                      <span className="text-slate-800">{indent.plantName}</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">
                        Party Name:
                      </span>{" "}
                      <span className="text-slate-800">{indent.partyName}</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">
                        Vehicle No:
                      </span>{" "}
                      <span className="text-slate-800">{indent.vehicleNo}</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">
                        Commodity Type:
                      </span>{" "}
                      <span className="text-slate-800">
                        {indent.commodityType}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">
                        No. of PKTS:
                      </span>{" "}
                      <span className="text-slate-800">{indent.pkts}</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">
                        Bharti Size:
                      </span>{" "}
                      <span className="text-slate-800">
                        {indent.bhartiSize}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">
                        Total Quantity:
                      </span>{" "}
                      <span className="font-bold text-slate-900">
                        {indent.totalQuantity}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">
                        Remarks:
                      </span>{" "}
                      <span className="text-slate-800">{indent.remarks}</span>
                    </p>
                  </div>
                  <Button size="sm" className="mt-4 w-full" variant="outline">
                    View Details
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      <IndentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddIndent}
      />
    </div>
  );
}
