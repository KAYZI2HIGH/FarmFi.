import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClient } from "@mysten/sui/client";

// use getFullnodeUrl to define the Devnet RPC location
const rpcUrl = getFullnodeUrl('testnet');

export const client = new SuiClient({ url: rpcUrl });
export const sui_conversion: number = 1e9