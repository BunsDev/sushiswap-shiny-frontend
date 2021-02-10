import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Linker } from "../Linker";
import { useTokens } from "../../shared/contexts/GlobalData";
//import { useAllTokenData } from "../../services/vision/contexts/TokenData";
//import { useAllPairData } from "../../services/vision/contexts/PairData";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { OVERVIEW_TOKEN_BLACKLIST } from "../../services/vision/constants";
import { formattedNum, formattedPercent } from "../../services/vision/utils";

dayjs.extend(utc);

const SORT_FIELD = {
  LIQ: "totalLiquidityUSD",
  VOL: "oneDayVolumeUSD",
  SYMBOL: "symbol",
  NAME: "name",
  PRICE: "priceUSD",
  CHANGE: "priceChangeUSD",
};

const TopMovers = () => {
  //const allTokens = useAllTokenData();
  const tokens = useTokens();

  //const pairs = useAllPairData();
  //console.log("SUSHI_:", pairs["0x795065dcc9f64b5614c407a6efdc400da6221fb0"]);

  return <>{/* <TokenList tokens={allTokens} key={"topMovers"} /> */}</>;
};

// @TODO rework into virtualized list
function TokenList({ tokens, itemMax = 10 }) {
  // sorting
  const sortDirection = true;
  const sortedColumn = SORT_FIELD.CHANGE;

  const formattedTokens = useMemo(() => {
    return (
      tokens &&
      Object.keys(tokens)
        .filter((key) => {
          return !OVERVIEW_TOKEN_BLACKLIST.includes(key);
        })
        .map((key) => tokens[key])
    );
  }, [tokens]);

  const filteredList = useMemo(() => {
    return (
      formattedTokens &&
      formattedTokens
        .sort((a, b) => {
          if (sortedColumn === SORT_FIELD.SYMBOL || sortedColumn === SORT_FIELD.NAME) {
            return a[sortedColumn] > b[sortedColumn] ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1;
          }
          return parseFloat(a[sortedColumn]) > parseFloat(b[sortedColumn])
            ? (sortDirection ? -1 : 1) * 1
            : (sortDirection ? -1 : 1) * -1;
        })
        .slice(0, 10) // return top 10
    );
  }, [formattedTokens, sortDirection, sortedColumn]);

  return (
    <>
      <div className="pt-6 border-b border-gray-100">
        <div className="mx-4 flex justify-between">
          <div>
            <h3 className="text-xl leading-6 font-medium text-gray-900">Top Movers</h3>
            <p className="mt-1 text-sm font-medium text-gray-400">Tokens making moves today</p>
          </div>
          <Linker to="/tokens">View all tokens</Linker>
          {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
        </div>
        <div className="pl-4 pt-4 pb-8 flex overflow-x-scroll">
          {filteredList.map((item) => {
            return (
              <>
                <TokenCard
                  key={"TopMovers-" + item.id}
                  id={item.id}
                  symbol={item.symbol}
                  name={item.name}
                  priceUSD={formattedNum(item.priceUSD, true)}
                  priceChangeUSD={formattedPercent(item.priceChangeUSD)}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

const TokenCard = ({ id, symbol, name, priceUSD, priceChangeUSD }) => {
  return (
    <Link to={"/token/" + id}>
      <div className="w-40 h-44 mr-4 flex flex-col justify-between border border-gray-300 hover:bg-gray-100 rounded-md p-4">
        <div>
          <div className="text-sm font-semibold uppercase overflow-hidden">{symbol}</div>
          <div className="text-sm overflow-hidden">{name}</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-green-finance">{priceUSD}</div>
          <div className="text-sm text-green-finance">{priceChangeUSD}</div>
        </div>
      </div>
    </Link>
  );
};

export default TopMovers;