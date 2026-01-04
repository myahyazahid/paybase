import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-semibold">Paybase</h1>
      </div>

      <div className="flex flex-col items-center text-center gap-4">
        <h2 className="text-4xl font-bold">
          Pay crypto <br /> as easy as QR
        </h2>
        <p className="text-neutral-400 max-w-sm">
          Simple USDC payments on Base. No addresses. No friction.
        </p>

        <div className="flex gap-4 w-full max-w-sm mt-6">
          <Link
            href="/pay"
            className="flex-1 bg-white text-black py-3 rounded-xl text-center font-medium"
          >
            Pay
          </Link>
          <Link
            href="/request"
            className="flex-1 border border-neutral-700 py-3 rounded-xl text-center font-medium"
          >
            Request
          </Link>
        </div>
      </div>

      <div className="text-center text-neutral-500 text-sm">
        Built on Base
      </div>
    </main>
  )
}
