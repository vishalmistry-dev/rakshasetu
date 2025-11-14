"use client"

import { StatsCard } from "@/shared/components/common/StatsCard"
import { Container } from "@/shared/components/layout/Container"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"


export default function MerchantDashboard() {

  return (

    <Container size="xl" className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Total Orders"
          value="1,234"
          change={{ value: 12.5, trend: "up" }}
          icon={Package}
        />
        <StatsCard
          label="Total Revenue"
          value="₹2,45,890"
          change={{ value: 8.2, trend: "up" }}
          icon={DollarSign}
        />
        <StatsCard
          label="Active Products"
          value="156"
          change={{ value: 3.1, trend: "down" }}
          icon={ShoppingCart}
        />
        <StatsCard
          label="Growth Rate"
          value="23.5%"
          change={{ value: 5.4, trend: "up" }}
          icon={TrendingUp}
        />
      </div>

      {/* Add more dashboard content here */}
    </Container>
  )
}
