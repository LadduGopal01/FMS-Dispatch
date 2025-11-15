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
    const storedLc = JSON.parse(
      localStorage.getItem("loadingComplete") || "[]"
    );
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
            <TabsContent value="pending" className="mt-2">
              {pendingIndents.length === 0 ? (
                <Card className="p-10 text-center bg-white shadow-sm rounded-2xl">
                  <p className="text-slate-500 text-base">
                    No pending indents found
                  </p>
                </Card>
              ) : (
                <>
                  {/* Desktop View */}
                  <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {[
                            "Action",
                            "Indent No",
                            "Plant Name",
                            "Office Dispatcher",
                            "Party Name",
                            "Vehicle No",
                            "Commodity Type",
                            "No. of Pkts",
                            "Bharti Size",
                            "Total Quantity",
                            "Remarks",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-5 py-3 text-left font-semibold text-slate-600 uppercase text-xs tracking-wide"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {pendingIndents.map((indent) => (
                          <tr
                            key={indent.indentNo}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-5 py-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                onClick={() => handleOpenModal(indent.indentNo)}
                              >
                                Process
                              </Button>
                            </td>
                            <td className="px-5 py-3 text-blue-600 font-semibold">
                              {indent.indentNo}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.plantName}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.officeDispatcherName}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.partyName}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.vehicleNo}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.commodityType}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.pkts}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.bhartiSize}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.totalQuantity}
                            </td>
                            <td className="px-5 py-3 text-slate-700">
                              {indent.remarks}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {pendingIndents.map((indent) => (
                      <Card
                        key={indent.indentNo}
                        className="p-5 rounded-2xl shadow-sm border border-slate-200 bg-white"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold text-blue-600 text-lg">
                            {indent.indentNo}
                          </h3>
                          <Button
                            size="sm"
                            onClick={() => handleOpenModal(indent.indentNo)}
                          >
                            Process
                          </Button>
                        </div>
                        <div className="text-sm text-slate-700 space-y-1">
                          <p>Plant: {indent.plantName}</p>
                          <p>Dispatcher: {indent.officeDispatcherName}</p>
                          <p>Party: {indent.partyName}</p>
                          <p>Vehicle: {indent.vehicleNo}</p>
                          <p>Commodity: {indent.commodityType}</p>
                          <p>Pkts: {indent.pkts}</p>
                          <p>Bharti Size: {indent.bhartiSize}</p>
                          <p>Quantity: {indent.totalQuantity}</p>
                          <p>Remarks: {indent.remarks}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            {/* === HISTORY TAB === */}
            <TabsContent value="history" className="mt-2">
              {historyItems.length === 0 ? (
                <Card className="p-10 text-center bg-white shadow-sm rounded-2xl">
                  <p className="text-slate-500 text-base">
                    No history records found
                  </p>
                </Card>
              ) : (
                <>
                  <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {[
                            "Action",
                            "Indent No",
                            "Plant Name",
                            "Office Dispatcher",
                            "Party Name",
                            "Vehicle No",
                            "Commodity Type",
                            "No. of Pkts",
                            "Bharti Size",
                            "Total Quantity",
                            "Remarks",
                            "Vehicle Reached",
                            "Status",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-5 py-3 text-left font-semibold text-slate-600 uppercase text-xs tracking-wide"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {historyItems.map((item) => {
                          const indent = indents.find(
                            (i) => i.indentNo === item.indentNo
                          );
                          if (!indent) return null;
                          return (
                            <tr
                              key={item.indentNo}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="px-5 py-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                  onClick={() => handleOpenModal(item.indentNo)}
                                >
                                  View
                                </Button>
                              </td>
                              <td className="px-5 py-3 font-semibold text-blue-600">
                                {item.indentNo}
                              </td>
                              <td className="px-5 py-3">{indent.plantName}</td>
                              <td className="px-5 py-3">
                                {indent.officeDispatcherName}
                              </td>
                              <td className="px-5 py-3">{indent.partyName}</td>
                              <td className="px-5 py-3">{indent.vehicleNo}</td>
                              <td className="px-5 py-3">
                                {indent.commodityType}
                              </td>
                              <td className="px-5 py-3">{indent.pkts}</td>
                              <td className="px-5 py-3">{indent.bhartiSize}</td>
                              <td className="px-5 py-3">
                                {indent.totalQuantity}
                              </td>
                              <td className="px-5 py-3">{indent.remarks}</td>
                              <td className="px-5 py-3">
                                {item.vehicleReached}
                              </td>
                              <td className="px-5 py-3 font-medium text-green-600">
                                {item.status1}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                          className="p-5 rounded-2xl shadow-sm border border-slate-200 bg-white"
                        >
                          <h3 className="font-semibold text-blue-600 text-lg mb-2">
                            {item.indentNo}
                          </h3>
                          <div className="text-sm text-slate-700 space-y-1">
                            <p>Plant: {indent?.plantName}</p>
                            <p>Party: {indent?.partyName}</p>
                            <p>Vehicle: {indent?.vehicleNo}</p>
                            <p>Commodity: {indent?.commodityType}</p>
                            <p>Pkts: {indent?.pkts}</p>
                            <p>Bharti Size: {indent?.bhartiSize}</p>
                            <p>Quantity: {indent?.totalQuantity}</p>
                            <p>Remarks: {indent?.remarks}</p>
                            <p>Vehicle Reached: {item.vehicleReached}</p>
                            <p className="text-green-600 font-medium">
                              Status: {item.status1}
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
