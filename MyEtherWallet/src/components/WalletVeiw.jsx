import { LogoutOutlined } from "@ant-design/icons";
import {
  Avatar,
  Divider,
  List,
  Tabs,
  Tooltip
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";





function WalletView({wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain}) {

  const [tokens, setTokens] = useState(null)
  const [NFTs, setNFTs] = useState(null)
  const [balance, setBalance] = useState(0)
  const [fetching, setFetching] = useState(true)


  const navigate = useNavigate()

  const items = [
    {
      key: "3",
      label: "Tokens",
      children: (
        <>
          {tokens ? (
            <>
              <List
                bordered
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar>{item.symbol}</Avatar>}
                      title={item.name == "Gold" ? "SpeoliaETH" : item.name}
                      description={`Balance: 
                        ${(Number(item.balance) / 
                        (10 ** Number(item.decimals))).toFixed(4)} Tokens
                      `}
                    />
                  </List.Item>
                )}
              />
            </>
          ):(
            <>
              <span>You seem to not have any tokens yet</span>
              <p>Would you like to add some?
                <a href="" className="">Get faucet here</a>
              </p>
            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "NFTs",
      children: (
        <>
          {NFTs ? (
            <>
              {NFTs.map((e, i) => {
                return (
                  <>
                    {e && (
                      <img 
                        style={{objectFit: "cover", width: "100px", height: "100px", marginLeft: "10px"}}
                        key={i}
                        className="nftImage"
                        sizes="cover"
                        alt="NFT"
                        src={e}
                      />
                    )}
                  </>
                )
              })}
            </>
          ):(
            <>
              <List/>
            </>
            )}
        </>
      ),
    },
    {
      key: "1",
      label: "Transfer",
      children: (
        <>
          Transfer
        </>
      ),
    }  
  ]

  const tokenList = [
    {
      name: "Ethereum",
      value: "0x1",
      symbol: "ETH",
      decimals: 18,
      balance: 0
    },
    {
      name: "Sepolia",
      value: "0xaa36a7",
      symbol: "SepoliaETH",
      decimals: 18,
      balance: 0
    },
    {
      name: "Mumbai testnet",
      value: "0x13881",
      symbol: "LINK",
      decimals: 18,
      balance: 0
    },
    {
      name: "Avalanche",
      value: "0xa86a",
      symbol: "AVAX",
      decimals: 18,
      balance: 0
    },
    {
      name: "Polygon",
      value: "0x89",
      symbol: "MATIC",
      decimals: 18,
      balance: 0
    }
  ]

  //get the tokens and NFTs of the user
  async function getAccountTokens() {
    setFetching(true)

    const res = await axios.get(
      `http://localhost:8017/getTokens`, {
        params: {
          userAddress: wallet,
          chain: selectedChain
        }
    });

    const response = res.data

    console.log(response)

    if(response.tokens.length > 0){
      setTokens(response.tokens)
      console.log(response.tokens)
    }

    if(response.nfts.length > 0){
      setNFTs(response.nfts)
    }

    setBalance(response.balance.balance)

    setFetching(false)

  }

  //logout the user
  function logout() {
    setWallet(null)
    setSeedPhrase(null)
    setNFTs(null)
    setTokens(null)
    setBalance(0)
    navigate("/")
  }

  //get the tokens and NFTs of the user when the component mounts
  useEffect(() => {
    if(!wallet || !selectedChain) return;
    setNFTs(null)
    setTokens(null)
    setBalance(0)
    getAccountTokens();
  }, [])


  //get the tokens and NFTs of the user when the chain changes
  useEffect(() => {
    if(!wallet) return;
    setNFTs(null)
    setTokens(null)
    setBalance(0)
    getAccountTokens();
  }, [selectedChain])

  return (
    <div>
      <div className="content">
        <div className="logoutButton" onClick={logout}>
          <LogoutOutlined />
        </div>
        <div className="walletName">
          Wallet
        </div>
        <Tooltip title={`Wallet address: ${wallet}`}>
          <div>
            {wallet.slice(0, 4)}...{wallet.slice(-4)}
          </div>
        </Tooltip>
        <div>
          Balance: {(Number(balance) / (10 ** 18)).toFixed(4)} {tokenList.find(token => token.value === selectedChain)?.symbol}
        </div>
        <Divider />
        {/* {fetching ? (
          <Spin />
        ):(
        )} */}
        <Tabs defaultActiveKey="1" items={items} className="walletVeiw"></Tabs> 
      </div>
    </div>
  );
}

export default WalletView;