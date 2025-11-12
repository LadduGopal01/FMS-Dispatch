"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import LoadingCompleteModal from "@/components/loading-complete-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoadingComplete {
  indentNo: string;
  unloadingMunsiName: string;
  partyName: string;
  vehicleNo: string;
  driverName: string;
  commodity: string;
  quality: string;
  pkts: string;
  bhartiSize: string;
  quantity: string;
  packetType: string;
  packetName: string;
  status2: string;
}

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

export default function LoadingCompletePage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [indents, setIndents] = useState<Indent[]>([]);
  const [loadingPoints, setLoadingPoints] = useState<any[]>([]);
  const [loadingComplete, setLoadingComplete] = useState<LoadingComplete[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

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

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddLoadingComplete = (data: any) => {
    const updated = [...loadingComplete, data];
    setLoadingComplete(updated);
    localStorage.setItem("loadingComplete", JSON.stringify(updated));
    setIsModalOpen(false);
    loadData();
  };

  if (!isClient) return null;

  const pendingItems = loadingPoints
    .filter((lp) => !loadingComplete.find((lc) => lc.indentNo === lp.indentNo))
    .map((lp) => {
      const indent = indents.find((i) => i.indentNo === lp.indentNo);
      return { ...lp, ...indent };
    });

  // Merge loadingComplete with indent data
  const historyItems = loadingComplete.map((lc) => {
    const indent = indents.find((i) => i.indentNo === lc.indentNo);
    return { ...lc, ...indent };
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Loading Complete Management
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Complete loading operations and update inventory
            </p>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-11 rounded-xl bg-slate-100 p-1">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium text-sm"
              >
                Pending ({pendingItems.length})
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
              {pendingItems.length === 0 ? (
                <Card className="p-8 text-center bg-white/80 backdrop-blur rounded-xl">
                  <p className="text-slate-500">No pending loading points</p>
                </Card>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm max-w-full scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    <div className="min-w-[1000px]">
                      <Card className="border-0">
                        <table className="w-full min-w-[1000px]">
                          <thead className="bg-slate-100 border-b border-slate-200">
                            <tr>
                              {[
                                "Action",
                                "Indent No",
                                "Plant",
                                "Party",
                                "Vehicle",
                                "Commodity",
                                "PKTS",
                                "Qty",
                                "Remarks",
                                "Reached",
                                "Status",
                              ].map((h) => (
                                <th
                                  key={h}
                                  className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase whitespace-nowrap"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-100">
                            {pendingItems.map((item) => (
                              <tr
                                key={item.indentNo}
                                className="hover:bg-slate-50"
                              >
                                <td className="px-3 py-3">
                                  <Button
                                    size="sm"
                                    onClick={() => handleOpenModal(item)}
                                    className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700"
                                  >
                                    Complete
                                  </Button>
                                </td>
                                <td className="px-3 py-3 text-sm font-bold text-blue-600 whitespace-nowrap">
                                  {item.indentNo}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  {item.plantName || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  {item.partyName || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  {item.vehicleNo || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  {item.commodityType || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  {item.pkts || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  {item.totalQuantity || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  {item.remarks || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  {item.vehicleReached || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm text-orange-600 font-medium">
                                  {item.status1 || "Processing"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Card>
                    </div>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {pendingItems.map((item) => (
                      <Card
                        key={item.indentNo}
                        className="p-5 bg-white rounded-xl shadow-sm"
                      >
                        <h3 className="text-lg font-bold text-blue-600 mb-3">
                          {item.indentNo}
                        </h3>
                        <div className="space-y-2 text-sm mb-4">
                          <p>
                            <span className="font-medium">Plant:</span>{" "}
                            {item.plantName || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Party:</span>{" "}
                            {item.partyName || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Vehicle:</span>{" "}
                            {item.vehicleNo || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Commodity:</span>{" "}
                            {item.commodityType || "-"}
                          </p>
                          <p>
                            <span className="font-medium">PKTS:</span>{" "}
                            {item.pkts || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Qty:</span>{" "}
                            <strong>{item.totalQuantity || "-"}</strong>
                          </p>
                          <p>
                            <span className="font-medium">Status:</span>{" "}
                            <span className="text-orange-600">
                              {item.status1 || "Processing"}
                            </span>
                          </p>
                        </div>
                        <Button
                          onClick={() => handleOpenModal(item)}
                          className="w-full h-10 bg-green-600 hover:bg-green-700"
                        >
                          Complete Loading
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
      <p className="text-slate-500">No completed loadings yet</p>
    </Card>
  ) : (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block rounded-xl shadow-sm overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        <Card className="border-0 min-w-max">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                {[
                  "Indent No",
                  "Plant",
                  "Party",
                  "Vehicle",
                  "Driver",
                  "Unloading Munsi",
                  "Commodity",
                  "Quality",
                  "PKTS",
                  "Bharti Size",
                  "Total Quantity",
                  "Loaded Qty",
                  "Remarks",
                  "Packet Type",
                  "Packet Name",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {historyItems.map((item) => (
                <tr
                  key={item.indentNo}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3 py-3 font-semibold text-blue-600 whitespace-nowrap">
                    {item.indentNo}
                  </td>
                  <td className="px-3 py-3">{item.plantName || "-"}</td>
                  <td className="px-3 py-3">{item.partyName || "-"}</td>
                  <td className="px-3 py-3">{item.vehicleNo || "-"}</td>
                  <td className="px-3 py-3">{item.driverName || "-"}</td>
                  <td className="px-3 py-3">{item.unloadingMunsiName || "-"}</td>
                  <td className="px-3 py-3">{item.commodity || "-"}</td>
                  <td className="px-3 py-3">{item.quality || "-"}</td>
                  <td className="px-3 py-3">{item.pkts || "-"}</td>
                  <td className="px-3 py-3">{item.bhartiSize || "-"}</td>
                  <td className="px-3 py-3">{item.totalQuantity || "-"}</td>
                  <td className="px-3 py-3">{item.quantity || "-"}</td>
                  <td className="px-3 py-3">{item.remarks || "-"}</td>
                  <td className="px-3 py-3">{item.packetType || "-"}</td>
                  <td className="px-3 py-3">{item.packetName || "-"}</td>
                  <td className="px-3 py-3 text-green-600 font-medium">
                    {item.status2 || "Completed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {historyItems.map((item) => (
          <Card
            key={item.indentNo}
            className="p-5 bg-white rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-blue-600 mb-3">
              {item.indentNo}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <p><span className="font-medium">Plant:</span> {item.plantName || "-"}</p>
              <p><span className="font-medium">Party:</span> {item.partyName || "-"}</p>
              <p><span className="font-medium">Vehicle:</span> {item.vehicleNo || "-"}</p>
              <p><span className="font-medium">Driver:</span> {item.driverName || "-"}</p>
              <p><span className="font-medium">Munsi:</span> {item.unloadingMunsiName || "-"}</p>
              <p><span className="font-medium">Commodity:</span> {item.commodity || "-"}</p>
              <p><span className="font-medium">Quality:</span> {item.quality || "-"}</p>
              <p><span className="font-medium">PKTS:</span> {item.pkts || "-"}</p>
              <p><span className="font-medium">Bharti:</span> {item.bhartiSize || "-"}</p>
              <p><span className="font-medium">Total Qty:</span> {item.totalQuantity || "-"}</p>
              <p><span className="font-medium">Loaded:</span> {item.quantity || "-"}</p>
              <p><span className="font-medium">Remarks:</span> {item.remarks || "-"}</p>
              <p><span className="font-medium">Type:</span> {item.packetType || "-"}</p>
              <p><span className="font-medium">Packet:</span> {item.packetName || "-"}</p>
              <p className="col-span-2">
                <span className="font-medium">Status:</span>{" "}
                <span className="text-green-600">{item.status2 || "Completed"}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  )}
</TabsContent>

          </Tabs>
        </div>
      </main>

      {/* Only for Pending → Mark Complete */}
      <LoadingCompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLoadingComplete}
        initialData={selectedItem}
      />
    </div>
  );
}
