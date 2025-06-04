import scrypt from "scrypt-async"
import *  as bip39 from "bip39";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { derivePath } from "ed25519-hd-key";

// const ALGORITHM = "aes-256-cbc";

const ALGORITHM = "AES-CBC";
const SALT = "salt";
const KEY_LENGTH = 32;
// export const decryptMnemonic = (encryptedMnemonic: string, password: string): string  => {
//     try {
//         const key = crypto.scryptSync(password, "salt", 32);
//         const [ivHex, encrypted] = encryptedMnemonic.split(":");

//         const iv = Buffer.from(ivHex, "hex");
//         const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

//         let decrypted = decipher.update(encrypted, "hex", "utf-8" );
//         decrypted += decipher.final("utf-8");

//         return decrypted;
//     } catch(err){
//         console.log("error:",err)
//         throw new Error(`error: ${err}`)
//     }
// }

export const decryptMnemonicClient = async (
  encryptedMnemonic: string,
  password: string
): Promise<string> => {
  try {
    // Split IV and ciphertext from "iv:encrypted"
    const [ivHex, encryptedHex] = encryptedMnemonic.split(":");

    // Convert hex -> Uint8Array
    const iv = Uint8Array.from(ivHex.match(/.{1,2}/g)!.map(b => parseInt(b, 16)));
    const ciphertext = Uint8Array.from(encryptedHex.match(/.{1,2}/g)!.map(b => parseInt(b, 16)));

    // Derive key using scrypt-async (same params as Node)
    const keyBuffer: Uint8Array = await new Promise(resolve => {
    // @ts-expect-error to bypass expected number[] in scrypt
      scrypt(password, SALT, {
        N: 16384,
        r: 8,
        p: 1,
        dkLen: KEY_LENGTH,
        encoding: "binary"
      }, resolve);
    });

    // Import key for Web Crypto
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: ALGORITHM },
      false,
      ["decrypt"]
    );

    // Decrypt using AES-CBC
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv
      },
      cryptoKey,
      ciphertext
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (err) {
    console.error("Decryption failed:", err);
    return "";
  }
};

export const getKeypair = async (mnemonic: string, password: string): Promise<Ed25519Keypair> => {
    //decrypt mnemonic and generte keypair
    const decryptedMnemonic = await decryptMnemonicClient(mnemonic, password)
    const seed = bip39.mnemonicToSeedSync(decryptedMnemonic);
    const path = "m/44'/784'/0'/0'/0'"; // Standard for Sui wallets
    const derivedKey = derivePath(path, seed.toString("hex")).key;
    const keypair = Ed25519Keypair.fromSecretKey(derivedKey);
    return keypair
}