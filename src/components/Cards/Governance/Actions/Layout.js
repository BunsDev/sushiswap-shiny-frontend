import React, { useState } from "react";
import Tabs from "./Tabs";
import ExpandButton from "../../../Buttons/ExpandButton";

const completedActions = [
  {
    title: "Liquidity Migration™️ Proposal",
    description:
      "Deploy all the necessary smart contracts - Migrator, SushiSwapFactory (UniswapFactory), SushiMaker, and SushiBar- and set 'setMigrator' function call the Timelock smart contract.",
    url: "/",
    cta: "View",
  },
  {
    title: "Grant Proposal: https://sushi.zippo.io",
    description:
      "Transfer weighted average value devshare $SUSHI tokens to @zippoxer address",
    url: "/",
    cta: "View",
  },
];
const pendingActions = [
  {
    title: "Liquidity Migration™️ Proposal",
    description:
      "Deploy all the necessary smart contracts - Migrator, SushiSwapFactory (UniswapFactory), SushiMaker, and SushiBar- and set 'setMigrator' function call the Timelock smart contract.",
    url: "/",
    cta: "View",
  },
  {
    title: "Grant Proposal: https://sushi.zippo.io",
    description:
      "Transfer weighted average value devshare $SUSHI tokens to @zippoxer address",
    url: "/",
    cta: "View",
  },
  {
    title: "Grant Proposal: https://sushi.zippo.io",
    description:
      "Transfer weighted average value devshare $SUSHI tokens to @zippoxer address",
    url: "/",
    cta: "View",
  },
  {
    title: "Grant Proposal: https://sushi.zippo.io",
    description:
      "Transfer weighted average value devshare $SUSHI tokens to @zippoxer address",
    url: "/",
    cta: "View",
  },
];

