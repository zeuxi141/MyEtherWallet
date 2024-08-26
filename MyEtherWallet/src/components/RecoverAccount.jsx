import { Button, Input } from "antd";
import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";


const { TextArea } = Input;

//Recover account component

function RecoverAccount({setWallet, setSeedPhrase}) {

  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = React.useState("");
  const [ nonValidSeed, setNonValidSeed] = React.useState(false);

  function seedAjust(e){
    setNonValidSeed(false);
    setTypedSeed(e.target.value);
  }

  function recoverWallet(){
    let recoveredWallet;
    try{
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    }catch(e){
      setNonValidSeed(true);
      return;
    }

    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.address);
    navigate("/yourwallet");
    return;
  }

  return (
    <div>
      <div className="content">
        <div>
          Type your seed phrase in the field below to recover your wallet (it should include 12 words separated by spaces)
        </div>
        <TextArea
          value={typedSeed}
          onChange={seedAjust}
          placeholder="Type your seed phrase here..."
          // autoSize={{ minRows: 3, maxRows: 5 }}
          rows={4}
        />
        <Button
          disabled={typedSeed.split(" ").length !== 12||typedSeed.slice(-1)===" "}
          className="frontPageButton"
          type="primary"
          onClick={() => recoverWallet("wallet")}
        >
          Recover Wallet
        </Button>
        <br />
        {nonValidSeed && (
          <div style={{ color: "red" }}>
            The seed phrase you entered is not valid. Please try again.
          </div>
        )}
        <Button
          style={{ marginTop: "10px" }}
          className=""
          type="primary"
          onClick={() => navigate("/")}
        >
          Back Home
        </Button>
      </div>
    </div>
  );
}

export default RecoverAccount;