import ExitAdmin from "@/components/admin/ExitAdmin";
import AdminActionButton from "@/components/admin/AdminActionButton";
import BackToDashboardButton from "@/components/admin/BackToDashboardButton";
import AdminSectionsMenu from "@/components/admin/AdminSectionsMenu";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white relative">
      
      {/* Top Right Actions */}
      <div className="absolute top-8 right-8 flex items-center gap-3 z-50">
        <BackToDashboardButton />
        <AdminActionButton />
        <ExitAdmin />
        <AdminSectionsMenu />
      </div>

      {/* Page Content */}
      <main>
        {children}
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl top-10 left-10" />
        <div className="absolute w-72 h-72 bg-purple-500/10 rounded-full blur-3xl bottom-10 right-10" />
      </div>
    </div>
  );
}