const GovernanceActionsCard = () => {
  const [section, setSection] = useState("pending");
  return (
    <div className="sushi-flex sushi-flex-col sushi-rounded-lg sushi-border sushi-border-gray-200 sushi-overflow-hidden">
      <div className="sushi-flex-1 sushi-bg-white sushi-p-6 sushi-flex sushi-flex-col sushi-justify-between">
        <div className="sushi-relative sushi-border-b sushi-border-gray-200 sushi-space-y-4 sushi-pb-0">
          <div className="sushi-space-y-3 sushi-flex sushi-items-center sushi-justify-between sushi-space-y-0">
            <h3 className="sushi-text-lg sushi-leading-6 sushi-font-medium sushi-text-gray-900">
              Governance Actions
            </h3>
            <div className="sushi-flex sushi-space-x-3 md:sushi-absolute md:sushi-right-0">
              <span>
                <a
                  href="https://snapshot.page/#/sushi"
                  target="_blank"
                  className="sushi-inline-flex sushi-items-center sushi-px-4 sushi-py-2 sushi-border sushi-border-gray-300 sushi-text-sm sushi-leading-5 sushi-font-medium sushi-rounded-md sushi-text-gray-700 sushi-bg-white hover:sushi-text-gray-500 focus:sushi-outline-none focus:sushi-shadow-outline-blue focus:sushi-border-blue-300 active:sushi-text-gray-800 active:sushi-bg-gray-50 sushi-transition sushi-duration-150 sushi-ease-in-out"
                >
                  Snapshot
                </a>
              </span>
              <span>
                <a
                  href="https://forum.sushiswapclassic.org/"
                  target="_blank"
                  className="sushi-inline-flex sushi-items-center sushi-px-4 sushi-py-2 sushi-border sushi-border-transparent sushi-text-sm sushi-leading-5 sushi-font-medium sushi-rounded-md sushi-text-white sushi-bg-orange-600 hover:sushi-bg-orange-500 focus:sushi-outline-none focus:sushi-shadow-outline-orange focus:sushi-border-orange-700 active:sushi-bg-orange-700 sushi-transition sushi-duration-150 sushi-ease-in-out"
                >
                  Forum
                </a>
              </span>
              <ExpandButton
                widgetPath={"/widgets/governance/actions"}
                dashboardPath={"/governance"}
              />
            </div>
          </div>
          <Tabs selected={section} setSelected={setSection} />
        </div>
        {
          {
            pending: (
              <div className="sushi-mt-2 sushi-flex-1">
                {pendingActions.map((action) => {
                  return (
                    <div className="sushi-mt-2 sushi-w-full sushi-bg-white sushi-shadow-lg sushi-rounded-lg sushi-pointer-events-auto">
                      <div className="sushi-flex sushi-rounded-lg sushi-shadow-xs">
                        <div className="sushi-w-0 sushi-flex-1 sushi-flex sushi-items-center sushi-p-4">
                          <div className="sushi-w-full">
                            <p className="sushi-text-sm sushi-leading-5 sushi-font-medium sushi-text-gray-900">
                              {action.title}
                            </p>
                            <p className="sushi-mt-1 sushi-text-sm sushi-leading-5 sushi-text-gray-500">
                              {action.description}
                            </p>
                          </div>
                        </div>
                        <div className="sushi-flex sushi-border-l sushi-border-gray-200">
                          <div className="sushi--ml-px sushi-flex sushi-flex-col">
                            <div className="sushi-h-0 sushi-flex-1 sushi-flex sushi-border-b sushi-border-gray-200">
                              <button className="sushi--mb-px sushi-flex sushi-items-center sushi-justify-center sushi-w-full sushi-rounded-tr-lg sushi-border sushi-border-transparent sushi-px-4 sushi-py-3 sushi-text-sm sushi-leading-5 sushi-font-medium sushi-text-orange-600 hover:sushi-text-orange-500 focus:sushi-outline-none focus:sushi-shadow-outline-blue focus:sushi-border-blue-300 active:sushi-text-orange-700 active:sushi-bg-gray-50 sushi-transition sushi-ease-in-out sushi-duration-150">
                                {action.cta}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ),
            completed: (
              <div className="sushi-mt-2 sushi-flex-1">
                {completedActions.map((action) => {
                  return (
                    <div className="sushi-mt-2 sushi-w-full sushi-bg-white sushi-shadow-lg sushi-rounded-lg sushi-pointer-events-auto">
                      <div className="sushi-flex sushi-rounded-lg sushi-shadow-xs">
                        <div className="sushi-w-0 sushi-flex-1 sushi-flex sushi-items-center sushi-p-4">
                          <div className="sushi-w-full">
                            <p className="sushi-text-sm sushi-leading-5 sushi-font-medium sushi-text-gray-900">
                              {action.title}
                            </p>
                            <p className="sushi-mt-1 sushi-text-sm sushi-leading-5 sushi-text-gray-500">
                              {action.description}
                            </p>
                          </div>
                        </div>
                        <div className="sushi-flex sushi-border-l sushi-border-gray-200">
                          <div className="sushi--ml-px sushi-flex sushi-flex-col">
                            <div className="sushi-h-0 sushi-flex-1 sushi-flex sushi-border-b sushi-border-gray-200">
                              <button className="sushi--mb-px sushi-flex sushi-items-center sushi-justify-center sushi-w-full sushi-rounded-tr-lg sushi-border sushi-border-transparent sushi-px-4 sushi-py-3 sushi-text-sm sushi-leading-5 sushi-font-medium sushi-text-orange-600 hover:sushi-text-orange-500 focus:sushi-outline-none focus:sushi-shadow-outline-blue focus:sushi-border-blue-300 active:sushi-text-orange-700 active:sushi-bg-gray-50 sushi-transition sushi-ease-in-out sushi-duration-150">
                                {action.cta}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ),
          }[section]
        }
      </div>
    </div>
  );
};

export default GovernanceActionsCard;
