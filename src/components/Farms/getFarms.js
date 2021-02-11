import { getAverageBlockTime, getEthPrice, getToken } from "../../services/analytics/core/api";
import { liquidityPositionSubsetQuery, pairSubsetQuery } from "../../services/analytics/core/queries/exchange";
import { poolsQuery } from "../../services/analytics/core/queries/masterchef";
import { POOL_DENY } from "../../services/analytics/core/constants";
import { getApollo } from "../../services/analytics/core/apollo";

import { FARM_DETAILS, menus } from "../../constants/farms";
//import sushiData from "@sushiswap/sushi-data";

export async function getFarms(client = getApollo(), group) {
  // const sushiPools = await sushiData.masterchef.pools();
  // console.log("sushiPools:", sushiPools);

  //console.log("group:", menus[group].length, menus[group]);

  const {
    data: { pools },
  } = await client.query({
    query: poolsQuery,
    context: {
      clientName: "masterchef",
    },
  });
  const pairAddresses = pools
    .map((pool) => {
      return pool.pair;
    })
    .sort();

  const pool45 = pools.find((p) => p.id === "45");
  const {
    data: { pairs },
  } = await client.query({
    query: pairSubsetQuery,
    variables: { pairAddresses },
    fetchPolicy: "network-only",
  });
  //console.log("sushiPairs:", pairs);

  // const averageBlockTime = (await getAverageBlockTime()) / 100;
  const averageBlockTime = await getAverageBlockTime();
  // const averageBlockTime = 13;
  const { bundles } = await getEthPrice();
  const ethPrice = bundles[0].ethPrice;
  const { token } = await getToken("0x6b3595068778dd592e39a122f4f5a5cf09c90fe2");
  const sushiPrice = ethPrice * token.derivedETH;

  // MASTERCHEF
  const {
    data: { liquidityPositions },
  } = await client.query({
    query: liquidityPositionSubsetQuery,
    variables: { user: "0xc2edad668740f1aa35e4d8f227fb8e17dca888cd" },
  });

  const farms = pools
    .filter((pool) => {
      // group: "all", "onsen", "upcoming", "previous", "active"
      // console.log("group:", group, menus[group], pool.id);

      //console.log("group:", group);
      switch (group) {
        case "all":
          return !POOL_DENY.includes(pool.id) && pairs.find((pair) => pair?.id === pool.pair);
        case "active":
          return (
            !POOL_DENY.includes(pool.id) &&
            //pool.accSushiPerShare !== "0" &&
            menus[group].includes(Number(pool.id)) &&
            pairs.find((pair) => pair?.id === pool.pair)
          );
        case "permanent":
          return (
            !POOL_DENY.includes(pool.id) &&
            //pool.accSushiPerShare !== "0" &&
            menus[group].includes(Number(pool.id)) &&
            pairs.find((pair) => pair?.id === pool.pair)
          );
        case "onsen":
          return (
            !POOL_DENY.includes(pool.id) &&
            menus[group].includes(Number(pool.id)) &&
            pairs.find((pair) => pair?.id === pool.pair)
          );
        case "previous":
          return (
            !POOL_DENY.includes(pool.id) && pool.allocPoint === "0" && pairs.find((pair) => pair?.id === pool.pair)
          );
        default:
          return (
            !POOL_DENY.includes(pool.id) &&
            pool.allocPoint !== "0" &&
            pool.accSushiPerShare !== "0" &&
            pairs.find((pair) => pair?.id === pool.pair)
          );
      }
      // if (group === "all") {
      //   return !POOL_DENY.includes(pool.id) && pairs.find((pair) => pair?.id === pool.pair);
      // } else if (group === "previous") {
      //   return !POOL_DENY.includes(pool.id) && pool.allocPoint === "0" && pairs.find((pair) => pair?.id === pool.pair);
      // } else if (group) {
      //   return (
      //     !POOL_DENY.includes(pool.id) &&
      //     //pool.allocPoint !== "0" &&
      //     pool.accSushiPerShare !== "0" &&
      //     menus[group].includes(Number(pool.id)) &&
      //     pairs.find((pair) => pair?.id === pool.pair)
      //   );
      // } else {
      //   return (
      //     !POOL_DENY.includes(pool.id) &&
      //     pool.allocPoint !== "0" &&
      //     pool.accSushiPerShare !== "0" &&
      //     pairs.find((pair) => pair?.id === pool.pair)
      //   );
      // }
      // return (
      //   !POOL_DENY.includes(pool.id) &&
      //   pool.allocPoint !== "0" &&
      //   pool.accSushiPerShare !== "0" &&
      //   pairs.find((pair) => pair?.id === pool.pair)
      // );
    })
    .map((pool) => {
      // get name and icon from constants file
      const details = FARM_DETAILS.find((farm) => String(farm.pid) === String(pool.id));
      // get pair details
      const pair = pairs.find((pair) => pair.id === pool.pair);
      //console.log("details:", details, FARM_DETAILS, pool.id, pool, pair);

      const liquidityPosition = liquidityPositions.find((liquidityPosition) => liquidityPosition.pair.id === pair.id);
      const blocksPerHour = 3600 / averageBlockTime;
      //const rewardPerBlock = 100 - 100 * (pool45.allocPoint / pool45.owner.totalAllocPoint);
      // const roiPerBlock =
      //   (Number(token.derivedETH) *
      //     rewardPerBlock *
      //     3 *
      //     (Number(pool.allocPoint) / Number(pool.owner.totalAllocPoint))) /
      //   (Number(pair.reserveETH) * (balance / Number(pair.totalSupply)));

      const balance = Number(pool.balance / 1e18) > 0 ? Number(pool.balance / 1e18) : 0.1;
      const totalSupply = pair.totalSupply > 0 ? pair.totalSupply : 0.1;
      const reserveUSD = pair.reserveUSD > 0 ? pair.reserveUSD : 0.1;

      const balanceUSD = (balance / Number(totalSupply)) * Number(reserveUSD);

      const rewardPerBlock = ((pool.allocPoint / pool.owner.totalAllocPoint) * pool.owner.sushiPerBlock) / 1e18;

      const roiPerBlock = (rewardPerBlock * 3 * sushiPrice) / balanceUSD;

      const roiPerHour = roiPerBlock * blocksPerHour;
      const roiPerDay = roiPerHour * 24;
      const roiPerMonth = roiPerDay * 30;
      const roiPerYear = roiPerMonth * 12;

      return {
        ...pool,
        name: details?.name,
        icon: details?.icon,
        symbol: details?.symbol,
        liquidityPair: pair,
        roiPerBlock,
        roiPerHour,
        roiPerDay,
        roiPerMonth,
        roiPerYear,
        rewardPerThousand: 1 * roiPerDay * (1000 / sushiPrice),
        tvl: liquidityPosition?.liquidityTokenBalance
          ? (pair.reserveUSD / pair.totalSupply) * liquidityPosition.liquidityTokenBalance
          : 0.1,
      };
    });

  //console.log("return:", farms);
  return farms;
}