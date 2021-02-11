import React, { useState } from "react";
import ClassicSwap from "../../services/exchange/pages/Swap/secondary";
import ClassicPool from "../../services/exchange/pages/AddLiquidity/secondary";
//import ClassicRemove from "../../services/exchange/pages/RemoveLiquidity/secondary";

//import Stakes from "./Stakes";
//import Migrate from "../../Migrate";
//import { MigrateNotice } from "../../Overview/MigrateNotice";
//import { LimitNotice } from "../../Overview/LimitNotice";
//import LiquidityBalances from "./LiquidityBalances";
//import Stake from "../../services/frontend/views/Farm/components/Stake";
//import TokenSwap from "../TokenSwap";

const Tabs = ({ selected, setSelected }) => {
  const tabs = [
    {
      title: "Swap",
      id: "swap",
    },
    // {
    //   title: "Limit",
    //   id: "limit",
    // },
    // {
    //   title: "Migrate",
    //   id: "migrate",
    // },
    {
      title: "+ Liquidity",
      id: "pool",
    },
    {
      title: "- Liquidity",
      id: "remove",
    },
  ];
  return (
    <div>
      <div className="sushi-block">
        <nav className="sushi--mb-px sushi-flex space-x-4">
          {tabs.map((tab) => {
            return (
              <button
                onClick={() => {
                  setSelected(tab.id);
                }}
                className={
                  selected === tab.id
                    ? "sushi-whitespace-no-wrap sushi-pb-4 sushi-px-1 sushi-border-b-2 border-gray-900 sushi-font-medium sushi-text-sm sushi-leading-5 text-gray-900 focus:sushi-outline-none focus:text-gray-900 focus:border-gray-700"
                    : "sushi-whitespace-no-wrap sushi-pb-4 sushi-px-1 sushi-border-b-2 sushi-border-transparent sushi-font-medium sushi-text-sm sushi-leading-5 sushi-text-gray-500 hover:sushi-text-gray-700 hover:sushi-border-gray-300 focus:sushi-outline-none focus:sushi-text-gray-700 focus:sushi-border-gray-300"
                }
              >
                {tab.title}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

const TokenActionsCard = ({ initialSection, title, currencyIdA, currencyIdB }) => {
  const [section, setSection] = useState(initialSection);
  const [removeView, setRemoveView] = useState("account");
  return (
    <div
      className="mb-4 md:shadow-2xl sushi-flex sushi-flex-col rounded-lg border-2 border-gray-900 sushi-overflow-hidden"
      style={{ minHeight: "20rem" }}
    >
      <div className="sushi-flex-1 sushi-bg-white sushi-p-6 sushi-flex sushi-flex-col sushi-justify-between">
        <div className="sushi-relative sushi-border-b sushi-border-gray-200 sushi-space-y-4 sushi-pb-0">
          {title ? (
            <div className="sushi-space-y-3 sushi-flex sushi-items-center sushi-justify-between sushi-space-y-0">
              <h3 className="sushi-pt-2 sushi-text-lg sushi-leading-6 sushi-font-medium sushi-text-gray-900">
                {title}
              </h3>
            </div>
          ) : null}
          <Tabs selected={section} setSelected={setSection} />
        </div>
        {
          {
            swap: (
              <div className="sushi-mt-6 sushi-flex-1">
                <ClassicSwap />
              </div>
            ),
            // migrate: (
            //   <>
            //     <Migrate />
            //   </>
            // ),
            // limit: (
            //   <>
            //     <LimitNotice />
            //   </>
            // ),
            pool: (
              <div className="sushi-mt-6 sushi-flex-1">
                <ClassicPool currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
              </div>
            ),
            // remove: (
            //   <>
            //     {
            //       {
            //         account: (
            //           <div className="sushi-mt-6 sushi-flex-1">
            //             <LiquidityBalances />
            //           </div>
            //         ),
            //         action: (
            //           <div className="sushi-mt-6 sushi-flex-1">
            //             <ClassicRemove currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
            //           </div>
            //         ),
            //       }[removeView]
            //     }
            //   </>
            // ),
          }[section]
        }
      </div>
    </div>
  );
};

export default TokenActionsCard;