const express = require('express')
const { StatusCodes } = require('http-status-codes')
const Moralis = require('moralis').default
const app = express()
const cors = require('cors')
require('dotenv').config()
const host = 'localhost'
const port = 8017



app.use(cors())
app.use(express.json())


app.get('/getTokens', async (req, res) => {

    const { userAddress, chain } = req.query

    //get the token balances of the user
    const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
        chain: chain,
        address: userAddress,
    })

    //get the NFTs of the user
    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: chain,
        address: userAddress,
        mediaItems: true,
    })


    //filter out the NFTs that are not spam and are not videos
    const myNFTs = nfts.raw.result.map((e, i) => {
        if(e?.media?.media_collection?.high?.url && !e.possible_spam && (e?.media?.category !== "video")){
            return e['media']['media_collection']['high']['url'];
        }
    })

    const balance = await Moralis.EvmApi.balance.getNativeBalance({
        chain: chain, 
        address: userAddress
    })

    //return the tokens and the NFTs
    const jsonResponse = {
        tokens: tokens.raw,
        nfts: myNFTs,
        balance: balance.raw
    }

    return res.status(StatusCodes.OK).json(jsonResponse)
})



Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
}).then(() => {
    app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`)
    })
})
