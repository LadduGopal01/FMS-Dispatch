"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import LoadingPointModal from "@/components/loading-point-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoadingPoint {
  indentNo: string;
  vehicleReached: string;
  status1: string;
}

export default function LoadingPointPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [indents, setIndents] = useState<any[]>([]);
  const [loadingPoints, setLoadingPoints] = useState<LoadingPoint[]>([]);
  const [loadingComplete, setLoadingComplete] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndent, setSelectedIndent] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
      return;
    }
    loadData();
  }, [router]);

  const loadData = () => {
    const storedIndents = JSON.parse(localStorage.getItem("indents") || "[]");
    const storedLp = JSON.parse(localStorage.getItem("loadingPoints") || "[]");
    const storedLc = JSON.parse(localStorage.getItem("loadingComplete") || "[]");
    setIndents(storedIndents);
    setLoadingPoints(storedLp);
    setLoadingComplete(storedLc);
  };

  const handleOpenModal = (indentNo: string) => {
    setSelectedIndent(indentNo);
    setIsModalOpen(true);
  };

  const handleAddLoadingPoint = (data: LoadingPoint) => {
    const updated = [...loadingPoints, data];
    setLoadingPoints(updated);
    localStorage.setItem("loadingPoints", JSON.stringify(updated));
    setIsModalOpen(false);
    loadData(); // Refresh data
  };

  if (!isClient) return null;

  const pendingIndents = indents.filter(
    (i) => !loadingPoints.find((lp) => lp.indentNo === i.indentNo)
  );
  const historyItems = loadingPoints.filter(
    (lp) => !loadingComplete.find((lc) => lc.indentNo === lp.indentNo)
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Loading Point Management
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Manage loading operations at the loading point
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-11 rounded-xl bg-slate-100 p-1">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium text-sm"
              >
                Pending ({pendingIndents.length})
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium text-sm"
              >
                History ({historyItems.length})
              </TabsTrigger>
            </TabsList>

            {/* === PENDING TAB === */}
            <TabsContent value="pending" className="mt-0">
              {pendingIndents.length === 0 ? (
                <Card className="p-8 text-center bg-white/80 backdrop-blur rounded-xl">
                  <p className="text-slate-500">No pending indents</p>
                </Card>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm">
                    <Card className="border-0">
                      <table className="w-full">
                        <thead className="bg-slate-100 border-b border-slate-200">
                          <tr>
                            {[
                              "Action",
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
                          {pendingIndents.map((indent) => (
                            <tr
                              key={indent.indentNo}
                              className="hover:bg-slate-50"
                            >
                              <td className="px-6 py-4">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleOpenModal(indent.indentNo)
                                  }
                                  className="h-9 px-4 text-xs font-medium"
                                >
                                  Process
                                </Button>
                              </td>
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
                              <td className="px-6 py-4 text-sm text-slate-700">
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

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {pendingIndents.map((indent) => (
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
                            <span className="text-slate-800">
                              {indent.plantName}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-slate-600">
                              Party Name:
                            </span>{" "}
                            <span className="text-slate-800">
                              {indent.partyName}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-slate-600">
                              Vehicle No:
                            </span>{" "}
                            <span className="text-slate-800">
                              {indent.vehicleNo}
                            </span>
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
                            <span className="text-slate-800">
                              {indent.pkts}
                            </span>
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
                            <span className="text-slate-800">
                              {indent.remarks}
                            </span>
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleOpenModal(indent.indentNo)}
                          className="mt-4 w-full"
                        >
                          Process Loading
                        </Button>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            {/* === HISTORY TAB === */}
            <TabsContent value="history" className="mt-0">
              {historyItems.length === 0 ? (
                <Card className="p-8 text-center bg-white/80 backdrop-blur rounded-xl">
                  <p className="text-slate-500">No history yet</p>
                </Card>
              ) : (
                <>
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
                              "Vehicle Reached",
                              "Status",
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
                          {historyItems.map((item) => {
                            const indent = indents.find(
                              (i) => i.indentNo === item.indentNo
                            );
                            return (
                              <tr
                                key={item.indentNo}
                                className="hover:bg-slate-50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                                  {item.indentNo}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {indent?.plantName || ""}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {indent?.partyName || ""}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {indent?.vehicleNo || ""}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {indent?.commodityType || ""}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {indent?.pkts || ""}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {indent?.bhartiSize || ""}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {indent?.totalQuantity || ""}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {indent?.remarks || ""}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                  {item.vehicleReached}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-green-600">
                                  {item.status1}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </Card>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {historyItems.map((item) => {
                      const indent = indents.find(
                        (i) => i.indentNo === item.indentNo
                      );
                      return (
                        <Card
                          key={item.indentNo}
                          className="p-5 bg-white shadow-sm border-0 rounded-xl"
                        >
                          <h3 className="text-lg font-bold text-blue-600 mb-3">
                            {item.indentNo}
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium text-slate-600">
                                Plant Name:
                              </span>{" "}
                              <span className="text-slate-800">
                                {indent?.plantName || ""}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                Party Name:
                              </span>{" "}
                              <span className="text-slate-800">
                                {indent?.partyName || ""}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                Vehicle No:
                              </span>{" "}
                              <span className="text-slate-800">
                                {indent?.vehicleNo || ""}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                Commodity Type:
                              </span>{" "}
                              <span className="text-slate-800">
                                {indent?.commodityType || ""}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                No. of PKTS:
                              </span>{" "}
                              <span className="text-slate-800">
                                {indent?.pkts || ""}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                Bharti Size:
                              </span>{" "}
                              <span className="text-slate-800">
                                {indent?.bhartiSize || ""}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                Total Quantity:
                              </span>{" "}
                              <span className="font-bold text-slate-900">
                                {indent?.totalQuantity || ""}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                Remarks:
                              </span>{" "}
                              <span className="text-slate-800">
                                {indent?.remarks || ""}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                Vehicle Reached:
                              </span>{" "}
                              <span className="text-slate-800">
                                {item.vehicleReached}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-600">
                                Status:
                              </span>{" "}
                              <span className="font-medium text-green-600">
                                {item.status1}
                              </span>
                            </p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modal */}
      <LoadingPointModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLoadingPoint}
        indentNo={selectedIndent}
      />
    </div>
  );
}
