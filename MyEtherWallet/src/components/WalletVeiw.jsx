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
                      title={item.name}
                      description={`Balance: 
                        ${(Number(item.balance) / 
                          10 ** Number(item.decimals
                          )).toFixed(2)} Tokens`}
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

    setBalance(response.balance)

    setFetching(false)

  }

  function logout() {
    setWallet(null)
    setSeedPhrase(null)
    setNFTs(null)
    setTokens(null)
    setBalance(0)
    navigate("/")
  }

  useEffect(() => {
    if(!wallet || !selectedChain) return;
    setNFTs(null)
    setTokens(null)
    setBalance(0)
    getAccountTokens();
  }, [])


  useEffect(() => {
    if(!wallet) return;
    setNFTs(null)
    setTokens(null)
    setBalance(0)
    getAccountTokens();
    console.log(selectedChain)
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
        <Divider />
        <Tabs defaultActiveKey="1" items={items} className="walletVeiw"></Tabs>
      </div>
    </div>
  );
}

export default WalletView;