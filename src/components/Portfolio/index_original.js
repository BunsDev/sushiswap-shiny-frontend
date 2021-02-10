/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

// Analytics
import {
  barUserQuery,
  blockQuery,
  currencyFormatter,
  decimalFormatter,
  ethPriceQuery,
  latestBlockQuery,
  lockupUserQuery,
  pairSubsetQuery,
  pairsQuery,
  poolUserQuery,
  tokenQuery,
  useInterval,
  userIdsQuery,
  userQuery,
} from "../../services/analytics/core";
import { getUnixTime, startOfMinute, startOfSecond } from "date-fns";
import { POOL_DENY } from "../../services/analytics/core/constants";
import { toChecksumAddress } from "web3-utils";
import { useQuery } from "@apollo/client";
import { ethers } from "ethers";

// Layout
import TableSushi from "./Tables/Sushi";
import TableFarms from "./Tables/Farms";
import TableTotal from "./Tables/Total";
import TableLP from "./Tables/LiquidityPositions";
//import WalletBalances from "./Tables/WalletBalances";

// Wallet integration
import { useActiveWeb3React } from "../../services/exchange/hooks";
import { Linker, Button } from "../Linker";

// Classic dependancies
import BigNumber from "bignumber.js";
import CountUp from "react-countup";
import StakeSushi from "./StakeSushi";
import UnstakeSushi from "./UnstakeSushi";

import useTokenBalance from "./hooks/useTokenBalance";
//import useAllEarnings from "./hooks/useAllEarnings";
import useAllEarningsAccount from "./hooks/useAllEarningsAccount";
import useAllStakedValue from "./hooks/useAllStakedValue";
import useTotalSushiStakedInBar from "./hooks/useTotalSushiStakedInBar";
import useTotalXSushiSupply from "./hooks/useTotalXSushiSupply";
import useFarms from "../../services/frontend/hooks/useFarms";

import { contractAddresses } from "../../services/frontend/sushi/lib/constants";
import { useTokenData } from "../../services/vision/contexts/TokenData";
import { formattedNum } from "../../services/vision/utils";
import { getBalanceNumber } from "../../services/frontend/utils/formatBalance";

// vision dependancies
import { useEthPrice } from "../../services/vision/contexts/GlobalData";
import { client } from "../../services/vision/apollo/client";
import { USER_POSITIONS, USER_HISTORY } from "../../services/vision/apollo/queries";
import { getLPReturnsOnPair } from "../../services/vision/utils/returns";
import { FEE_WARNING_TOKENS } from "../../services/vision/constants";

// additional dependancies
import useHarvestedSushi from "./hooks/useHarvestedSushi";

// modals
import HarvestModal from "./Harvest/Modal";
import LockedModal from "./Modals/Locked";
import useModal from "../../shared/hooks/useModal";

// Loading pulse
import { Loader } from "./Tables/Loader";

import _ from "lodash";
import sushiData from "@sushiswap/sushi-data";

import Notice from "../Notice";

