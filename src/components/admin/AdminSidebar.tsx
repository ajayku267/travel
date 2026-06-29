"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, BookOpen, Users, Car, Route, 
  MapPin, Star, Image, MessageSquare, Settings, LogOut
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: BookOpen },
  { label: "Drivers", href: "/admin/drivers", icon: Users },
  { label: "Vehicles", href: "/admin/vehicles", icon: Car },
  { label: "Routes", href: "/admin/routes", icon: Route },
  { label: "Locations", href: "/admin/locations", icon: MapPin },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 min-h-screen flex flex-col fixed left-0 top-0 border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-black">
            🚖
          </div>
          <div>
            <div className="font-bold text-white leading-tight">Go Nainital</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive 
                  ? "bg-yellow-400 text-gray-900 font-bold" 
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}

        <div className="pt-6 pb-2">
          <div className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Configuration</div>
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              pathname === "/admin/settings" 
                ? "bg-yellow-400 text-gray-900 font-bold" 
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Settings size={18} />
            <span className="text-sm">Site Settings</span>
          </Link>
          <Link
            href="/admin/settings/users"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              pathname === "/admin/settings/users" 
                ? "bg-yellow-400 text-gray-900 font-bold" 
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Users size={18} />
            <span className="text-sm">Admin Users</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:text-white transition-colors mb-2">
          <LayoutDashboard size={16} /> View Website
        </Link>
        <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 transition-colors">
          <LogOut size={16} /> Sign Out
        </Link>
      </div>
    </aside>
  );
}
