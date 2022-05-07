//setting up the data model
const { 
    Connection, 
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

//this a new wallet that we will be airdropping into
const wallet = new Keypair()

//getting a public key from solana
const publicKey = new PublicKey(wallet._keypair.publicKey)
//getting a public key from solana
const secretKey = wallet._keypair.secretKey

//setting up the wallet balance function
const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet balance is ${parseFloat(walletBalance) / LAMPORTS_PER_SOL} SOL`)
    } catch(err) { 
        console.error(err)
    }
}

//setting up the airdrop function
const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSignature)
    } catch(err) { 
        console.error(err)
    }
}


//telling the program it will have these functions
const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}

//calling the function
main() 


//display the public and secret key
//console.log(publicKey)
//console.log(secretKey)