const Account = () => {
  const { account } = useActiveWeb3React();
  //const account = "0x8867eF1593F6A72DbbB941D4D96b746A4da691B2";
  const { ethereum } = window;
  //console.log("ethereum:", ethereum, account);
  //const id = account;

  // GET USER SNAPSHOTS
  const [snapshots, setSnapshots] = useState();
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

          //console.log("LP SNAPSHOT:", result.data.liquidityPositionSnapshots);

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

  // Get Unstaked Liquidity Positions
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

  //console.log("POSITIONS:", positions);
  //console.log("SNAPSHOTS:", snapshots);

  // Get Sushi Price in USD
  const { priceUSD } = useTokenData("0x6b3595068778dd592e39a122f4f5a5cf09c90fe2");

  // Get users # of Sushi not staked
  const totalNotStaked = useTokenBalance(contractAddresses.sushi[1]);
  const totalNotStakedUSD = priceUSD ? formattedNum(getBalanceNumber(totalNotStaked) * priceUSD, true) : "";
  //console.log("totalNotStaked:", totalNotStaked);

  // Get Sushi staked, issue with analytics query:
  const xSushiBalance = useTokenBalance(contractAddresses.xSushi[1]);
  const xSushiFormatted = new BigNumber(xSushiBalance).div(new BigNumber(1000000000000000000));
  const totalSupply = useTotalXSushiSupply();
  const totalStaked = useTotalSushiStakedInBar();
  const poolShare = new BigNumber(xSushiBalance).div(new BigNumber(totalSupply));
  const poolStaked = new BigNumber(poolShare).times(new BigNumber(totalStaked));
  const sushiStaked = new BigNumber(poolStaked).div(new BigNumber(1000000000000000000));
  // console.log("sushiStaked:", {
  //   xSushiBalance: xSushiBalance,
  //   totalSupply: totalSupply,
  //   totalStaked: totalStaked,
  //   poolShare: poolShare,
  //   poolStaked: poolStaked,
  //   sushiStaked: sushiStaked,
  // });

  // Get all pending Sushi from farms
  const allEarnings = useAllEarningsAccount(account);
  let sumEarning = 0;
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber();
  }
  //const [farms] = useFarms();
  //console.log("farms_:", farms);
  // const allStakedValue = useAllStakedValue();
  // if (allStakedValue && allStakedValue.length) {
  //   const sumWeth = farms.reduce((c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0), 0);
  // }

  // Initialize Analytics Queries -------------------------------------------//

  const { data: { bundles } = {} } = useQuery(ethPriceQuery, {
    pollInterval: 60000,
  });
  const { data: barData } = useQuery(barUserQuery, {
    variables: {
      id: account.toLowerCase(),
    },
    context: {
      clientName: "bar",
    },
  });
  const { data: poolData } = useQuery(poolUserQuery, {
    variables: {
      address: account.toLowerCase(),
    },
    context: {
      clientName: "masterchef",
    },
  });
  const { data: lockupData } = useQuery(lockupUserQuery, {
    variables: {
      address: account.toLowerCase(),
    },
    context: {
      clientName: "lockup",
    },
  });
  const poolUsers = poolData?.users.filter(
    (user) => user.pool && !POOL_DENY.includes(user.pool.id) && user.pool.allocPoint !== "0"
  );
  const { data: { token } = {} } = useQuery(tokenQuery, {
    variables: {
      id: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    },
  });

  //console.log("poolUsers:", poolData, lockupData);

  //console.log("token:", token);
  const { data: { pairs } = {} } = useQuery(pairsQuery);

  // Sushi Price
  const sushiPrice = parseFloat(token?.derivedETH) * parseFloat(bundles?.[0].ethPrice);
  // Amount of Staked Sushi (xSUSHI)
  const xSushi = parseFloat(barData?.user?.xSushi);
  //
  const barPending =
    (xSushi * parseFloat(barData?.user?.bar?.sushiStaked)) / parseFloat(barData?.user?.bar?.totalSupply);

  //console.log("barPending:", barPending, xSushi, barData?.user?.bar?.sushiStaked, barData?.user?.bar?.totalSupply);
  //console.log("sushiPrice:", sushiPrice, token, parseFloat(token?.derivedETH), parseFloat(bundles?.[0].ethPrice));
  const xSushiTransfered =
    barData?.user?.xSushiIn > barData?.user?.xSushiOut
      ? parseFloat(barData?.user?.xSushiIn) - parseFloat(barData?.user?.xSushiOut)
      : parseFloat(barData?.user?.xSushiOut) - parseFloat(barData?.user?.xSushiIn);

  const stakedTransferProportion = parseFloat(
    (barData?.user?.sushiStaked / (xSushi + xSushiTransfered)) * xSushiTransfered
  );
  const stakedUSDTransferProportion = parseFloat(
    (barData?.user?.sushiStakedUSD / (xSushi + xSushiTransfered)) * xSushiTransfered
  );
  const barStaked = barData?.user?.sushiStaked;
  const barStakedUSD = barData?.user?.sushiStakedUSD;
  const farmingStaked = poolUsers?.reduce((previousValue, currentValue) => {
    // console.log(currentValue);
    const pair = pairs?.find((pair) => pair?.id == currentValue?.pool?.pair);
    if (!pair) {
      return previousValue;
    }
    // console.log(currentValue?.pool?.pair);
    const share = currentValue.amount / currentValue?.pool?.balance;
    return previousValue + pair?.reserveUSD * share;
  }, 0);
  const farmingPending =
    poolUsers?.reduce((previousValue, currentValue) => {
      return (
        previousValue +
        ((currentValue.amount * currentValue.pool.accSushiPerShare) / 1e12 - currentValue.rewardDebt) / 1e18
      );
    }, 0) * sushiPrice;
  const poolInvestments = poolData?.users.reduce((previousValue, currentValue) => {
    return parseFloat(previousValue) + parseFloat(currentValue.entryUSD);
  }, 0);
  const originalInvestments = parseFloat(barData?.user?.sushiStakedUSD) + parseFloat(poolInvestments);
  const barPendingUSD = barPending > 0 ? barPending * sushiPrice : 0;

  //console.log("barPendingUSD:", barPendingUSD, barPending, sushiPrice);
  const barRoiSushi =
    parseFloat(barData?.user?.sushiHarvested) -
    parseFloat(barData?.user?.sushiStaked) -
    parseFloat(barData?.user?.sushiOut) +
    // parseFloat(barData?.user?.sushiIn) +
    barPending;
  const barRoiUSD =
    barData?.user?.sushiHarvestedUSD - barData?.user?.sushiStakedUSD - barData?.user?.usdOut + barPendingUSD;
  const { data: blocksData } = useQuery(latestBlockQuery, {
    context: {
      clientName: "blocklytics",
    },
  });
  const blockDifference = parseInt(blocksData?.blocks[0].number) - parseInt(barData?.user?.createdAtBlock);
  const barRoiDailySushi = ((barPending + barRoiSushi - barStaked) / blockDifference) * 6440;
  const investments = farmingStaked + barPendingUSD + farmingPending;

  //console.log("ACCOUNTS:", account, id);
  //console.log("INVESTMENTS:", investments, farmingStaked, barPendingUSD, farmingPending);

  // calculate total locked sushi

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const lockups = await sushiData.lockup.user({ user_address: account });
  //     let atLockup = 0;
  //     let harvested = 0;
  //     lockups.map((farm) => {
  //       const sushiAtLockup = ((farm.amount * farm.pool.accSushiPerShare) / 1e12 - farm.rewardDebt) / 1e18;
  //       atLockup = atLockup + sushiAtLockup;
  //       harvested = harvested + farm.sushiHarvestedSinceLockup;
  //     });
  //     const total = (harvested + sumEarning - atLockup) * 2;
  //     console.log("lockup:", total, harvested, sumEarning, atLockup);
  //   };
  //   fetchData();
  // }, []);

  const totalSushiAtLockup = _.sum(
    lockupData?.users?.map((lockupUser) => {
      return ((lockupUser.amount * lockupUser.pool.accSushiPerShare) / 1e12 - lockupUser.rewardDebt) / 1e18;
    })
  );
  // todo: ignores if position withdrawn
  // const totalSushiHarvestedSinceLockup = _.sum(
  //   poolUsers?.map((user) => {
  //     return parseFloat(user.sushiHarvestedSinceLockup);
  //   })
  // );
  // const { harvestedSushi, error } = useHarvestedSushi(account);
  const harvestedSushi = null;
  const error = true;
  const totalSushiHarvestedSinceLockup =
    harvestedSushi != null && !error && ethers.utils.formatUnits(harvestedSushi, 18);

  // console.log(
  //   "totalSushiHarvestedSinceLockup:",
  //   Number(totalSushiHarvestedSinceLockup),
  //   sumEarning,
  //   totalSushiAtLockup,
  //   (Number(totalSushiHarvestedSinceLockup) + sumEarning - totalSushiAtLockup) * 2
  // );

  const totalSushiLocked = (Number(totalSushiHarvestedSinceLockup) + sumEarning - totalSushiAtLockup) * 2;
  const totalSushiLockedUSD = totalSushiLocked * sushiPrice;
  console.log(
    "lockedSushi",
    totalSushiLocked,
    totalSushiLockedUSD,
    totalSushiHarvestedSinceLockup,
    sumEarning,
    totalSushiAtLockup
  );

  // console.log(
  //   "totalSushiLocked:",
  //   totalSushiLocked,
  //   sumEarning,
  //   _.sum(totalSushiAtLockup),
  //   _.sum(totalSushiHarvestedSinceLockup)
  // );

  let farmBalances = [];
  // causes no-used-expression warning, see eslint disabling at top of file
  poolUsers?.map((user) => {
    const pair = pairs?.find((pair) => pair?.id == user.pool.pair);
    const slp = Number(user.amount / 1e18);
    const share = slp / pair?.totalSupply; // user.amount / user.pool.balance;
    const token0 = pair?.reserve0 * share;
    const token1 = pair?.reserve1 * share;
    const pendingSushi = ((user.amount * user.pool.accSushiPerShare) / 1e12 - user.rewardDebt) / 1e18;
    const lockupUser = lockupData?.users.find((u) => u.pool.id === user.pool.id);
    const sushiAtLockup = lockupUser
      ? ((lockupUser.amount * lockupUser.pool.accSushiPerShare) / 1e12 - lockupUser.rewardDebt) / 1e18
      : 0;
    // todo: pending sushi doesnt account for farms user has unstaked
    // patch: use sumEarnings
    // console.log("pendingSushi:", pendingSushi, sumEarning);
    // const sushiLocked = (parseFloat(user.sushiHarvestedSinceLockup) + pendingSushi - sushiAtLockup) * 2;
    const sushiLocked = (parseFloat(user.sushiHarvestedSinceLockup) + pendingSushi - sushiAtLockup) * 2;
    const sushiLockedUSD = sushiLocked * sushiPrice;

    farmBalances.push({
      id: Number(user.pool.id),
      pair: user.pool.pair,
      name: pair?.token0.symbol + "-" + pair?.token1.symbol,
      slp: decimalFormatter.format(slp),
      token0Address: pair?.token0.id,
      token0Symbol: pair?.token0.symbol,
      token0Balance: decimalFormatter.format(token0),
      token1Address: pair?.token1.id,
      token1Symbol: pair?.token1.symbol,
      token1Balance: decimalFormatter.format(token1),
      valueUSD: pair?.reserveUSD * share,
      pendingSushi: decimalFormatter.format(pendingSushi),
      pendingSushiUSD: currencyFormatter.format(pendingSushi * sushiPrice),
      harvestedSushi: decimalFormatter.format(user.sushiHarvested),
      harvestedSushiUSD: currencyFormatter.format(user.sushiHarvestedUSD),
      lockedSushi: sushiLocked,
      lockedSushiUSD: sushiLockedUSD,
      entriesUSD: currencyFormatter.format(user.entryUSD),
      exitsUSD: currencyFormatter.format(user.exitUSD),
      profitUSD:
        parseFloat(pair?.reserveUSD * share) +
        parseFloat(user.exitUSD) +
        parseFloat(user.sushiHarvestedUSD) +
        parseFloat(pendingSushi * sushiPrice) -
        parseFloat(user.entryUSD),
    });
  });

  //console.log("FARM BALANCES:", farmBalances);
  //console.log("FARM VALUE: ", _.sumBy(farmBalances, "valueUSD"));

  // const totalSushiBalance =
  //   Number(sumEarning) +
  //   Number(_.sumBy(farmBalances, "lockedSushi")) +
  //   Number(getBalanceNumber(totalNotStaked)) +
  //   Number(barStaked); // issue with barStaked calculation

  const totalSushiBalance =
    Number(sumEarning) +
    Number(totalSushiLocked) +
    //Number(_.sumBy(farmBalances, "lockedSushi")) +
    Number(getBalanceNumber(totalNotStaked)) +
    Number(sushiStaked);

  // console.log("BALANCES:", {
  //   totalSushiBalance: totalSushiBalance,
  //   sumEarning: sumEarning,
  //   lockedSushi: _.sumBy(farmBalances, "lockedSushi"),
  //   notStaked: getBalanceNumber(totalNotStaked),
  //   staked: Number(barStaked),
  // });

  // initialize modals
  const [onPresentHarvest] = useModal(<HarvestModal />, null, null, null);
  const [onPresentLocked] = useModal(<LockedModal />, null, null, null);

  const balances = [
    {
      title: "Harvestable",
      sushi: sumEarning || sumEarning === 0 ? formattedNum(sumEarning, false) : <Loader />,
      usd:
        (sumEarning && priceUSD) || (sumEarning === 0 && priceUSD) ? (
          formattedNum(sumEarning * priceUSD, true)
        ) : (
          <Loader />
        ),
      cta: <Button title="Harvest" onClick={onPresentHarvest} />,
    },
    {
      title: "Locked (2/3)",
      sushi:
        totalSushiLocked > 0 && totalSushiLocked ? decimalFormatter.format(totalSushiLocked) + " SUSHI" : <Loader />,
      usd:
        totalSushiLocked > 0 && totalSushiLockedUSD && sushiPrice ? (
          currencyFormatter.format(totalSushiLockedUSD)
        ) : (
          <Loader />
        ),
      cta: <Button title="Learn more" onClick={onPresentLocked} />, //<Linker title="Learn more" to="https://docs.sushiswap.fi" external />,
    },
    // {
    //   title: "Locked (2/3)",
    //   sushi: farmBalances ? decimalFormatter.format(_.sumBy(farmBalances, "lockedSushi")) + " SUSHI" : <Loader />,
    //   usd: farmBalances && sushiPrice ? currencyFormatter.format(_.sumBy(farmBalances, "lockedSushiUSD")) : <Loader />,
    //   cta: <Button title="Learn more" onClick={onPresentLocked} />, //<Linker title="Learn more" to="https://docs.sushiswap.fi" external />,
    // },
    {
      title: "Unstaked",
      sushi: totalNotStaked ? `${Number(getBalanceNumber(totalNotStaked)).toFixed(4)} SUSHI` : <Loader />,
      usd: totalNotStakedUSD ? totalNotStakedUSD : <Loader />,
      cta: <StakeSushi />,
    },
    {
      title: "Staked",
      sushi:
        Number(sushiStaked) || Number(sushiStaked) === 0 ? (
          `${decimalFormatter.format(Number(sushiStaked))} SUSHI`
        ) : (
          <Loader />
        ),
      //sushi: barStaked ? `${decimalFormatter.format(barStaked)} SUSHI` : <Loader />,
      xsushi:
        Number(xSushiFormatted) || Number(xSushiFormatted) === 0 ? (
          `(${Number(xSushiFormatted.toFixed(2)).toLocaleString()} xSUSHI)`
        ) : (
          <Loader />
        ),
      //xsushi: xSushi ? `${Number(xSushi.toFixed(2)).toLocaleString()} xSUSHI` : <Loader />,
      //usd: `${currencyFormatter.format(barStakedUSD)}`, // incorrect for some reason
      //usd: barStaked && priceUSD ? `${currencyFormatter.format(barStaked * priceUSD)}` : <Loader />,
      usd:
        (Number(sushiStaked) && priceUSD) || (Number(sushiStaked) === 0 && priceUSD) ? (
          `${currencyFormatter.format(Number(sushiStaked) * priceUSD)}`
        ) : (
          <Loader />
        ),
      cta: <UnstakeSushi />,
    },
  ];

  // console.log("formatted:", totalSushiBalance, formattedNum(totalSushiBalance), formattedNum(totalSushiBalance, true));
  // console.log(
  //   "formatted:",
  //   totalSushiBalance * sushiPrice,
  //   formattedNum(totalSushiBalance * sushiPrice),
  //   formattedNum(totalSushiBalance * sushiPrice, true)
  // );

  let LPBalance = 0;
  positions?.forEach((position) => {
    const poolOwnership = position.liquidityTokenBalance / position.pair.totalSupply;
    const valueUSD = poolOwnership * position.pair.reserveUSD;
    LPBalance = LPBalance + valueUSD;
  });

  // const totalBalanceUSD = formattedNum(
  //   totalSushiBalance * sushiPrice + _.sumBy(farmBalances, "valueUSD") + LPBalance,
  //   true
  // );

  // if any position has token from fee warning list, show warning
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    if (positions) {
      for (let i = 0; i < positions.length; i++) {
        if (
          FEE_WARNING_TOKENS.includes(positions[i].pair.token0.id) ||
          FEE_WARNING_TOKENS.includes(positions[i].pair.token1.id)
        ) {
          setShowWarning(true);
        }
      }
    }
  }, [positions]);

  return (
    <>
      {/* <WalletBalances account={account} /> */}
      <Notice />
      <TableTotal
        totalBalanceUSD={
          (totalSushiBalance || totalSushiBalance === 0) &&
          sushiPrice &&
          farmBalances &&
          (LPBalance || LPBalance === 0) ? (
            formattedNum(totalSushiBalance * sushiPrice + _.sumBy(farmBalances, "valueUSD") + LPBalance, true)
          ) : (
            <Loader />
          )
        }
        account={account}
      />
      <TableSushi
        balances={balances ? balances : <Loader />}
        price={sushiPrice ? currencyFormatter.format(sushiPrice) : <Loader />}
        totalSushiBalance={totalSushiBalance || totalSushiBalance === 0 ? formattedNum(totalSushiBalance) : <Loader />}
        totalSushiBalanceUSD={
          (totalSushiBalance && sushiPrice) || (totalSushiBalance === 0 && sushiPrice) ? (
            formattedNum(totalSushiBalance * sushiPrice, true)
          ) : (
            <Loader />
          )
        }
      />
      <TableLP positions={positions} ethPrice={ethPrice} LPBalanceUSD={formattedNum(LPBalance, true)} />
      <TableFarms positions={farmBalances} farmBalanceUSD={formattedNum(_.sumBy(farmBalances, "valueUSD"), true)} />
      {/* <div className="grid grid-cols-12 gap-8 bg-gray-100">
        <div className="col-span-4">
          <div className="p-4 rounded-md "> Hello </div>
        </div>
        <div className="col-span-8">
          <div className="p-4">
            <TableTotal
              totalBalanceUSD={
                (totalSushiBalance || totalSushiBalance === 0) &&
                sushiPrice &&
                farmBalances &&
                (LPBalance || LPBalance === 0) ? (
                  formattedNum(totalSushiBalance * sushiPrice + _.sumBy(farmBalances, "valueUSD") + LPBalance, true)
                ) : (
                  <Loader />
                )
              }
              account={account}
            />
            <TableSushi
              balances={balances ? balances : <Loader />}
              price={sushiPrice ? currencyFormatter.format(sushiPrice) : <Loader />}
              totalSushiBalance={
                totalSushiBalance || totalSushiBalance === 0 ? formattedNum(totalSushiBalance) : <Loader />
              }
              totalSushiBalanceUSD={
                (totalSushiBalance && sushiPrice) || (totalSushiBalance === 0 && sushiPrice) ? (
                  formattedNum(totalSushiBalance * sushiPrice, true)
                ) : (
                  <Loader />
                )
              }
            />
            <TableLP positions={positions} ethPrice={ethPrice} LPBalanceUSD={formattedNum(LPBalance, true)} />
            <TableFarms
              positions={farmBalances}
              farmBalanceUSD={formattedNum(_.sumBy(farmBalances, "valueUSD"), true)}
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Account;