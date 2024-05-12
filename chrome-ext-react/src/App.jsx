import { useMantineColorScheme } from "@mantine/core";
import { useEffect } from "react";
import ConnectPage from "./pages/ConnectPage";
import HomePage from "./pages/HomePage";
import Transactions from "./pages/Transactions";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// console.log(process.env.REACT_APP_GECKO_API_KEY);

import "./index.css";

function App() {
  useMantineColorScheme("light");
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    // Set color theme
    setColorScheme("light");
  }, []);

  return (
    <div>
      <MemoryRouter>
        <Routes>
          <Route exact path="/" element={<ConnectPage />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    </div>
  );

  // if (!loggedIn) {
  //     return (
  //       <ConnectPage
  //         walletKey={walletKey}
  //         setWalletKey={setWalletKey}
  //         apiKey={apiKey}
  //         setApiKey={setApiKey}
  //         setLoggedIn={setLoggedIn}
  //       />
  //     )
  //   } else {
  //     return (
  //       <>
  //         <HomePage />
  //       <div>{test}</div>
  //       </>
  //     )
  //   }
}

export default App;
