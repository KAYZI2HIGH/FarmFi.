// context/WalletContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'

const WalletContext = createContext<any>(null);

export const WalletProvider = ({ children }: {children: React.ReactNode}) => {
  const [keypair, setKeypair] = useState<Ed25519Keypair | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

  useEffect(() => {
    const init = async () => {
      try{
        let res = await fetch("https://farmfi-node.onrender.com/auth/keypair", {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email:"test1234@gmail.com", password:"test1234"})
        })

        const { keypair } = await res.json()
        const kp = Ed25519Keypair.fromSecretKey(keypair)
        setKeypair(kp)
        setAddress(kp.getPublicKey().toSuiAddress())
      } catch(error){
        console.log("failed to get keypair",error)
      }
    }
  init()
  }, [])

  return (
    <WalletContext.Provider value={{ keypair, address, suiClient }}>
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};
