"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Shield,
} from "lucide-react"

const platforms = [
  {
    id: "shopify",
    name: "Shopify",
    logo: "🛍️",
    description: "Connect your Shopify store to sync orders automatically",
    features: [
      "Real-time order sync",
      "Automatic inventory updates",
      "Webhook integration",
      "Product catalog sync",
    ],
    status: "available",
    popular: true,
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    logo: "🔷",
    description: "Integrate with your WooCommerce store",
    features: [
      "Order synchronization",
      "Status updates",
      "Customer data sync",
    ],
    status: "coming_soon",
    popular: false,
  },
  {
    id: "magento",
    name: "Magento",
    logo: "🔶",
    description: "Connect your Magento store",
    features: [
      "Enterprise-grade integration",
      "Bulk order processing",
      "Advanced reporting",
    ],
    status: "coming_soon",
    popular: false,
  },
]

export default function ConnectStorePage() {
  const handleConnect = (platformId: string) => {
    if (platformId === "shopify") {
      // Redirect to Shopify OAuth
      window.location.href = "/api/auth/shopify/connect"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Connect Your Store</h1>
        <p className="text-sm text-gray-500 mt-1">
          Choose your e-commerce platform to get started
        </p>
      </div>

      {/* Info Card - UPDATED */}
      <InfoBanner
        type="info"
        icon={Shield}
        title="Secure Integration"
        description="Your store data is encrypted and secure. We only access order information needed for shipping."
      >
        <ul className="text-sm mt-3 space-y-1">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>OAuth 2.0 authentication</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Read-only access to order data</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Revoke access anytime</span>
          </li>
        </ul>
      </InfoBanner>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card
            key={platform.id}
            className={`relative ${platform.status === "available" ? "hover:shadow-lg transition-shadow" : "opacity-75"
              }`}
          >
            {platform.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-orange-600 text-white border-orange-600">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{platform.logo}</div>
                <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{platform.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {platform.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {platform.status === "available" ? (
                <Button
                  className="w-full"
                  onClick={() => handleConnect(platform.id)}
                >
                  Connect {platform.name}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How it Works */}
      <Card>
        <CardHeader title="How It Works" />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-orange-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Connect Store</h4>
              <p className="text-sm text-gray-600">
                Click connect and authorize RakshaSetu to access your store orders
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-orange-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sync Orders</h4>
              <p className="text-sm text-gray-600">
                Orders will automatically sync to your RakshaSetu dashboard
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-orange-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ship Orders</h4>
              <p className="text-sm text-gray-600">
                Manage shipping, generate labels, and track deliveries
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
              <p className="text-sm text-gray-600">
                Check our integration guides or contact support
              </p>
            </div>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
