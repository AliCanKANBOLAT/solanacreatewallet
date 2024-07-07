"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useState } from "react";

const RequestAirDrop = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false)
 const AirDrop = async () => {

  if(publicKey) {
    setLoading(true);
    try {
    let signature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL );
    let { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    await connection.confirmTransaction({signature, blockhash, lastValidBlockHeight})
    } catch (error) {
      console.log(error)
    }
  }
  setLoading(false);
  }
  return(
    <button disabled={loading} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={AirDrop}>
     {loading ? "progress..." : "RequestAirDrop"}
      </button>
  )
}

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
            <RequestAirDrop /> 
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </main>
      
    
  );
}
