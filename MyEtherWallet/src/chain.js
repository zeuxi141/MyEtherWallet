const Ethereum ={
    hex: "0x1",
    name: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/8f2d2c3d0f7e4a5e8c1f5f4e3d8c7d0f",
    ticker: "ETH",
}

const MumbaiTestnet = {
    hex: "0x13881",
    name: "Mumbai testnet",
    rpcUrl: "https://rpc-mumbai.matic.today",
    ticker: "MATIC",
}


const Sepolia = {
    hex: "0xaa36a7",
    name: "Sepolia",
    rpcUrl: "https://1rpc.io/sepolia",
    ticker: "SEP",
}


export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0x13881": MumbaiTestnet,
    "0xaa36a7": Sepolia,
}
