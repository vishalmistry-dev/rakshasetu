import { User } from '@rakshasetu/database'

export default function Home() {
  // TypeScript knows the shape of User from database!
  const demoUser: Partial<User> = {
    id: '1',
    email: 'demo@rakshasetu.com',
    firstName: "Demo",
    lastName: "User",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          🚀 Rakshasetu - Main Website
        </h1>

        <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
          <p className="mb-2">✅ Next.js 15 Running</p>
          <p className="mb-2">✅ TypeScript Working</p>
          <p className="mb-2">✅ Tailwind CSS Active</p>
          <p className="mb-4">✅ Database Types Imported</p>

          <div className="border-t border-green-700 pt-4 mt-4">
            <p className="text-white mb-2">Demo User from Database Types:</p>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(demoUser, null, 2)}
            </pre>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-700 p-4 rounded">
            <h3 className="font-bold mb-2">📦 Packages</h3>
            <p className="text-sm text-gray-400">Database types shared across apps</p>
          </div>
          <div className="border border-gray-700 p-4 rounded">
            <h3 className="font-bold mb-2">🔧 API</h3>
            <p className="text-sm text-gray-400">Backend running on :4000</p>
          </div>
          <div className="border border-gray-700 p-4 rounded">
            <h3 className="font-bold mb-2">🌐 Website</h3>
            <p className="text-sm text-gray-400">You are here!</p>
          </div>
        </div>
      </div>
    </main>
  )
}
