import { LogoutOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Input,
  List,
  notification,
  Spin,
  Tabs,
  Tooltip
} from "antd";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHAINS_CONFIG } from "../chain";
import tokenList from "../tokenList";
import TransactionHistory from './TransactionHistory';





function WalletView({wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain}) {

  const [tokens, setTokens] = useState(null)
  const [NFTs, setNFTs] = useState(null)
  const [balance, setBalance] = useState(0)
  const [fetching, setFetching] = useState(true)
  const [sendToAddress, setSendToAddress] = useState(null)
  const [AmoutToSend, setAmountToSend] = useState(null)
  const [proccessing, setProccessing] = useState(false)
  const [hash, setHash] = useState(null)
  const [transactions, setTransactions] = useState([]);


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
    //transfer tokens
    {
      key: "1",
      label: "Transfer",
      children: (
        <>
          <div className="headContent">
            <h3>Native Balance</h3>
            <div>
            Balance: {(Number(balance) / (10 ** 18)).toFixed(4)} {tokenList.find(token => token.value === selectedChain)?.symbol}
            </div>
          </div>
          <div className="sendRow">
            <p style={{width: "90px", textAlign: 'left' }}> To: </p>
            <Input 
              placeholder="Enter address" 
              value={sendToAddress}
              onChange={(e) => setSendToAddress(e.target.value)}
            />
          </div>
          <div className="sendRow">
            <p style={{width: "90px", textAlign: 'left' }}> Amount: </p>
            <Input 
              placeholder="Enter amount" 
              value={AmoutToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
            />
          </div>
          <Button
            style={{width: "100%", marginTop: "20px", marginBottom: "20px"}}
            type="primary"
            onClick={()=> sendTransaction(sendToAddress, AmoutToSend)}
          >
            Send Tokens
          </Button>
          {proccessing && (
            <>
              <Spin />
              {hash && (
                <Tooltip title={hash} >
                  <p>Hover For Tx Hash</p>
                </Tooltip>
              )}
            </>
          )}
        </>
      ),
    }, 
    //History
    {
      key: "4",
      label: "History", // Tab History
      children: (
        <>
          <TransactionHistory address={wallet} />
        </>
      ),
    },
  ]

  //get history of transactions
    // Lấy lịch sử giao dịch
    // async function getTransactionHistory() {
    //   setFetching(true);
    //   try {
    //     const apiKey = 'ETHERSCAN_API_KEY'; // Thay bằng API Key của bạn
    //     const baseUrl =
    //       selectedChain === "sepolia"
    //         ? `https://api-sepolia.etherscan.io/api`
    //         : `https://api.etherscan.io/api`;
  
    //     const res = await axios.get(baseUrl, {
    //       params: {
    //         module: "account",
    //         action: "txlist",
    //         address: wallet,
    //         startblock: 0,
    //         endblock: 99999999,
    //         sort: "desc",
    //         apikey: apiKey,
    //       },
    //     });
  
    //     setTransactions(res.data.result || []);
    //   } catch (error) {
    //     console.error("Error fetching transaction history:", error);
    //   }
    //   setFetching(false);
    // }
    
  
  // Hàm gửi giao dịch
  async function sendTransaction(to, amount) {
    const chain = CHAINS_CONFIG[selectedChain]

    const provider = new ethers.JsonRpcProvider(chain.rpcUrl)

    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };

    setProccessing(true)
    try {
      const transaction = await wallet.sendTransaction(tx);
      setHash(transaction.hash)
      const receipt = await transaction.wait();

      setHash(null)
      setProccessing(false)
      setAmountToSend(null)
      setSendToAddress(null)      

      if(receipt.status === 1){
        // Hiển thị thông báo với liên kết đến giao dịch trên Etherscan
        openNotificationWithEtherscanLink(transaction.hash);
        getAccountTokens()
      } else {
        alert("Transaction failed")
      }

    } catch (error) {
      setHash(null)
      setProccessing(false)
      setAmountToSend(null)
      setSendToAddress(null)
    }
  }

  // Hàm hiển thị thông báo với liên kết Etherscan
  const openNotificationWithEtherscanLink = (hash) => {
    // Kiểm tra nếu selectedChain là Sepolia
    const etherscanLink =
      selectedChain === "0xaa36a7"
        ? `https://sepolia.etherscan.io/tx/${hash}`
        : `https://etherscan.io/tx/${hash}`;
  
    notification.success({
      message: "Transaction Successful",
      description: (
        <a href={etherscanLink} target="_blank" rel="noopener noreferrer">
          View Transaction on Etherscan
        </a>
      ),
      duration: 0, // thông báo sẽ không tự động tắt
    });
  };
  

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

    if (response && Array.isArray(response.nfts) && response.nfts.length > 0) {
      setNFTs(response.nfts);
    }

    console.log(response.balance.balance)

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