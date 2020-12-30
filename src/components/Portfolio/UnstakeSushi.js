import React, { useState, useMemo } from "react";
import { contractAddresses } from "../../services/frontend/sushi/lib/constants";
import { getContract } from "../../services/frontend/utils/erc20";
import useModal from "../../services/frontend/hooks/useModal";
import WithdrawModal from "../../services/frontend/views/StakeXSushi/components/WithdrawModal";

//import { useActiveWeb3React } from "../../services/exchange/hooks";
import useTokenBalance from "./hooks/useTokenBalance";
import useLeave from "./hooks/useLeave";

import { Button } from "../Linker";

const UnstakeXSushi = () => {
  const { tokenAddress } = {
    tokenAddress: contractAddresses.xSushi[1],
  };
  const { ethereum } = window;
  const lpContract = useMemo(() => {
    //debugger;
    return getContract(ethereum, tokenAddress);
  }, [ethereum, tokenAddress]);

  const xSushiBalance = useTokenBalance(lpContract.options.address);
  const [pendingTx, setPendingTx] = useState(false);
  const { onLeave } = useLeave();
  const tokenName = "xSUSHI";
  const [onPresentLeave] = useModal(<WithdrawModal max={xSushiBalance} onConfirm={onLeave} tokenName={tokenName} />);
  return (
    <Button
      disabled={!xSushiBalance.toNumber() || pendingTx}
      onClick={async () => {
        setPendingTx(true);
        await onPresentLeave();
        setPendingTx(false);
      }}
      title={pendingTx ? "Converting..." : "Unstake"}
    />
    // <button
    //   disabled={!xSushiBalance.toNumber() || pendingTx}
    //   onClick={async () => {
    //     setPendingTx(true);
    //     await onPresentLeave();
    //     setPendingTx(false);
    //   }}
    //   class="font-medium text-orange-600 hover:text-orange-700 transition duration-150 ease-in-out"
    // >
    //   {pendingTx ? "Converting..." : "Unstake"}
    // </button>
  );
};
export default UnstakeXSushi;