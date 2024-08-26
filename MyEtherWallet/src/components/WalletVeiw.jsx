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
      balance: 0,
      decimals: 18,
    },
    {
      symbol: "LINK",
      name: "Chainlink",
      balance: 0,
      decimals: 18,
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      balance: 0,
      decimals: 18,
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      balance: 0,
      decimals: 18,
    },
  ]
  
  const NFTs = [
    "https://images.nightcafe.studio/jobs/IV3A9hRfFfSrPn5eTWVo/IV3A9hRfFfSrPn5eTWVo--1--6t38k_6.9444x.jpg?tr=w-1600,c-at_max",
    "https://i.pinimg.com/736x/e2/cd/a3/e2cda32c285fe1c65a2bed50856739b1.jpg"
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