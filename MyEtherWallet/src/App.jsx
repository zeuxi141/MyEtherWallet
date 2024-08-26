import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
// import { ErrorPage } from '~/pages'

import { BrowserRouter as Router } from "react-router-dom";
import CreateWallet from "./components/CreateWallet";
import Home from './components/Home';
import RecoverAccount from "./components/RecoverAccount";
import WalletView from './components/WalletVeiw';

function App() {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectionChain, setSelectionChain] = useState("0x1")

  const handleChange = (event) => {
    setSelectionChain(event.target.value);
  };

  return (
    <>
    <header>
      <FormControl sx={{ m: 1, minWidth: 150, boxShadow: 2 }} size="small">
      <Select
        id="demo-select-small"
        value={selectionChain}
        onChange={handleChange}
      >
        <MenuItem value="">Select a chain</MenuItem>
        <MenuItem value="0x1">Ethereum</MenuItem>
        <MenuItem value="0x13881">Mumbai testnet</MenuItem>
        <MenuItem value="0x89">Polygon</MenuItem>
        <MenuItem value="0xa86a">Avalanche</MenuItem>
        <MenuItem value="0xaa36a7">Sepolia</MenuItem>

      </Select>
      </FormControl>
    </header>
    <Router>
      {wallet && seedPhrase ? 
      (
          <Routes>
              <Route path="/yourwallet" 
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
      ):
      (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/yourwallet" element={<CreateWallet setSeedPhrase={setSeedPhrase} setWallet={setWallet}  />} />
          <Route path="/recover" 
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
  )
}

export default App
