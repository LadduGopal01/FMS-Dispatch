"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import GatePassModal from "@/components/gate-pass-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GatePass {
  id: string;
  indentNo: string;
  gatepassSerialNo: string;
  date: string;
  partyName: string;
  vehicleNo: string;
  driverName: string;
  driverNumber: string;
  billDetails: string;
  transporterDetails: string;
  commodityType1: string;
  commoditySubType1: string;   // NEW
  commodityType2: string;
  commoditySubType2: string;   // NEW
  commodityType3: string;
  commoditySubType3: string;   // NEW
  totalPkts: string;
  totalQty: string;
  packetSize: string;
  netWeight: string;
  rate: string;
  invoiceValue: string;
  invoiceNumber: string;
  lot: string;
  unloadingWeight: string;
  createdAt: number;
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
    try {
      const lc = JSON.parse(localStorage.getItem("loadingComplete") || "[]");
      const ind = JSON.parse(localStorage.getItem("indents") || "[]");
      const savedGatePasses = JSON.parse(localStorage.getItem("gatePass") || "[]");

      const gp = savedGatePasses.map((pass: any) => ({
        id: pass.id || `gp_${Date.now()}`,
        indentNo: pass.indentNo || "",
        gatepassSerialNo: pass.gatepassSerialNo || "",
        date: pass.date || new Date().toISOString().split("T")[0],
        partyName: pass.partyName || "",
        vehicleNo: pass.vehicleNo || "",
        driverName: pass.driverName || "",
        driverNumber: pass.driverNumber || "",
        billDetails: pass.billDetails || "",
        transporterDetails: pass.transporterDetails || "",
        commodityType1: pass.commodityType1 || "",
        commoditySubType1: pass.commoditySubType1 || "",   // NEW
        commodityType2: pass.commodityType2 || "",
        commoditySubType2: pass.commoditySubType2 || "",   // NEW
        commodityType3: pass.commodityType3 || "",
        commoditySubType3: pass.commoditySubType3 || "",   // NEW
        totalPkts: pass.totalPkts || "",
        totalQty: pass.totalQty || "",
        packetSize: pass.packetSize || "",
        netWeight: pass.netWeight || "",
        rate: pass.rate || "",
        invoiceValue: pass.invoiceValue || "",
        invoiceNumber: pass.invoiceNumber || "",
        lot: pass.lot || "",
        unloadingWeight: pass.unloadingWeight || "",
        createdAt: pass.createdAt || Date.now(),
      }));

      setLoadingComplete(lc);
      setIndents(ind);
      setGatePasses(gp);
      localStorage.setItem("gatePass", JSON.stringify(gp));
    } catch (error) {
      console.error("Error loading gate pass data:", error);
      setLoadingComplete([]);
      setIndents([]);
      setGatePasses([]);
    }
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
    const timestamp = Date.now();
    const gatePassWithId: GatePass = {
      ...data,
      id: `gp_${timestamp}`,
      createdAt: timestamp,
      driverNumber: data.driverNumber || "",
      billDetails: data.billDetails || "",
      transporterDetails: data.transporterDetails || "",
      commoditySubType1: data.commoditySubType1 || "",   // NEW
      commoditySubType2: data.commoditySubType2 || "",   // NEW
      commoditySubType3: data.commoditySubType3 || "",   // NEW
      totalQty: data.totalQty || "",
      netWeight: data.netWeight || "",
      rate: data.rate || "",
      invoiceValue: data.invoiceValue || "",
      invoiceNumber: data.invoiceNumber || "",
      lot: data.lot || "",
      unloadingWeight: data.unloadingWeight || "",
    };

    const updated = [gatePassWithId, ...gatePasses];
    setGatePasses(updated);
    localStorage.setItem("gatePass", JSON.stringify(updated));
    setIsModalOpen(false);
    setSelectedItem(null);
    loadData();
  };

  if (!isClient) return null;

  /* ------------------------------------------------------------------ */
  /* Pending items */
  /* ------------------------------------------------------------------ */
  const pendingItems = loadingComplete
    .filter((lc) => !gatePasses.find((gp) => gp.indentNo === lc.indentNo))
    .map((lc) => {
      const indent = indents.find((i: any) => i.indentNo === lc.indentNo);
      return { ...lc, ...indent };
    });

  /* ------------------------------------------------------------------ */
  /* History items – newest first */
  /* ------------------------------------------------------------------ */
  const historyItems = [...gatePasses]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .map((gp) => {
      const lc = loadingComplete.find((lc: any) => lc.indentNo === gp.indentNo);
      const indent = indents.find((i: any) => i.indentNo === gp.indentNo);
      return { ...gp, ...lc, ...indent };
    });

  /* ------------------------------------------------------------------ */
  /* Render */
  /* ------------------------------------------------------------------ */
  return (
    <div className="flex h/screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
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
                  <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm">
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
                      <Card key={item.indentNo} className="p-5 bg-white rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold text-blue-600 mb-3">{item.indentNo}</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                          <p><span className="font-medium">Plant:</span> {item.plantName || "-"}</p>
                          <p><span className="font-medium">Party:</span> {item.partyName || "-"}</p>
                          <p><span className="font-medium">Vehicle:</span> {item.vehicleNo || "-"}</p>
                          <p><span className="font-medium">Driver:</span> {item.driverName || "-"}</p>
                          <p><span className="font-medium">Commodity:</span> {item.commodity || "-"}</p>
                          <p><span className="font-medium">Loaded:</span> {item.quantity || "-"}</p>
                          <p className="col-span-2"><span className="font-medium">Status:</span> <span className="text-green-600">{item.status2 || "Completed"}</span></p>
                        </div>
                        <Button onClick={() => handleOpenModal(item)} className="w-full h-10 bg-purple-600 hover:bg-purple-700">
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
                  {/* Desktop – full gate-pass table */}
                  <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm">
                    <Card className="border-0">
                      <table className="w-full table-auto">
                        <thead className="bg-slate-100 border-b border-slate-200">
                          <tr>
                            {[
                              "Gate Pass No",
                              "Date",
                              "Indent No",
                              "Party",
                              "Vehicle",
                              "Driver",
                              "Driver Number",
                              "Bill Details",
                              "Transporter",
                              "Commodity 1",
                              "C1 Sub",          // NEW
                              "Commodity 2",
                              "C2 Sub",          // NEW
                              "Commodity 3",
                              "C3 Sub",          // NEW
                              "Total Pkts",
                              "Total Qty",
                              "Packet Size",
                              "Net Weight",
                              "Rate",
                              "Invoice Value",
                              "Invoice No",
                              "Lot",
                              "Unloading Wt",
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
                            <tr key={item.id} className="hover:bg-slate-50">
                              <td className="px-3 py-3 font-medium text-purple-600">{item.gatepassSerialNo}</td>
                              <td className="px-3 py-3">{item.date}</td>
                              <td className="px-3 py-3">{item.indentNo}</td>
                              <td className="px-3 py-3">{item.partyName || "-"}</td>
                              <td className="px-3 py-3">{item.vehicleNo || "-"}</td>
                              <td className="px-3 py-3">{item.driverName || "-"}</td>
                              <td className="px-3 py-3">{item.driverNumber || "-"}</td>
                              <td className="px-3 py-3">{item.billDetails || "-"}</td>
                              <td className="px-3 py-3">{item.transporterDetails || "-"}</td>

                              {/* Commodity 1 */}
                              <td className="px-3 py-3">{item.commodityType1 || "-"}</td>
                              <td className="px-3 py-3">{item.commoditySubType1 || "-"}</td>

                              {/* Commodity 2 */}
                              <td className="px-3 py-3">{item.commodityType2 || "-"}</td>
                              <td className="px-3 py-3">{item.commoditySubType2 || "-"}</td>

                              {/* Commodity 3 */}
                              <td className="px-3 py-3">{item.commodityType3 || "-"}</td>
                              <td className="px-3 py-3">{item.commoditySubType3 || "-"}</td>

                              <td className="px-3 py-3">{item.totalPkts || "-"}</td>
                              <td className="px-3 py-3">{item.totalQty || "-"}</td>
                              <td className="px-3 py-3">{item.packetSize || "-"}</td>
                              <td className="px-3 py-3">{item.netWeight || "-"}</td>
                              <td className="px-3 py-3">{item.rate || "-"}</td>
                              <td className="px-3 py-3">{item.invoiceValue || "-"}</td>
                              <td className="px-3 py-3">{item.invoiceNumber || "-"}</td>
                              <td className="px-3 py-3">{item.lot || "-"}</td>
                              <td className="px-3 py-3">{item.unloadingWeight || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </div>

                  {/* Mobile – full gate-pass cards */}
                  <div className="lg:hidden space-y-4">
                    {historyItems.map((item) => (
                      <Card key={item.id} className="p-5 bg-white rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold text-purple-600 mb-3">
                          {item.gatepassSerialNo}
                        </h3>

                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                          <p><span className="font-medium">Date:</span> {item.date}</p>
                          <p><span className="font-medium">Indent:</span> {item.indentNo}</p>

                          <p><span className="font-medium">Party:</span> {item.partyName || "-"}</p>
                          <p><span className="font-medium">Vehicle:</span> {item.vehicleNo || "-"}</p>

                          <p><span className="font-medium">Driver:</span> {item.driverName || "-"}</p>
                          <p><span className="font-medium">Driver No:</span> {item.driverNumber || "-"}</p>

                          <p><span className="font-medium">Bill:</span> {item.billDetails || "-"}</p>
                          <p><span className="font-medium">Transporter:</span> {item.transporterDetails || "-"}</p>

                          {/* Sub-types */}
                          <p><span className="font-medium">C1:</span> {item.commodityType1 || "-"}</p>
                          <p><span className="font-medium">C1 Sub:</span> {item.commoditySubType1 || "-"}</p>

                          <p><span className="font-medium">C2:</span> {item.commodityType2 || "-"}</p>
                          <p><span className="font-medium">C2 Sub:</span> {item.commoditySubType2 || "-"}</p>

                          <p><span className="font-medium">C3:</span> {item.commodityType3 || "-"}</p>
                          <p><span className="font-medium">C3 Sub:</span> {item.commoditySubType3 || "-"}</p>

                          <p><span className="font-medium">Pkts:</span> <strong>{item.totalPkts || "-"}</strong></p>
                          <p><span className="font-medium">Qty:</span> {item.totalQty || "-"}</p>

                          <p><span className="font-medium">Size:</span> {item.packetSize || "-"}</p>
                          <p><span className="font-medium">Net Wt:</span> {item.netWeight || "-"}</p>

                          <p><span className="font-medium">Rate:</span> {item.rate || "-"}</p>
                          <p><span className="font-medium">Inv Val:</span> {item.invoiceValue || "-"}</p>

                          <p><span className="font-medium">Inv No:</span> {item.invoiceNumber || "-"}</p>
                          <p><span className="font-medium">Lot:</span> {item.lot || "-"}</p>

                          <p><span className="font-medium">Unload Wt:</span> {item.unloadingWeight || "-"}</p>
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

      {/* Modal */}
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