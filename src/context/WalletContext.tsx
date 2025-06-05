// context/WalletContext.tsx
"use client"
import { createContext, useContext, useState } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { getKeypair } from '@/utils/derive';
import { useAuth } from './AuthContext';

interface WalletContextType {
  initWallet: (value: string) => void;
  keypair: Ed25519Keypair | null;
  address: string | null;
  suiClient: SuiClient;
}

const WalletContext = createContext<WalletContextType | null>(null);

//for test purposes
export const WalletProvider = ({ children }: {children: React.ReactNode}) => {
  const [keypair, setKeypair] = useState<Ed25519Keypair | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

  const { user } = useAuth()
  
  const initWallet = async (password: string) => {
    try{
      const res = await fetch("https://farmfi-node.onrender.com/auth/get-mnemonic", {
        method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
        body:JSON.stringify({email: user?.email, password})
      })

        const { mnemonic } = await res.json()

        const kp = await getKeypair(mnemonic, password)

        //setting the global contexts
        setKeypair(kp)
        setAddress(kp.getPublicKey().toSuiAddress())
      } catch(error){
        console.log("failed to get keypair",error)
      }
    }


  return (
    <WalletContext.Provider value={{ initWallet, keypair, address, suiClient }}>
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};
