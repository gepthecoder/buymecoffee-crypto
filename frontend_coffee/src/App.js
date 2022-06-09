import { useEffect } from "react";
import { useChain, useMoralis } from "react-moralis";
import { Routes, Route } from "react-router-dom";

// COMPONENTS and HOOKS
import useMetamask from "./Hooks/useMetamask.js";
import ChainBanner from "./Component/ChainBanner/index";
import Error404 from "./Pages/Error404/index";

import Navbar from "./Component/Navbar/index";
import Contribution from "./Pages/Contribution/index";


function App() {
  const { enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis();
  const { chainId } = useChain();
  const isMetaMaskInstalled = useMetamask();

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      if (isMetaMaskInstalled) {
        enableWeb3();
      } else {
        enableWeb3({ provider: "walletconnect" });
      }
    }
  }, [isWeb3Enabled, isAuthenticated]);

  return (
    <>
      <ChainBanner chain={chainId} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Contribution chain={chainId} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
