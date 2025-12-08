"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";

export default function SiteFooter() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
          <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} Yago Imports. Todos os direitos reservados.
          </p>
          {!isAdminPage && (
            <Link href="/admin/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:bg-primary hover:text-primary-foreground transition-colors gap-2 h-9 px-3"
                style={{ borderColor: 'oklch(0.208 0.042 265.755)' }}
                title="Painel Admin"
              >
                <UserCog className="h-4 w-4" />
                <span className="text-xs font-medium">Admin</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
