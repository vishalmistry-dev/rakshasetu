"use client"

import { AdminLayout } from "@/modules/admin/components/layout"
import { StatsCard } from "@/shared/components/common/StatsCard"
import { Container } from "@/shared/components/layout/Container"
import { DollarSign, Package, TrendingUp, Users } from "lucide-react"

// Mock admin data
const mockAdmin = {
  firstName: "Admin",
  lastName: "User",
  image: null,
}

export default function AdminDashboard() {
  const handleLogout = () => {
    console.log("Admin logout clicked")
  }

  return (
    <AdminLayout
      admin={mockAdmin}
      isAuth={true}
      onLogout={handleLogout}
    >
      <Container size="xl" className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Users"
            value="2,450"
            change={{ value: 15.3, trend: "up" }}
            icon={Users}
          />
          <StatsCard
            label="Total Orders"
            value="12,389"
            change={{ value: 8.1, trend: "up" }}
            icon={Package}
          />
          <StatsCard
            label="Platform Revenue"
            value="₹45,67,890"
            change={{ value: 12.5, trend: "up" }}
            icon={DollarSign}
          />
          <StatsCard
            label="Growth Rate"
            value="28.3%"
            change={{ value: 4.2, trend: "up" }}
            icon={TrendingUp}
          />
        </div>
      </Container>
    </AdminLayout>
  )
}
