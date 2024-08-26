import {
  Avatar,
  Divider,
  List,
  Tabs,
  Tooltip
} from "antd";
import React from "react";

import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";




function WalletView({wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain}) {

  const tokens = [
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 10000000000,
      decimals: 18,
    },
    {
      symbol: "LINK",
      name: "Chainlink",
      balance: 10000000000,
      decimals: 18,
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      balance: 10000000000,
      decimals: 18,
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      balance: 10000000000,
      decimals: 18,
    },
  ]
  
  const NFTs = [
    
  ]

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
                      description={`Balance: ${Number(item.balance)/10 ** Number(item.decimals).toFixed(2)} Tokens`}
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
              {NFTs.map((nft, i) => {
                return (
                  <>
                    {e && (
                      <img 
                        key={i}
                        className="nftImage"
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
              <List.Item>
              </List.Item>
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

  function logout() {
    setWallet(null)
    setSeedPhrase(null)
    navigate("/")
  }

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