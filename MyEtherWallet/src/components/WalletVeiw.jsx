import React from "react";
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd"

import { LogoutOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"




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
        {wallet}
      </div>
    </div>
  );
}

export default WalletView;