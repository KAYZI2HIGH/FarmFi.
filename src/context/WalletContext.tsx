// context/WalletContext.tsx
"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { getKeypair } from '@/utils/derive';
import { getBalance } from '@/lib/sui/sui-utils';
import { useAuth } from './AuthContext';

interface WalletContextType {
  keypair: Ed25519Keypair | null;
  address: string | null;
  suiClient: SuiClient;
  balance: number;
  setBalance: (value: number) => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

//for test purposes
const password = "yomidenzel23"

export const WalletProvider = ({ children }: {children: React.ReactNode}) => {
  const [keypair, setKeypair] = useState<Ed25519Keypair | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

  const { user, isLoading } = useAuth()
  
  //update to derive keypair, client side
  useEffect(() => {
    if (isLoading || !user) return; //prevent rendering on mount
    const init = async () => {
      try{
        const res = await fetch("https://farmfi-node.onrender.com/auth/get-mnemonic", {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email: user?.email, password}) //replace with proper logic to retrieve password
        })

        if(!res.ok || res.status !== 200){
          //catch invalid credentials error
          const { msg } = await res.json()
          alert(msg)
          return
        }
        const { mnemonic } = await res.json()
        //incase of subsequent re-visit to the site, you can prompt the user to enter ther password to unlock
        //their wallet because the password isn't passed in the jwt

        const kp = await getKeypair(mnemonic, password) //replace the user_password with the actual password

        //setting the global contexts
        console.log(kp.getPublicKey().toSuiAddress() == user.suiWalletAddress)
        setKeypair(kp)
        setAddress(kp.getPublicKey().toSuiAddress())
        if(address) setBalance(await getBalance(address))
      } catch(error){
        console.log("failed to get keypair",error)
      }
    }
  init()
  }, [user, isLoading, address])

  return (
    <WalletContext.Provider value={{ keypair, address, suiClient, balance, setBalance }}>
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};
