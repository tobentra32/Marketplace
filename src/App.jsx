
import './App.css'


import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/NavBar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Marketplace from './components/Marketplace.jsx';
import MyNft from './components/MyNft.jsx';
import SellNft from './components/SellNft.jsx';
import CreateNft from './components/CreateNft.jsx';


// 1. Get projectId
const projectId = "62e79459767fff6c6ae30cd40f159bf1";
if (!projectId) {
  throw new Error("VITE_PROJECT_ID is not set");
}

function getBlockchainApiRpcUrl(chainId) {
  return `https://rpc.walletconnect.org/v1/?chainId=eip155:${chainId}&projectId=${projectId}`;
}

// 2. Set chains

const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: getBlockchainApiRpcUrl(1),
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    currency: "ETH",
    explorerUrl: "https://arbiscan.io",
    rpcUrl: getBlockchainApiRpcUrl(42161),
  },
];


// 3. Create a metadata object


// 4. Create Ethers config


const ethersConfig = defaultConfig({
  metadata: {
    name: "AppKit",
    description: "AppKit Laboratory",
    url: "https://example.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  defaultChainId: 1,
});

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

function App() {
  

  return (
    <>
      <Navbar />
      <Routes>
          
        <Route path="/" element={<Marketplace />} />
        <Route path="/create-nft" element={<CreateNft />}/>  
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-nft" element={<MyNft />} />
        <Route path="/sell-nft" element={<SellNft />} />
          
      </Routes>

    </>
  )
}

export default App
