import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClient } from "@mysten/sui/client";

// use getFullnodeUrl to define the Devnet or Testnet RPC location
type Network = 'testnet' | 'devnet'
export const network: Network = "devnet"
const rpcUrl = getFullnodeUrl(network);

export const client = new SuiClient({ url: rpcUrl });
export const sui_conversion: number = 1e9