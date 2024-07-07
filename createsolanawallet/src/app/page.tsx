"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Home() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [new UnsafeBurnerWalletAdapter()];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ConnectionProvider {...{endpoint}} >
        <WalletProvider {...{wallets}} autoConnect>
          <WalletModalProvider >
            <WalletMultiButton style = {{marginBottom : 30}} />
            <WalletDisconnectButton style = {{marginBottom : 30}}/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </main>
      
    
  );
}
