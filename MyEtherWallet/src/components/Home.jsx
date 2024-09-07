import { Box } from "@mui/material";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{width: '100%', height: '100vh', textAlign:'center'}}>
      <div className="content">
        <h1 style={{fontSize: '50px'}}>MyEtherWallet</h1>
        <h4 className="h4">Welcome to your MyWallet</h4>
      </div>
      <div className="flexButton">
        <Button type="primary" style={{width: '200px', margin: '10px'}} onClick={() => navigate("/yourwallet")}>
          Create your wallet
        </Button>

        <Button type="primary" style={{width: '200px', margin: '10px'}} onClick={() => navigate("/recover")}>
          Sign In With Seed Pharse
        </Button>
      </div>
    </Box>
  );
}

export default Home;
