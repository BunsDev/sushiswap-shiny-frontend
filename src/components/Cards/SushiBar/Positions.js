import BigNumber from "bignumber.js";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import ExpandButton from "../../Buttons/ExpandButton";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { useWallet } from "use-wallet";
import { getContract } from "../../../services/frontend/utils/erc20";
import { contractAddresses } from "../../../services/frontend/sushi/lib/constants";
import { getXSushiSupply, getTotalSushiStakedInBar } from "../../../services/frontend/sushi/utils";
import { getBalanceNumber } from "../../../services/frontend/utils/formatBalance";
import useTokenBalance from "../../../services/frontend/hooks/useTokenBalance";

//import AccountPage from "../../../services/vision/pages/AccountPage";
import { useUserTransactions, useUserPositions } from "../../../services/vision/contexts/User";
import { client } from "../../../services/vision/apollo/client";
import {
  USER_TRANSACTIONS,
  USER_POSITIONS,
  USER_HISTORY,
  PAIR_DAY_DATA_BULK,
} from "../../../services/vision/apollo/queries";
import { getLPReturnsOnPair } from "../../../services/vision/utils/returns";
import { useEthPrice } from "../../../services/vision/contexts/GlobalData";
import { formattedNum } from "../../../services/vision/utils";
import { isAddress } from "../../../services/vision/utils/index.js";
import logoNotFound from "../../../assets/img/logoNotFound.png";

import PositionList from "../../../services/vision/components/PositionList/secondary";

import sushiData from "@sushiswap/sushi-data";
import Web3 from "web3";
import ERC20ABI from "../../../services/frontend/constants/abi/ERC20.json";
import { Sushi } from "../../../services/frontend/sushi";
import { getMasterChefContract } from "../../../services/frontend/sushi/utils";

import ColumnEarnings from "./Columns/Earnings";

const Layout = () => {
  const { account } = useWallet();
  return <>{account ? <Account account={account} /> : <Loading />}</>;
};

