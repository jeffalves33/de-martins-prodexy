import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="container mx-auto p-6 pt-16 lg:pt-6">
          <DashboardContent />
        </div>
      </main>
    </div>
  )
}
