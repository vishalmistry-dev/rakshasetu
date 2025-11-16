import { Button } from "@/shared/components/form/Button"
import { CheckCircle, Copy, Eye, EyeOff, Lock } from "lucide-react"
import { useState } from "react"

interface SecretKeyDisplayProps {
  secretKey: string
  showLabel?: boolean
}

export function SecretKeyDisplay({ secretKey, showLabel = true }: SecretKeyDisplayProps) {
  const [showSecret, setShowSecret] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Secret Key (Manual Entry)
        </label>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm">
          <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className={showSecret ? "" : "blur-sm select-none"}>
            {secretKey}
          </span>
          <button
            onClick={() => setShowSecret(!showSecret)}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            {showSecret ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-2">
          Can't scan? Enter this key manually in your authenticator app
        </p>
      )}
    </div>
  )
}