const Loading = () => {
  return (
    <>
      <div className="bg-white border border-gray-200 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your SushiBar Stats</h3>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">SUSHI and xSUSHI</p>
        </div>
        <div className="px-4 py-5 sm:p-0">
          <dl>
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500 sm:mt-0 sm:col-span-1">Total SUSHI</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900"></dd>
            </div>
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500 sm:mt-0 sm:col-span-1">Locked SUSHI</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900"></dd>
            </div>
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500 sm:mt-0 sm:col-span-1">Unlocked SUSHI</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900"></dd>
            </div>
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500 sm:mt-0 sm:col-span-1">Unstaked SUSHI</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900"></dd>
            </div>
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500 sm:mt-0 sm:col-span-1">Staked SUSHI</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900"></dd>
            </div>
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500 sm:mt-0 sm:col-span-1">xSUSHI Balance</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900"></dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

const Account = ({ account }) => {
  console.log("ACCOUNT:", account);

  const [snapshots, setSnapshots] = useState();
  // GET USER SNAPSHOTS
  useEffect(() => {
    async function fetchData() {
      try {
        let skip = 0;
        let allResults = [];
        let found = false;
        while (!found) {
          let result = await client.query({
            query: USER_HISTORY,
            variables: {
              skip: skip,
              user: account.toLowerCase(),
            },
            fetchPolicy: "cache-first",
          });

          console.log("LP SNAPSHOT:", result.data.liquidityPositionSnapshots);

          allResults = allResults.concat(result.data.liquidityPositionSnapshots);
          if (result.data.liquidityPositionSnapshots.length < 1000) {
            found = true;
          } else {
            skip += 1000;
          }
        }
        if (allResults) {
          setSnapshots(allResults);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [account]);

  //GET USER POSITIONS
  const [ethPrice] = useEthPrice();
  const [positions, setPositions] = useState();
  useEffect(() => {
    async function fetchData(account) {
      try {
        let result = await client.query({
          query: USER_POSITIONS,
          variables: {
            user: account.toLowerCase(),
          },
          fetchPolicy: "no-cache",
        });
        if (result?.data?.liquidityPositions) {
          let formattedPositions = await Promise.all(
            result?.data?.liquidityPositions.map(async (positionData) => {
              const returnData = await getLPReturnsOnPair(account, positionData.pair, ethPrice, snapshots);
              return {
                ...positionData,
                ...returnData,
              };
            })
          );
          setPositions(formattedPositions);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData(account);
  }, [account, snapshots]);

  console.log("SNAPSHOTS", snapshots);
  console.log("POSITIONS", positions);
  const transactions = useUserTransactions(account);

  const { ethereum } = useWallet();
  const [mergedPositions, setMergedPositions] = useState();

  useEffect(() => {
    if (positions && account) {
      const getAccountStat = async (pools, position, account, masterChefContract) => {
        const pool = pools.find(({ lpToken }) => {
          console.log("POOL:", lpToken, position.pair.id);
          return lpToken === position.pair.id;
        });
        console.log("FOUND POOL:", pool);
        const earnings = pool
          ? getBalanceNumber(new BigNumber(await masterChefContract.methods.pendingSushi(pool.id, account).call()))
          : 0;
        const stats = { ...position, earnings: earnings, pid: pool ? pool.id : null };
        return stats;
      };

      const fetchAccountStats = async () => {
        const chainId = Number(ethereum.chainId);
        const sushi = new Sushi(ethereum, chainId, false, {
          defaultAccount: ethereum.selectedAddress,
          defaultConfirmations: 1,
          autoGasMultiplier: 1.5,
          testing: false,
          defaultGas: "6000000",
          defaultGasPrice: "1000000000000",
          accounts: [],
          ethereumNodeTimeout: 10000,
        });
        const masterChefContract = getMasterChefContract(sushi);
        // todo - as menu of week grows and pids grow querying this will get slower...
        const pools = await sushiData.masterchef.Pools().then((pools) => {
          return pools;
        });
        console.log("POOLS:", pools);
        // Run in parallel
        const promises = positions.map((position) => getAccountStat(pools, position, account, masterChefContract));
        const accountStats = await Promise.all(promises);
        setMergedPositions(accountStats);
      };
      fetchAccountStats();
    }
  }, [positions]);

  return (
    <>
      <Table positions={mergedPositions} ethPrice={ethPrice} />
    </>
  );
};

const Table = ({ positions, ethPrice }) => {
  return (
    <>
      <div className="flex overflow-hidden bg-white">
        {/* Main column */}
        {/* Title */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Liquidity Positions</h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">View all pairs</p>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <h3 className="text-lg text-right leading-6 font-medium text-gray-900">$100</h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">9887 SUSHI</p>
              </div>
            </div>
          </div>
          {/* Main content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
            {/* Pinned projects can go here */}
            {/* Projects table (small breakpoint and up) */}
            <div className="block">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="min-w-full">
                  <TableHead />
                  <tbody className="bg-white divide-y divide-gray-100">
                    {/* More project rows... */}
                    {positions &&
                      positions.map((position) => {
                        return <TableRow position={position} ethPrice={ethPrice} />;
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const TableHead = () => {
  return (
    <>
      <thead>
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <span className="lg:pl-2">Name</span>
          </th>
          <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Liquidity
          </th>
          <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Total Fees Earned
          </th>
          <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Rewards
          </th>
          <th className="pr-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" />
          <th className="pr-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" />
        </tr>
      </thead>
    </>
  );
};

const TableRow = ({ position, ethPrice }) => {
  const poolOwnership = position.liquidityTokenBalance / position.pair.totalSupply;
  const valueUSD = poolOwnership * position.pair.reserveUSD;
  return (
    <>
      <tr>
        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 -space-x-1">
              <img
                className="relative z-30 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                  position.pair.token0.id
                )}/logo.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = logoNotFound;
                }}
              />
              <img
                className="relative z-20 -ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                  position.pair.token1.id
                )}/logo.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = logoNotFound;
                }}
              />
            </div>
            <div className="flex items-center space-x-3 lg:pl-2">
              <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600" />
              <a href="#" className="truncate hover:text-gray-600">
                <span>{position.pair.token0.symbol + "-" + position.pair.token1.symbol}</span>
              </a>
            </div>
          </div>
        </td>
        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          <div className="text-gray-900">{formattedNum(valueUSD, true, true)}</div>
          <div>
            {formattedNum(poolOwnership * parseFloat(position.pair.reserve0))} {position.pair.token0.symbol}
          </div>
          <div>
            {formattedNum(poolOwnership * parseFloat(position.pair.reserve1))} {position.pair.token1.symbol}
          </div>
        </td>
        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          <div className="text-green-500">{formattedNum(position?.fees.sum, true, true)}</div>
          <div>
            {parseFloat(position.pair.token0.derivedETH)
              ? formattedNum(
                  position?.fees.sum / (parseFloat(position.pair.token0.derivedETH) * ethPrice) / 2,
                  false,
                  true
                )
              : 0}{" "}
            {position.pair.token0.symbol}
          </div>
          <div>
            {parseFloat(position.pair.token1.derivedETH)
              ? formattedNum(
                  position?.fees.sum / (parseFloat(position.pair.token1.derivedETH) * ethPrice) / 2,
                  false,
                  true
                )
              : 0}{" "}
            {position.pair.token1.symbol}
          </div>
        </td>
        <ColumnEarnings position={position} />
        <td className="pr-6">
          <div className="relative flex justify-end items-center">
            <button
              type="button"
              class="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
            >
              Add
            </button>
          </div>
        </td>
        <td className="pr-6">
          <div className="relative flex justify-end items-center">
            <button
              type="button"
              class="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
            >
              Remove
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Layout;
