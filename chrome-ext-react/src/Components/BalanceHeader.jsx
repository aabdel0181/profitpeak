import { useState, useEffect } from "react"
import {Title, Loader} from "@mantine/core";

import { get_balance } from "../utils/abitrum_test_calls";

export default function BalanceHeader() {

    const [walletBalance, setWalletBalance] = useState('');
    const [loading, setLoading] = useState(true);

    const divideAndRound = (number) => {
        // Divide the number by 1_000_000_000_000_000_000 and round to 4 decimal places
        const result = (number / 1_000_000_000_000_000_000).toFixed(4);
        return parseFloat(result); // Parse the result as float and return
      };

    useEffect(() => {
      
        const fetchData = async () => {
            const wKey = await localStorage.getItem("walletKey");
            const aKey = await localStorage.getItem("apiKey");

            const balanceResults = await get_balance(aKey, wKey);
            if (balanceResults.status == "1") {
                setWalletBalance(divideAndRound(parseInt(balanceResults.result)));
            } else {
                setWalletBalance(0);
              }
            
            setLoading(false);
        }
        
        fetchData();
    
    }, [])
    

  return (
    <>
        {loading ? 
            (
                <Loader color="blue" type="dots" />
            ) : 
            (
                <Title size={"h1"} style={{ fontWeight: 500 }} py={"24px"}>
                    {`${walletBalance} ETH`}
                </Title>
            )
        }
        
    </>
  )
}
