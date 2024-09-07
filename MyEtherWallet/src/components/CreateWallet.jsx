// import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextField from "@mui/material/TextField";
import { Button } from 'antd';
import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";

//Create wallet component
function CreateWallet({setWallet, setSeedPhrase}) {
  const [newSeedPhrase, setNewSeedPhrase] = React.useState("");
  const navigate = useNavigate();

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  }

  const setWalletAndMnemonic = () => {
    setSeedPhrase(newSeedPhrase);
    //tao dia chi address tu seed phrase
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  }

  return (
    <>
      <div className="content" style={{textAlign: 'center'}}>
        {/* <ExclamationCircleOutlined style={{ fontSize: "20px" }} /> */}
        <div className="mnemonic">
          <div>
            Once you generate seed phrase, save it sercurely in order to recover
            your wallet.
          </div>
        </div>
        <Button
          type="primary"
          style={{margin: '20px 0'}}
          onClick={()=>generateWallet()}
        >Generate Seed Phrase</Button>
        <br />
        <TextField id="standard-multiline-static" value={newSeedPhrase} multiline rows={4}  />
        <br />
        <Button
          type="primary"
          style={{margin: '20px 0'}}
          onClick={()=>setWalletAndMnemonic()}
        >
          Open Your New Wallet
        </Button>
      </div>

      <div className="footer">
        <div>
          <Button type="primary" onClick={() => navigate("/")}>Back</Button>
        </div>
      </div>
    </>
  );
}

export default CreateWallet;
