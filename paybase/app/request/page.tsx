'use client'

import { useState } from 'react'
import QRCode from 'qrcode'
import { useAccount } from 'wagmi'

export default function RequestPage() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('1')
  const [qr, setQr] = useState('')

  const generateQR = async () => {
    if (!address) return alert('connect wallet first')

    const payload = `https://paybase.app/pay?to=${address}&amount=${amount}`
    const dataUrl = await QRCode.toDataURL(payload, { scale: 8 })

    setQr(dataUrl)
  }

  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-sm bg-neutral-900 p-5 rounded-2xl">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="amount (usdc)"
          className="w-full p-3 rounded bg-black mb-4"
        />

        <button
          onClick={generateQR}
          className="w-full bg-white text-black py-3 rounded-xl"
        >
          generate qr
        </button>

        {qr && (
          <img src={qr} className="mt-6 w-56 h-56 mx-auto" />
        )}
      </div>
    </main>
  )
}
