/* eslint-disable */
import { useEffect, useState } from "react";
import Web3 from "web3";

const useBlock = () => {
  const [block, setBlock] = useState(0);
  const { ethereum } = window;
  useEffect(() => {
    if (!ethereum) return;
    const web3 = new Web3(ethereum);
    const interval = setInterval(async () => {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ethereum]);
  return block;
};
export default useBlock;
