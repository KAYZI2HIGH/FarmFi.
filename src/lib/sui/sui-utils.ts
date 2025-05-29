import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { sui_conversion, client } from "./sui-constants";

//return the payment coin that was created in the first coin object of the user's wallet
export const getSplitCoin = async (wallet: string, amount:number) => {
    const coins = await client.getCoins({
        owner: wallet,
    });
    const ownedCoins = coins.data
    if(Number(ownedCoins[0].balance) != amount){
        for(const coin of ownedCoins){
            if(Number(coin.balance) == amount){
                return coin
            }
        }
    }
    return ownedCoins[0]
}

export const getBalance = async (wallet: string) => {  //, type: string) => {
     const coins = await client.getCoins({
        owner: wallet,
        // coinType: type defaults to sui, can update to return for USDC or other types
    });
    const ownedCoins = coins.data
    let balance = 0
    for(let i=0; i<=ownedCoins.length-1; i++){
        balance += Number(ownedCoins[i].balance)
    }
    return balance
}

//todo, create a function that goes through the wallet with 2 coins of value 10 and gets a coin of value 13
//won't work for just 1 coin
//Delibate on whether it should be on the frontend
export const extractPayment = async (prc: number, keypair:Ed25519Keypair) => {
    const price: number = prc * sui_conversion
    const wallet = keypair.getPublicKey().toSuiAddress()
    const tx = new Transaction()
    
    const coins = await client.getAllCoins({
        owner: wallet
    })
    const ownedCoins = coins.data

    if (ownedCoins.length === 0 || (ownedCoins.length == 1 && Number(ownedCoins[0].balance) < price)){
        console.log("not enough balance")
        return
    }
    const destination_coin = ownedCoins[0] //splitting the payment from their first coin object
    for(let i = 1; i <= ownedCoins.length; i++){
        if (Number(destination_coin.balance) < price){
            tx.mergeCoins(tx.object(destination_coin.coinObjectId), [tx.object(ownedCoins[i].coinObjectId)])
        }else if(Number(destination_coin.balance) >= price){
            const [paymentCoin] = tx.splitCoins(tx.object(destination_coin.coinObjectId), [price])
            tx.transferObjects([paymentCoin], wallet);
            break;
        }
    }

    tx.setGasBudget(100000000)
    const { digest } = await client.signAndExecuteTransaction({signer: keypair, transaction: tx});
    await client.waitForTransaction({digest: digest});
    const coin = await getSplitCoin(wallet, price)
    return coin
}