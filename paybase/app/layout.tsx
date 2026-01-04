'use client'

import './globals.css'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, walletConnect } from 'wagmi/connectors'
import WalletGate from '@/components/WalletGate'

const WC_PROJECT_ID = '52732025d7f26eafe99545ebbad20640'

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: WC_PROJECT_ID,
      showQrModal: true,
    }),
  ],
})

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <WalletGate>{children}</WalletGate>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
