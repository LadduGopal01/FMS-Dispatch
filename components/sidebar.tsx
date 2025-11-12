"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Truck, CheckCircle, Gauge as Gate, Menu, X, LogOut } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Indent", href: "/indent", icon: FileText },
    { label: "Loading Point", href: "/loading-point", icon: Truck },
    { label: "Loading Complete", href: "/loading-complete", icon: CheckCircle },
    { label: "Gate Pass", href: "/gate-pass", icon: Gate },
  ]

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-background text-foreground transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } flex flex-col border-r border-border`}
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-primary">FMS</h2>
          <p className="text-sm text-muted-foreground">Fleet Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent/20"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
