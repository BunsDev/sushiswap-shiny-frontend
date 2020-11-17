import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Value from "./Value";
import PendingRewards from "./PendingRewards";
import SushiBelt from "./SushiBelt";
import StakeSushi from "./StakeSushi";
import UnstakeSushi from "./UnstakeSushi";
import ExpandButton from "../../Buttons/ExpandButton";
//Summary Statistics
import { useWallet } from "use-wallet";
import useTokenBalance from "../../../services/frontend/hooks/useTokenBalance";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { getSushiAddress, getSushiSupply } from "../../../services/frontend/sushi/utils";
import { getBalanceNumber } from "../../../services/frontend/utils/formatBalance";
//Wallet Modal
import WalletsModal from "../../Modals/Wallets";
import useModal from "../../../shared/hooks/useModal";

const BalanceCard = () => {
  // Acquire Summary Statistics
  const history = useHistory();
  const [totalSupply, setTotalSupply] = useState();
  const sushi = useSushi();
  const sushiBalance = useTokenBalance(getSushiAddress(sushi));
  const { account } = useWallet();
  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getSushiSupply(sushi);
      setTotalSupply(supply);
    }
    if (sushi) {
      fetchTotalSupply();
    }
  }, [sushi, setTotalSupply]);
  const [onPresentWallets] = useModal(<WalletsModal />, null, null);
  return (
    <div className="sushi-flex sushi-flex-col sushi-rounded-lg sushi-border sushi-border-gray-200 sushi-overflow-hidden">
      <div className="sushi-flex-1 sushi-bg-white sushi-p-6 sushi-flex sushi-flex-col sushi-justify-between">
        <div className="sushi-relative sushi-pb-5 sushi-border-b sushi-border-gray-200 sushi-space-y-4 sm:sushi-pb-0">
          <div className="sushi-space-y-3 sushi-flex sushi-items-center sushi-justify-between sushi-space-y-0">
            <div className="sushi-pb-5">
              <h3 className="sushi-text-lg sushi-leading-6 sushi-font-medium sushi-text-gray-900">SUSHI Actions</h3>
              {/* <p className="sushi-mt-1 sushi-max-w-2xl sushi-text-sm sushi-leading-5 sushi-text-gray-500">
                Do something with SUSHI
              </p> */}
            </div>
            {/* <ExpandButton widgetPath={"/widgets/balance"} dashboardPath={"/omakase"} /> */}
          </div>
        </div>
        <div className="sushi-mt-6 sushi-flex-1 sushi-relative">
          {!account ? (
            <div
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(2px)",
              }}
              className="sushi-absolute sushi-w-full sushi-h-full sushi-z-20 sushi-text-center sushi-flex-shrink-0 sushi-flex sushi-flex-col sushi-justify-center sushi-p-12"
            >
              <div className="sushi-mx-auto sushi-rounded-md sushi-shadow-lg">
                <button
                  onClick={onPresentWallets}
                  className="sushi-mx-auto sushi-flex sushi-items-center sushi-justify-center sushi-px-5 sushi-py-3 sushi-border sushi-border-transparent sushi-text-base sushi-leading-6 sushi-font-medium sushi-rounded-md sushi-text-white sushi-bg-orange-600 hover:sushi-bg-orange-500 focus:sushi-outline-none focus:sushi-shadow-outline sushi-transition sushi-duration-150 sushi-ease-in-out"
                >
                  Connect wallet to begin
                </button>
              </div>
            </div>
          ) : null}
          <div className="sushi-absolute sushi-w-full sushi-pointer-events-auto">
            <div className="sushi-flex sushi-items-center sushi-w-full sushi-p-4 sushi-pb-0">
              <div className="sushi-z-30 sushi-flex sushi-items-center sushi-justify-center sushi-flex-shrink-0">
                <button
                  onClick={() => {
                    history.push("/token/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2");
                  }}
                  className="sushi-mr-4 sushi-w-16 sushi-h-24 sushi-text-3xl sushi-rounded-md sushi-shadow-md"
                  style={{
                    border: "1px solid rgb(238, 109, 72)",
                    backgroundColor: "#feeddc",
                  }}
                >
                  🍣
                  <br />
                  <p className="text-xs font-medium">
                    Buy
                    <br />
                    SUSHI
                  </p>
                </button>
              </div>
              <div className="sushi-z-10 sushi-flex sushi-items-center sushi-justify-center sushi-flex-shrink-0">
                {!account ? (
                  <button
                    className="sushi-mr-4 sushi-w-16 sushi-h-24 sushi-text-3xl sushi-rounded-md sushi-shadow-md"
                    style={{
                      border: "1px solid rgb(238, 109, 72)",
                      backgroundColor: "#feeddc",
                    }}
                  >
                    ⛏️
                    <br />
                    <p className="text-xs font-medium">
                      Stake
                      <br />
                      SUSHI
                    </p>
                  </button>
                ) : (
                  <StakeSushi />
                )}
              </div>
              <div className="sushi-z-10 sushi-flex sushi-items-center sushi-justify-center sushi-flex-shrink-0">
                {!account ? (
                  <button
                    className="sushi-mr-4 sushi-w-16 sushi-h-24 sushi-text-3xl sushi-rounded-md sushi-shadow-md"
                    style={{
                      border: "1px solid rgb(238, 109, 72)",
                      backgroundColor: "#feeddc",
                    }}
                  >
                    🎣
                    <br />
                    <p className="text-xs font-medium">
                      Unstake
                      <br />
                      SUSHI
                    </p>
                  </button>
                ) : (
                  <UnstakeSushi />
                )}
              </div>
              <div className="sushi-z-10 sushi-flex sushi-items-center sushi-justify-center sushi-flex-shrink-0">
                <button
                  onClick={() => {
                    history.push("/pools");
                  }}
                  className="sushi-mr-4 sushi-w-16 sushi-h-24 sushi-text-3xl sushi-rounded-md sushi-shadow-md"
                  style={{
                    border: "1px solid rgb(238, 109, 72)",
                    backgroundColor: "#feeddc",
                  }}
                >
                  🎑
                  <br />
                  <p className="text-xs font-medium">
                    Harvest
                    <br /> Rewards
                  </p>
                </button>
              </div>
            </div>
            <div className="sushi-z-10 sushi-flex sushi-items-center sushi-p-4 sushi-pl-0 sushi-pb-2">
              <div className="sushi-z-10 sushi-flex-1 sushi-w-0 sushi-ml-5">
                <dl>
                  <dd>
                    <div className="sushi-inline-flex sushi-items-center sushi-text-4xl sushi-font-bold sushi-leading-8 sushi-text-gray-900 hover:sushi-underline">
                      <span className="sushi-pr-1">
                        {/* <CountUp end={278000} /> */}
                        <Value value={!!account ? getBalanceNumber(sushiBalance) : "Locked"} />
                      </span>
                    </div>
                    <div className="sushi-mt-0.5 sushi-text-gray-700">
                      Pending Harvest:{"   "}
                      <PendingRewards />
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <SushiBelt />
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
