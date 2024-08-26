import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="content">
        <img src="https://www.myetherwallet.com/img/logo.svg" alt="logo" />
        <h2>MyEtherWallet</h2>
        <h4 className="h4">Welcome to your MyWallet</h4>
      </div>
      <div className="flexButton">
        <Button onClick={() => navigate("/yourwallet")}>
          Create your wallet
        </Button>

        <Button onClick={() => navigate("/recover")}>
          Sign In With Seed Pharse
        </Button>
      </div>
    </div>
  );
}

export default Home;
