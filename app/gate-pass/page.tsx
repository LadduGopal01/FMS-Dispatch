"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import GatePassModal from "@/components/gate-pass-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GatePass {
  indentNo: string;
  gatepassSerialNo: string;
  date: string;
  partyName: string;
  vehicleNo: string;
  driverName: string;
  commodityType1: string;
  commodityType2: string;
  commodityType3: string;
  totalPkts: string;
  packetSize: string;
}

export default function GatePassPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState<any[]>([]);
  const [indents, setIndents] = useState<any[]>([]);
  const [gatePasses, setGatePasses] = useState<GatePass[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  /* ------------------------------------------------------------------ */
  /* Load data from localStorage */
  /* ------------------------------------------------------------------ */
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
    const lc = JSON.parse(localStorage.getItem("loadingComplete") || "[]");
    const ind = JSON.parse(localStorage.getItem("indents") || "[]");
    const gp = JSON.parse(localStorage.getItem("gatePass") || "[]");
    setLoadingComplete(lc);
    setIndents(ind);
    setGatePasses(gp);
  };

  /* ------------------------------------------------------------------ */
  /* Modal handlers */
  /* ------------------------------------------------------------------ */
  const handleOpenModal = (item: any) => {
    const indent = indents.find((i: any) => i.indentNo === item.indentNo);
    setSelectedItem({ ...item, ...indent });
    setIsModalOpen(true);
  };

  const handleAddGatePass = (data: any) => {
    const updated = [...gatePasses, data];
    setGatePasses(updated);
    localStorage.setItem("gatePass", JSON.stringify(updated));
    setIsModalOpen(false);
    loadData();
  };

  if (!isClient) return null;

  /* ------------------------------------------------------------------ */
  /* Pending = loadingComplete that have NOT been issued a gate pass */
  /* ------------------------------------------------------------------ */
  const pendingItems = loadingComplete
    .filter((lc) => !gatePasses.find((gp) => gp.indentNo === lc.indentNo))
    .map((lc) => {
      const indent = indents.find((i: any) => i.indentNo === lc.indentNo);
      return { ...lc, ...indent };
    });

  /* ------------------------------------------------------------------ */
  /* History = gate passes + merged data */
  /* ------------------------------------------------------------------ */
  const historyItems = gatePasses.map((gp) => {
    const lc = loadingComplete.find((lc: any) => lc.indentNo === gp.indentNo);
    const indent = indents.find((i: any) => i.indentNo === gp.indentNo);
    return { ...gp, ...lc, ...indent };
  });

  /* ------------------------------------------------------------------ */
  /* Render */
  /* ------------------------------------------------------------------ */
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Gate Pass Management
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Generate and manage gate passes for shipments
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
{/* ==================== PENDING ==================== */}
<TabsContent value="pending" className="mt-0">
  {pendingItems.length === 0 ? (
    <Card className="p-8 text-center bg-white/80 backdrop-blur rounded-xl">
      <p className="text-slate-500">No pending items for gate pass</p>
    </Card>
  ) : (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        <Card className="border-0 min-w-max">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                {[
                  "Action",
                  "Indent No",
                  "Plant",
                  "Party",
                  "Vehicle",
                  "Driver",
                  "Munsi",
                  "Commodity",
                  "Quality",
                  "PKTS",
                  "Bharti Size",
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
              {pendingItems.map((item) => (
                <tr key={item.indentNo} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-3">
                    <Button
                      size="sm"
                      onClick={() => handleOpenModal(item)}
                      className="h-8 px-3 text-xs bg-purple-600 hover:bg-purple-700"
                    >
                      Issue Pass
                    </Button>
                  </td>
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
        {pendingItems.map((item) => (
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
              <p><span className="font-medium">Commodity:</span> {item.commodity || "-"}</p>
              <p><span className="font-medium">Loaded:</span> {item.quantity || "-"}</p>
              <p className="col-span-2">
                <span className="font-medium">Status:</span>{" "}
                <span className="text-green-600">{item.status2 || "Completed"}</span>
              </p>
            </div>
            <Button
              onClick={() => handleOpenModal(item)}
              className="w-full h-10 bg-purple-600 hover:bg-purple-700"
            >
              Issue Gate Pass
            </Button>
          </Card>
        ))}
      </div>
    </>
  )}
</TabsContent>

            {/* ==================== HISTORY ==================== */}
            <TabsContent value="history" className="mt-0">
              {historyItems.length === 0 ? (
                <Card className="p-8 text-center bg-white/80 backdrop-blur rounded-xl">
                  <p className="text-slate-500">No gate passes issued yet</p>
                </Card>
              ) : (
                <>
                  {/* Desktop – full gate-pass headers */}
                  <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm custom-scrollbar">
                    <Card className="border-0">
                      <table className="w-full table-auto">
                        <thead className="bg-slate-100 border-b border-slate-200">
                          <tr>
                            {[
                              "Gate Pass No",
                              "Indent No",
                              "Plant",
                              "Date",
                              "Party",
                              "Vehicle",
                              "Driver",
                              "Commodity Type 1",
                              "Commodity Type 2",
                              "Commodity Type 3",
                              "Total Pkts",
                              "Packet Size",
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
                              key={item.gatepassSerialNo}
                              className="hover:bg-slate-50"
                            >
                              <td className="px-3 py-3 text-sm font-bold text-purple-600">
                                {item.gatepassSerialNo}
                              </td>
                              <td className="px-3 py-3 text-sm">
                                {item.indentNo}
                              </td>
                              <td className="px-3 py-3 text-sm">{item.plantName || "-"}</td>
                              <td className="px-3 py-3 text-sm">{item.date}</td>
                              <td className="px-3 py-3 text-sm">
                                {item.partyName}
                              </td>
                              <td className="px-3 py-3 text-sm">
                                {item.vehicleNo}
                              </td>
                              <td className="px-3 py-3 text-sm">
                                {item.driverName}
                              </td>
                              <td className="px-3 py-3 text-sm">
                                {item.commodityType1 || "-"}
                              </td>
                              <td className="px-3 py-3 text-sm">
                                {item.commodityType2 || "-"}
                              </td>
                              <td className="px-3 py-3 text-sm">
                                {item.commodityType3 || "-"}
                              </td>
                              <td className="px-3 py-3 text-sm font-medium">
                                {item.totalPkts}
                              </td>
                              <td className="px-3 py-3 text-sm">
                                {item.packetSize}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </div>

                  {/* Mobile cards – all fields */}
                  <div className="lg:hidden space-y-4">
                    {historyItems.map((item) => (
                      <Card
                        key={item.gatepassSerialNo}
                        className="p-5 bg-white rounded-xl shadow-sm"
                      >
                        <h3 className="text-lg font-bold text-purple-600 mb-3">
                          {item.gatepassSerialNo}
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                          <p>
                            <span className="font-medium">Indent:</span>{" "}
                            {item.indentNo}
                          </p>
                          <p>
                            <span className="font-medium">Plant:</span>{" "}
                            {item.plantName || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Date:</span>{" "}
                            {item.date}
                          </p>
                          <p>
                            <span className="font-medium">Party:</span>{" "}
                            {item.partyName}
                          </p>
                          <p>
                            <span className="font-medium">Vehicle:</span>{" "}
                            {item.vehicleNo}
                          </p>
                          <p>
                            <span className="font-medium">Driver:</span>{" "}
                            {item.driverName}
                          </p>
                          <p>
                            <span className="font-medium">Type 1:</span>{" "}
                            {item.commodityType1 || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Type 2:</span>{" "}
                            {item.commodityType2 || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Type 3:</span>{" "}
                            {item.commodityType3 || "-"}
                          </p>
                          <p>
                            <span className="font-medium">Pkts:</span>{" "}
                            <strong>{item.totalPkts}</strong>
                          </p>
                          <p>
                            <span className="font-medium">Size:</span>{" "}
                            {item.packetSize}
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

      {/* Modal – only for issuing a new gate pass */}
      <GatePassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddGatePass}
        initialData={selectedItem}
        nextSerialNo={gatePasses.length + 1}
      />
    </div>
  );
}
