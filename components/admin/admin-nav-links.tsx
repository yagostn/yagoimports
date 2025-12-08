"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  BarChart3, 
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    href: '/admin/produtos',
    label: 'Produtos',
    icon: <Package className="w-5 h-5" />
  },
  {
    href: '/admin/categorias',
    label: 'Categorias',
    icon: <Layers className="w-5 h-5" />
  },
  {
    href: '/admin/vendas',
    label: 'Vendas',
    icon: <ShoppingCart className="w-5 h-5" />
  },
  {
    href: '/admin/relatorios',
    label: 'Relatórios',
    icon: <BarChart3 className="w-5 h-5" />
  }
];

export function AdminNavLinks() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                isActive 
                  ? 'font-medium' 
                  : 'hover:bg-black/5'
              }`}
              style={{
                backgroundColor: isActive ? 'oklch(0.208 0.042 265.755)' : 'transparent',
                color: isActive ? 'white' : 'oklch(0.208 0.042 265.755)'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t" style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start space-x-3 text-red-600 hover:bg-red-50 h-9"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </Button>
      </div>
    </>
  );
}
