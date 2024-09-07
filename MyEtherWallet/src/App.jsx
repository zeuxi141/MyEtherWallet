import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { ErrorPage } from '~/pages'
import AdbIcon from '@mui/icons-material/Adb';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';

import { BrowserRouter as Router } from "react-router-dom";
import CreateWallet from "./components/CreateWallet";
import Home from "./components/Home";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletVeiw";

function App() {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectionChain, setSelectionChain] = useState("0xaa36a7");

  const handleChange = (event) => {
    setSelectionChain(event.target.value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar  position="static">
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}} variant="dense">
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
            </Box>
            <FormControl
              sx={{ m: 1, minWidth: 150, boxShadow: 2 }}
              size="small"
            >
              <Select
                id="demo-select-small"
                value={selectionChain}
                style={{color: 'black', backgroundColor: 'white'}}
                onChange={handleChange}
              >
                <MenuItem value="0x1">Ethereum</MenuItem>
                <MenuItem value="0x13881">Mumbai testnet</MenuItem>
                <MenuItem value="0x89">Polygon</MenuItem>
                <MenuItem value="0xa86a">Avalanche</MenuItem>
                <MenuItem value="0xaa36a7">Sepolia</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </Box>
      <Router>
        {wallet && seedPhrase ? (
          <Routes>
            <Route
              path="/yourwallet"
              element={
                <WalletView
                  wallet={wallet}
                  setWallet={setWallet}
                  seedPhrase={seedPhrase}
                  setSeedPhrase={setSeedPhrase}
                  selectedChain={selectionChain}
                />
              }
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/yourwallet"
              element={
                <CreateWallet
                  setSeedPhrase={setSeedPhrase}
                  setWallet={setWallet}
                />
              }
            />
            <Route
              path="/recover"
              element={
                <RecoverAccount
                  setSeedPhrase={setSeedPhrase}
                  setWallet={setWallet}
                />
              }
            />
          </Routes>
        )}

        {/* <Route path='*' element={<ErrorPage />} /> */}
      </Router>
    </>
  );
}

export default App;
