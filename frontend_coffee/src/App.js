import { useEffect } from "react";
import { useChain, useMoralis } from "react-moralis";

// COMPONENTS and HOOKS
import useMetamask from "./Hooks/useMetamask.js";
import ChainBanner from "./Component/ChainBanner/index";

import Navbar from "./Component/Navbar/index";


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

    </>
  );
}

export default App;
