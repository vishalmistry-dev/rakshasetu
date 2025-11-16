import { Shield } from "lucide-react"
import Image from "next/image"

interface QRCodeDisplayProps {
  qrCode: string | null
}

export function QRCodeDisplay({ qrCode }: QRCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-200 rounded-xl">
      <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        {qrCode ? (
          <Image
            src={qrCode}
            alt="2FA QR Code"
            width={256}
            height={256}
            className="rounded-lg"
          />
        ) : (
          <div className="text-center">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Generating QR Code...</p>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500">
        Scan this code with Google Authenticator
      </p>
    </div>
  )
}
