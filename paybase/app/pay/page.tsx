'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useSendTransaction, useChainId, useSwitchChain } from 'wagmi'
import { base } from 'wagmi/chains'
import { encodeFunctionData, parseUnits, isAddress } from 'viem'

type PayIntent = {
  to: string
  amount: string
}

const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'

const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
] as const

export default function PayPage() {
  const [data, setData] = useState<PayIntent | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const runningRef = useRef(false)

  const { sendTransaction } = useSendTransaction()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    if (data) return

    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 240 },
        (text) => {
          const url = new URL(text)
          const params = Object.fromEntries(url.searchParams.entries())
          if (!isAddress(params.to)) return

          setData(params as PayIntent)
          runningRef.current = false
          scanner.stop().catch(() => {})
        },
        () => {}
      )
      .then(() => (runningRef.current = true))

    return () => {
      if (runningRef.current) scanner.stop().catch(() => {})
    }
  }, [data])

  const pay = () => {
    if (!data) return
    if (chainId !== base.id) return switchChain({ chainId: base.id })

    const calldata = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [
        data.to as `0x${string}`,
        parseUnits(data.amount, 6),
      ],
    })

    sendTransaction({ to: USDC_BASE, data: calldata })
  }

  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-sm">
        {!data && (
          <div id="qr-reader" className="h-[320px] bg-black rounded-xl" />
        )}

        {data && (
          <div className="bg-neutral-900 p-5 rounded-2xl">
            <p className="font-mono">{data.to}</p>
            <p className="text-2xl mt-2">{data.amount} USDC</p>
            <button
              onClick={pay}
              className="mt-4 w-full bg-green-600 py-3 rounded-xl"
            >
              Pay USDC
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
