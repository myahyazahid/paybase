'use client'

import { useAccount, useConnect, useChainId, useSwitchChain } from 'wagmi'
import { base } from 'wagmi/chains'

export default function WalletGate({
  children,
}: {
  children: React.ReactNode
}) {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  if (!isConnected) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Paybase</h1>
        <p className="text-neutral-400">Connect your wallet</p>

        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={isPending}
            className="w-64 py-3 rounded-xl bg-white text-black"
          >
            {connector.name}
          </button>
        ))}
      </main>
    )
  }

  if (chainId !== base.id) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-sm">{address}</p>
        <button
          onClick={() => switchChain({ chainId: base.id })}
          className="bg-white text-black px-6 py-3 rounded-xl"
        >
          Switch to Base
        </button>
      </main>
    )
  }

  return (
    <div>
      <div className="p-3 border-b border-neutral-800 text-sm font-mono">
        connected: {address?.slice(0, 6)}…{address?.slice(-4)}
      </div>
      {children}
    </div>
  )
}
