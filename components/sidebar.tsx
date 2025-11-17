import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Truck,
  CheckCircle,
  Gauge,
  Menu,
  X,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Indent", href: "/indent", icon: FileText },
    { label: "Loading Point", href: "/loading-point", icon: Truck },
    { label: "Loading Complete", href: "/loading-complete", icon: CheckCircle },
    { label: "Gate Pass", href: "/gate-pass", icon: Gauge },
  ];

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-5 right-5 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-lg"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 w-80
          bg-white border-r border-slate-200 text-slate-900 shadow-lg
          flex flex-col
          transition-all duration-300
          ${
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0" // Desktop always visible
          }
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-4xl font-bold text-slate-900 mb-1">FMS</h2>
          <p className="text-sm font-medium text-slate-600">
            Fleet Management System
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5 space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setIsOpen(false); // closes only on mobile
                }}
                className="w-full"
              >
                <div
                  className={`
                    group relative flex items-center gap-3 px-4 py-4 rounded-xl
                    font-semibold text-sm transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    }
                  `}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-slate-700"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-5 border-t border-slate-200 bg-slate-50">
          <Button
            onClick={handleLogout}
            className="w-full h-12 bg-slate-200 border border-slate-300 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 font-semibold text-sm transition-all duration-200 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="h-1 bg-slate-200" />
      </aside>
    </>
  );
}
