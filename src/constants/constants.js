import BigNumber from "bignumber.js/bignumber";

export const SUBTRACT_GAS_LIMIT = 100000;

const ONE_MINUTE_IN_SECONDS = new BigNumber(60);
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60);
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24);
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365);

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber("4294967295"), // 2**32-1
  ONES_127: new BigNumber("340282366920938463463374607431768211455"), // 2**128-1
  ONES_255: new BigNumber("115792089237316195423570985008687907853269984665640564039457584007913129639935"), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber("1e18"),
};

export const addressMap = {
  uniswapFactory: "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
  uniswapFactoryV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  YFI: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
  YCRV: "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8",
  UNIAmpl: "0xc5be99a02c6857f9eac67bbce58df5572498f40c",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  UNIRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
  SNX: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
  COMP: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
  LEND: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
  SUSHIYCRV: "0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726",
};

export const contractAddresses = {
  sushi: {
    1: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
  },
  masterChef: {
    1: "0xc2edad668740f1aa35e4d8f227fb8e17dca888cd",
  },
  weth: {
    1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  xSushi: {
    1: "0x8798249c2e607446efb7ad49ec89dd1865ff4272",
  },
};

/*
SLP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

// Week 1:
// xSUSHI/WETH: 19
// cDAI/DAI: 20
// WBTC/WETH: 21
// CREAM/WETH: 22
// WETH/MEME: 23
// wNXM/WETH: 24
// yUSD/WETH: 25
// WBTC/yUSD: 26
// CRO/WETH: 27
// WBTC/renBTC: 28

// Week 2:
// CREAM/WETH: 22
// wNXM/WETH: 24
// yUSD/WETH: 25
// OMG/WETH: 36
// PICKLE/WETH: 32
// CORE/WETH: 33
// MKR/WETH: 34
// wBTC/tBTC: 35
// Hegic/WETH: 31
// AAVE/WETH: 37

// week1: ["19", "20", "21", "22", "23", "24", "25", "26", "27", "28"],
// week2: ["22", "24", "25", "31", "32", "33", "34", "35", "36", "37"],
// week3: [ 22, 24, 32, 33, 38, 39, 40, 41, 42, 43]
// week4: [ 21, 24, 32, 46, 47, 48, 49, 50, 51, 52],
// week5: [ 21, 24, 53, 54, 55, 56, 57, 58, 59, 60],

// TODO find alternative, since CORS issue.
// const ethereum = await axios.get("https://etherchain.org/api/basic_stats");
// console.log("ETH:", ethereum);
export const ethBlockTime = 13.314272573969033;
export const sushiRewardsPerBlock = 60;
export const votingURL = "https://forum.sushiswapclassic.org/t/pool-rotation-menu-of-the-week-week-46/1154";

const menuSetup = {
  current: [
    33,
    36,
    31,
    22,
    53,
    63,
    64,
    65,
    69,
    83,
    85,
    96,
    35,
    42,
    66,
    67,
    70,
    //71,
    99,
    73,
    75,
    81,
    82,
    86,
    92,
    95,
    98,
    48,
    59,
    68,
    72,
    74,
    76,
    77,
    78,
    79,
    80,
    84,
    87,
    88,
    89,
    90,
    91,
    93,
    94,
    97,
    100,
  ],
  upcoming: [],
  previous: [
    10,
    15,
    19,
    20,
    //22,
    23,
    24,
    25,
    26,
    27,
    28,
    //31,
    32,
    //33,
    34,
    //35,
    //36,
    38,
    39,
    40,
    41,
    //42,
    43,
    46,
    47,
    //48,
    49,
    50,
    51,
    52,
    //53,
    54,
    55,
    56,
    57,
    //58,
    //59,
    60,
    71,
  ],
  main: [12, 58, 25, 1, 2, 21, 0, 11, 3, 8, 37, 4, 6, 7, 9, 18, 44, 13, 17, 101],
};

export const menus = {
  current: menuSetup.current,
  upcoming: menuSetup.upcoming,
  previous: menuSetup.previous,
  main: menuSetup.main,
  active: menuSetup.main.concat(menuSetup.current).reduce(function(a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []),
};

// For tokens that suffer a protocol exploit
export const TOKEN_WARNINGS = [
  "0x5d8d9f5b96f4438195be9b99eee6118ed4304286", // COVER
];

export const supportedPools = [
  // Permament Menu
  {
    pid: 12,
    lpAddresses: {
      "1": "0x795065dCc9f64b5614C407a6EFDC400DA6221FB0",
    },
    tokenAddresses: {
      "1": "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    },
    name: "Sushi Party!",
    symbol: "SUSHI-ETH SLP",
    tokenSymbol: "SUSHI",
    icon: "🍣",
    uniswapPair: "SUSHI/ETH",
    lpToken: "0x795065dCc9f64b5614C407a6EFDC400DA6221FB0",
    allocPoint: "4800",
  },
  {
    pid: 58,
    lpAddresses: {
      1: "0xaf988afF99d3d0cb870812C325C588D8D8CB7De8",
    },
    tokenAddresses: {
      1: "0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44",
    },
    name: "Bee KP3R",
    symbol: "KP3R-ETH SLP",
    tokenSymbol: "KP3R",
    icon: "🐝",
    uniswapPair: "KP3R/ETH",
    lpToken: "0xaf988afF99d3d0cb870812C325C588D8D8CB7De8",
    allocPoint: "200",
  },
  {
    pid: 21,
    lpAddresses: {
      "1": "0xceff51756c56ceffca006cd410b03ffc46dd3a58",
    },
    tokenAddresses: {
      "1": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    },
    name: "BitCorn",
    symbol: "WBTC-ETH SLP",
    tokenSymbol: "WBTC",
    icon: "‍🌽",
    uniswapPair: "WBTC/ETH",
    lpToken: "0xceff51756c56ceffca006cd410b03ffc46dd3a58",
    allocPoint: "3349",
  },
  {
    pid: 0,
    lpAddresses: {
      "1": "0x06da0fd433C1A5d7a4faa01111c044910A184553",
    },
    tokenAddresses: {
      "1": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    name: "Tether Turtle",
    symbol: "USDT-ETH SLP",
    tokenSymbol: "USDT",
    icon: "🐢",
    uniswapPair: "USDT/ETH",
    lpToken: "0x06da0fd433C1A5d7a4faa01111c044910A184553",
    allocPoint: "2451",
  },
  {
    pid: 1,
    lpAddresses: {
      "1": "0x397FF1542f962076d0BFE58eA045FfA2d347ACa0",
    },
    tokenAddresses: {
      "1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
    name: "Circle Snail",
    symbol: "USDC-ETH SLP",
    tokenSymbol: "USDC",
    icon: "🐌",
    uniswapPair: "USDC/ETH",
    lpToken: "0x397FF1542f962076d0BFE58eA045FfA2d347ACa0",
    allocPoint: "2875",
  },
  {
    pid: 2,
    lpAddresses: {
      "1": "0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f",
    },
    tokenAddresses: {
      "1": "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
    name: "Donald DAI",
    symbol: "DAI-ETH SLP",
    tokenSymbol: "DAI",
    icon: "🦆",
    uniswapPair: "DAI/ETH",
    lpToken: "0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f",
    allocPoint: "3231",
  },
  {
    pid: 3,
    lpAddresses: {
      "1": "0xF1F85b2C54a2bD284B1cf4141D64fD171Bd85539",
    },
    tokenAddresses: {
      "1": "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
    },
    name: "Spartan Dollar",
    symbol: "SUSD-ETH SLP",
    tokenSymbol: "SUSD",
    icon: "🦍",
    uniswapPair: "sUSD/ETH",
    lpToken: "0xF1F85b2C54a2bD284B1cf4141D64fD171Bd85539",
    allocPoint: "298",
  },
  {
    pid: 4,
    lpAddresses: {
      "1": "0x31503dcb60119a812fee820bb7042752019f2355",
    },
    tokenAddresses: {
      "1": "0xc00e94cb662c3520282e6f5717214004a7f26888",
    },
    name: "Comp Truffle",
    symbol: "COMP-ETH SLP",
    tokenSymbol: "COMP",
    icon: "🍄",
    uniswapPair: "COMP/ETH",
    lpToken: "0x31503dcb60119a812fee820bb7042752019f2355",
    allocPoint: "149",
  },
  {
    pid: 37,
    lpAddresses: {
      1: "0xD75EA151a61d06868E31F8988D28DFE5E9df57B4",
    },
    tokenAddresses: {
      1: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    },
    name: "Aave Boar",
    symbol: "AAVE-ETH SLP",
    tokenSymbol: "AAVE",
    icon: "🐗",
    uniswapPair: "AAVE/ETH",
    lpToken: "0xD75EA151a61d06868E31F8988D28DFE5E9df57B4",
    allocPoint: "974",
  },
  {
    pid: 5,
    lpAddresses: {
      "1": "0x5E63360E891BD60C69445970256C260b0A6A54c6",
    },
    tokenAddresses: {
      "1": "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
    },
    name: "LEND (Old)",
    symbol: "LEND-ETH SLP",
    tokenSymbol: "LEND",
    icon: "🐗",
    uniswapPair: "LEND/ETH",
    lpToken: "0x5E63360E891BD60C69445970256C260b0A6A54c6",
    allocPoint: "0",
  },
  {
    pid: 6,
    lpAddresses: {
      "1": "0xA1d7b2d891e3A1f9ef4bBC5be20630C2FEB1c470",
    },
    tokenAddresses: {
      "1": "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
    },
    name: "Synth Snake",
    symbol: "SNX-ETH SLP",
    tokenSymbol: "SNX",
    icon: "🐍",
    uniswapPair: "SNX/ETH",
    lpToken: "0xA1d7b2d891e3A1f9ef4bBC5be20630C2FEB1c470",
    allocPoint: "443",
  },
  {
    pid: 7,
    lpAddresses: {
      "1": "0x001b6450083e531a5a7bf310bd2c1af4247e23d4",
    },
    tokenAddresses: {
      "1": "0x04fa0d235c4abf4bcf4787af4cf447de572ef828",
    },
    name: "Umami Squid",
    symbol: "UMA-ETH SLP",
    tokenSymbol: "UMA",
    icon: "🦑",
    uniswapPair: "UMA/ETH",
    lpToken: "0x001b6450083e531a5a7bf310bd2c1af4247e23d4",
    allocPoint: "219",
  },
  {
    pid: 8,
    lpAddresses: {
      "1": "0xC40D16476380e4037e6b1A2594cAF6a6cc8Da967",
    },
    tokenAddresses: {
      "1": "0x514910771af9ca656af840dff83e8264ecf986ca",
    },
    name: "Toadie Marine",
    symbol: "LINK-ETH SLP",
    tokenSymbol: "LINK",
    icon: "🐸",
    uniswapPair: "LINK/ETH",
    lpToken: "0xC40D16476380e4037e6b1A2594cAF6a6cc8Da967",
    allocPoint: "763",
  },
  {
    pid: 9,
    lpAddresses: {
      "1": "0xA75F7c2F025f470355515482BdE9EFA8153536A8",
    },
    tokenAddresses: {
      "1": "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55",
    },
    name: "Band-osaurus",
    symbol: "BAND-ETH SLP",
    tokenSymbol: "BAND",
    icon: "🦖",
    uniswapPair: "BAND/ETH",
    lpToken: "0xA75F7c2F025f470355515482BdE9EFA8153536A8",
    allocPoint: "239",
  },
  {
    pid: 10,
    lpAddresses: {
      "1": "0xCb2286d9471cc185281c4f763d34A962ED212962",
    },
    tokenAddresses: {
      "1": "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
    },
    name: "Ample Chicks",
    symbol: "AMPL-ETH SLP",
    tokenSymbol: "AMPL",
    icon: "🐥",
    uniswapPair: "AMPL/ETH",
    lpToken: "0xCb2286d9471cc185281c4f763d34A962ED212962",
    allocPoint: "0",
  },
  {
    pid: 11,
    lpAddresses: {
      "1": "0x088ee5007C98a9677165D78dD2109AE4a3D04d0C",
    },
    tokenAddresses: {
      "1": "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
    },
    name: "YFI Whale",
    symbol: "YFI-ETH SLP",
    tokenSymbol: "YFI",
    icon: "🐋",
    uniswapPair: "YFI/ETH",
    lpToken: "0x088ee5007C98a9677165D78dD2109AE4a3D04d0C",
    allocPoint: "2300",
  },
  {
    pid: 13,
    lpAddresses: {
      "1": "0x611cde65dea90918c0078ac0400a72b0d25b9bb1",
    },
    tokenAddresses: {
      "1": "0x408e41876cccdc0f92210600ef50372656052a38",
    },
    name: "REN Rhino",
    symbol: "REN-ETH SLP",
    tokenSymbol: "REN",
    icon: "🦏",
    uniswapPair: "REN/ETH",
    lpToken: "0x611cde65dea90918c0078ac0400a72b0d25b9bb1",
    allocPoint: "100",
  },
  {
    pid: 14,
    lpAddresses: {
      "1": "0xaad22f5543fcdaa694b68f94be177b561836ae57",
    },
    tokenAddresses: {
      "1": "0x68A118Ef45063051Eac49c7e647CE5Ace48a68a5",
    },
    name: "BASED Bull",
    symbol: "BASED-sUSD SLP",
    tokenSymbol: "BASED",
    icon: "🐂",
    uniswapPair: "BASED/sUSD",
    lpToken: "0xaad22f5543fcdaa694b68f94be177b561836ae57",
    allocPoint: "0",
  },
  {
    pid: 15,
    lpAddresses: {
      "1": "0x117d4288b3635021a3d612fe05a3cbf5c717fef2",
    },
    tokenAddresses: {
      "1": "0x476c5E26a75bd202a9683ffD34359C0CC15be0fF",
    },
    name: "SRM Shark",
    symbol: "SRM-ETH SLP",
    tokenSymbol: "SRM",
    icon: "🦈",
    uniswapPair: "SRM/ETH",
    lpToken: "0x117d4288b3635021a3d612fe05a3cbf5c717fef2",
    allocPoint: "0",
  },
  {
    pid: 44,
    lpAddresses: {
      1: "0x0f82e57804d0b1f6fab2370a43dcfad3c7cb239c",
    },
    tokenAddresses: {
      1: "0x0AaCfbeC6a24756c20D41914F2caba817C0d8521",
    },
    name: "YAM",
    symbol: "YAM-ETH SLP",
    tokenSymbol: "YAM",
    icon: "🍠",
    uniswapPair: "YAM/ETH",
    lpToken: "0x0f82e57804d0b1f6fab2370a43dcfad3c7cb239c",
    allocPoint: "134",
  },
  {
    pid: 16,
    lpAddresses: {
      "1": "0x95b54c8da12bb23f7a5f6e26c38d04acc6f81820",
    },
    tokenAddresses: {
      "1": "0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a",
    },
    name: "YAMv2 (Old)",
    symbol: "YAMv2-ETH SLP",
    tokenSymbol: "YAMv2",
    icon: "🍠",
    uniswapPair: "YAMv2/ETH",
    lpToken: "0x95b54c8da12bb23f7a5f6e26c38d04acc6f81820",
    allocPoint: "0",
  },
  {
    pid: 17,
    lpAddresses: {
      "1": "0x58Dc5a51fE44589BEb22E8CE67720B5BC5378009",
    },
    tokenAddresses: {
      "1": "0xD533a949740bb3306d119CC777fa900bA034cd52",
    },
    name: "CRV Crocodile",
    symbol: "CRV-ETH SLP",
    tokenSymbol: "CRV",
    icon: "🐊",
    uniswapPair: "CRV/ETH",
    lpToken: "0x58Dc5a51fE44589BEb22E8CE67720B5BC5378009",
    allocPoint: "100",
  },
  {
    pid: 18,
    lpAddresses: {
      "1": "0xdafd66636e2561b0284edde37e42d192f2844d40",
    },
    tokenAddresses: {
      "1": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    },
    name: "UNI Unicorn",
    symbol: "UNI-ETH SLP",
    tokenSymbol: "UNI",
    icon: "🦄",
    uniswapPair: "UNI/ETH",
    lpToken: "0xdafd66636e2561b0284edde37e42d192f2844d40",
    allocPoint: "49",
  },
  {
    pid: 25,
    lpAddresses: {
      1: "0x382c4a5147Fd4090F7BE3A9Ff398F95638F5D39E",
    },
    tokenAddresses: {
      1: "0x5dbcf33d8c2e976c6b560249878e6f1491bca25c",
    },
    name: "Yearn Synergy",
    symbol: "yUSD-ETH",
    tokenSymbol: "yUSD",
    icon: "🌀",
    uniswapPair: "yUSD/ETH",
    lpToken: "0x382c4a5147Fd4090F7BE3A9Ff398F95638F5D39E",
    allocPoint: "200",
  },
  {
    pid: 101,
    lpAddresses: {
      1: "0x66ae32178640813f3c32a9929520bfe4fef5d167",
    },
    tokenAddresses: {
      1: "0x4688a8b1f292fdab17e9a90c8bc379dc1dbd8713",
    },
    name: "COVER Shield",
    symbol: "COVER-ETH SLP",
    tokenSymbol: "COVER",
    icon: "🛡️",
    uniswapPair: "COVER/ETH",
    lpToken: "0x66ae32178640813f3c32a9929520bfe4fef5d167",
    allocPoint: "100",
  },
  // Onsen Mids
  {
    pid: 33,
    lpAddresses: {
      1: "0xBa13afEcda9beB75De5c56BbAF696b880a5A50dD",
    },
    tokenAddresses: {
      1: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    },
    name: "Onsen Mid",
    symbol: "MKR-ETH SLP",
    tokenSymbol: "MKR",
    icon: "♨️",
    uniswapPair: "MKR/ETH",
    lpToken: "0xBa13afEcda9beB75De5c56BbAF696b880a5A50dD",
    allocPoint: "100",
  },
  {
    pid: 36,
    lpAddresses: {
      1: "0x742c15d71eA7444964BC39b0eD729B3729ADc361",
    },
    tokenAddresses: {
      1: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
    },
    name: "Onsen Mid",
    symbol: "OMG-ETH SLP",
    tokenSymbol: "OMG",
    icon: "♨️",
    uniswapPair: "OMG/ETH",
    lpToken: "0x742c15d71eA7444964BC39b0eD729B3729ADc361",
    allocPoint: "100",
  },
  {
    pid: 31,
    lpAddresses: {
      1: "0x6463Bd6026A2E7bFab5851b62969A92f7cca0eB6",
    },
    tokenAddresses: {
      1: "0x584bC13c7D411c00c01A62e8019472dE68768430",
    },
    name: "Onsen Mid",
    symbol: "HEGIC-ETH SLP",
    tokenSymbol: "HEGIC",
    icon: "♨️",
    uniswapPair: "HEGIC/ETH",
    lpToken: "0x6463Bd6026A2E7bFab5851b62969A92f7cca0eB6",
    allocPoint: "100",
  },
  {
    pid: 22,
    lpAddresses: {
      1: "0xf169CeA51EB51774cF107c88309717ddA20be167",
    },
    tokenAddresses: {
      1: "0x2ba592F78dB6436527729929AAf6c908497cB200",
    },
    name: "Onsen Mid",
    symbol: "CREAM-ETH SLP",
    tokenSymbol: "CREAM",
    icon: "♨️",
    uniswapPair: "CREAM/ETH",
    lpToken: "0xf169CeA51EB51774cF107c88309717ddA20be167",
    allocPoint: "100",
  },
  {
    pid: 53,
    lpAddresses: {
      1: "0x364248b2f1f57C5402d244b2D469A35B4C0e9dAB",
    },
    tokenAddresses: {
      1: "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7",
    },
    name: "Onsen Low",
    symbol: "AKRO-ETH SLP",
    tokenSymbol: "AKRO",
    icon: "♨️",
    uniswapPair: "AKRO/ETH",
    lpToken: "0x364248b2f1f57C5402d244b2D469A35B4C0e9dAB",
    allocPoint: "20",
  },
  {
    pid: 63,
    lpAddresses: {
      1: "0xdff71165a646be71fcfbaa6206342faa503aed5d",
    },
    tokenAddresses: {
      1: "0x36F3FD68E7325a35EB768F1AedaAe9EA0689d723",
    },
    name: "Onsen Mid",
    symbol: "ESD-ETH SLP",
    tokenSymbol: "ESD",
    icon: "♨️",
    uniswapPair: "ESD/ETH",
    lpToken: "0xdff71165a646be71fcfbaa6206342faa503aed5d",
    allocPoint: "100",
  },
  {
    pid: 100,
    lpAddresses: {
      1: "0x201e6a9e75df132a8598720433af35fe8d73e94d",
    },
    tokenAddresses: {
      1: "0xa117000000f279d81a1d3cc75430faa017fa5a2e",
    },
    name: "Onsen Mid",
    symbol: "ANT-ETH SLP",
    tokenSymbol: "ANT",
    icon: "♨️",
    uniswapPair: "ANT/ETH",
    lpToken: "0x201e6a9e75df132a8598720433af35fe8d73e94d",
    allocPoint: "100",
  },
  // {
  //   pid: 64,
  //   lpAddresses: {
  //     1: "0x378b4c5f2a8a0796a8d4c798ef737cf00ae8e667",
  //   },
  //   tokenAddresses: {
  //     1: "0x960b236A07cf122663c4303350609A66A7B288C0",
  //   },
  //   name: "Onsen Mid",
  //   symbol: "ANT-ETH SLP",
  //   tokenSymbol: "ANT",
  //   icon: "♨️",
  //   uniswapPair: "ANT/ETH",
  //   lpToken: "0x378b4c5f2a8a0796a8d4c798ef737cf00ae8e667",
  //   allocPoint: "100",
  // },
  {
    pid: 65,
    lpAddresses: {
      1: "0xef4f1d5007b4ff88c1a56261fec00264af6001fb",
    },
    tokenAddresses: {
      1: "0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d",
    },
    name: "Onsen Mid",
    symbol: "PNK-ETH SLP",
    tokenSymbol: "PNK",
    icon: "♨️",
    uniswapPair: "PNK/ETH",
    lpToken: "0xef4f1d5007b4ff88c1a56261fec00264af6001fb",
    allocPoint: "100",
  },
  {
    pid: 69,
    lpAddresses: {
      1: "0xfb3cd0b8a5371fe93ef92e3988d30df7931e2820",
    },
    tokenAddresses: {
      1: "0xe28b3b32b6c345a34ff64674606124dd5aceca30",
    },
    name: "Onsen Mid",
    symbol: "INJ-ETH SLP",
    tokenSymbol: "INJ",
    icon: "♨️",
    uniswapPair: "INJ/ETH",
    lpToken: "0xfb3cd0b8a5371fe93ef92e3988d30df7931e2820",
    allocPoint: "100",
  },
  {
    pid: 83,
    lpAddresses: {
      1: "0x26d8151e631608570f3c28bec769c3afee0d73a3",
    },
    tokenAddresses: {
      1: "0xbd2f0cd039e0bfcf88901c98c0bfac5ab27566e3",
    },
    name: "Onsen Mid",
    symbol: "DSD-USDC SLP",
    tokenSymbol: "DSD",
    icon: "♨️",
    uniswapPair: "DSD/USDC",
    lpToken: "0x26d8151e631608570f3c28bec769c3afee0d73a3",
    allocPoint: "100",
  },
  {
    pid: 85,
    lpAddresses: {
      1: "0x8b00ee8606cc70c2dce68dea0cefe632cca0fb7b",
    },
    tokenAddresses: {
      1: "0xa47c8bf37f92abed4a126bda807a7b7498661acd",
    },
    name: "Onsen Mid",
    symbol: "UST-ETH SLP",
    tokenSymbol: "UST",
    icon: "♨️",
    uniswapPair: "UST/ETH",
    lpToken: "0x8b00ee8606cc70c2dce68dea0cefe632cca0fb7b",
    allocPoint: "100",
  },
  {
    pid: 96,
    lpAddresses: {
      1: "0xf55c33d94150d93c2cfb833bcca30be388b14964",
    },
    tokenAddresses: {
      1: "0xa1faa113cbe53436df28ff0aee54275c13b40975",
    },
    name: "Onsen Mid",
    symbol: "ALPHA-ETH SLP",
    tokenSymbol: "ALPHA",
    icon: "♨️",
    uniswapPair: "ALPHA/ETH",
    lpToken: "0xf55c33d94150d93c2cfb833bcca30be388b14964",
    allocPoint: "100",
  },
  // Onsen Lows
  {
    pid: 35,
    lpAddresses: {
      1: "0x269Db91Fc3c7fCC275C2E6f22e5552504512811c",
    },
    tokenAddresses: {
      1: "0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5",
    },
    name: "Onsen Low",
    symbol: "PICKLE-ETH SLP",
    tokenSymbol: "PICKLE",
    icon: "♨️",
    uniswapPair: "PICKLE/ETH",
    lpToken: "0x269Db91Fc3c7fCC275C2E6f22e5552504512811c",
    allocPoint: "20",
  },
  {
    pid: 42,
    lpAddresses: {
      1: "0x34b13F8CD184F55d0Bd4Dd1fe6C07D46f245c7eD",
    },
    tokenAddresses: {
      1: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
    },
    name: "Onsen Low",
    symbol: "DPI-ETH SLP",
    tokenSymbol: "DPI",
    icon: "♨️",
    uniswapPair: "DPI/ETH",
    lpToken: "0x34b13F8CD184F55d0Bd4Dd1fe6C07D46f245c7eD",
    allocPoint: "20",
  },
  {
    pid: 66,
    lpAddresses: {
      1: "0x1c580cc549d03171b13b55074dc1658f60641c73",
    },
    tokenAddresses: {
      1: "0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1",
    },
    name: "Onsen Low",
    symbol: "CVP-ETH SLP",
    tokenSymbol: "CVP",
    icon: "♨️",
    uniswapPair: "CVP/ETH",
    lpToken: "0x1c580cc549d03171b13b55074dc1658f60641c73",
    allocPoint: "20",
  },
  {
    pid: 67,
    lpAddresses: {
      1: "0xf45d97f9d457661783146d63dd13da20ce9bf847",
    },
    tokenAddresses: {
      1: "0xb4bebd34f6daafd808f73de0d10235a92fbb6c3d",
    },
    name: "Onsen Low",
    symbol: "YETI-ETH SLP",
    tokenSymbol: "YETI",
    icon: "♨️",
    uniswapPair: "YETI/ETH",
    lpToken: "0xf45d97f9d457661783146d63dd13da20ce9bf847",
    allocPoint: "20",
  },
  {
    pid: 70,
    lpAddresses: {
      1: "0x44d34985826578e5ba24ec78c93be968549bb918",
    },
    tokenAddresses: {
      1: "0x3c9d6c1c73b31c837832c72e04d3152f051fc1a9",
    },
    name: "Onsen Low",
    symbol: "BOR-ETH SLP",
    tokenSymbol: "BOR",
    icon: "♨️",
    uniswapPair: "BOR/ETH",
    lpToken: "0x44d34985826578e5ba24ec78c93be968549bb918",
    allocPoint: "20",
  },
  {
    pid: 71,
    lpAddresses: {
      1: "0x23a9292830fc80db7f563edb28d2fe6fb47f8624",
    },
    tokenAddresses: {
      1: "0xb753428af26e81097e7fd17f40c88aaa3e04902c",
    },
    name: "Onsen Low",
    symbol: "SFI-ETH SLP",
    tokenSymbol: "SFI",
    icon: "♨️",
    uniswapPair: "SFI/ETH",
    lpToken: "0x23a9292830fc80db7f563edb28d2fe6fb47f8624",
    allocPoint: "0",
  },
  {
    pid: 99,
    lpAddresses: {
      1: "0xb1d38026062ac10feda072ca0e9b7e35f1f5795a",
    },
    tokenAddresses: {
      1: "0x5bc25f649fc4e26069ddf4cf4010f9f706c23831",
    },
    name: "Onsen Low",
    symbol: "DUSD-ETH SLP",
    tokenSymbol: "DUSD",
    icon: "♨️",
    uniswapPair: "DUSD/ETH",
    lpToken: "0xb1d38026062ac10feda072ca0e9b7e35f1f5795a",
    allocPoint: "20",
  },
  {
    pid: 73,
    lpAddresses: {
      1: "0x110492b31c59716ac47337e616804e3e3adc0b4a",
    },
    tokenAddresses: {
      1: "0x3472a5a71965499acd81997a54bba8d852c6e53d",
    },
    name: "Onsen Low",
    symbol: "BADGER-WBTC SLP",
    tokenSymbol: "BADGER",
    icon: "♨️",
    uniswapPair: "BADGER/WBTC",
    lpToken: "0x110492b31c59716ac47337e616804e3e3adc0b4a",
    allocPoint: "20",
  },
  {
    pid: 74,
    lpAddresses: {
      1: "0x9360b76f8f5f932ac33d46a3ce82ad6c52a713e5",
    },
    tokenAddresses: {
      1: "0xa8e7ad77c60ee6f30bac54e2e7c0617bd7b5a03e",
    },
    name: "Onsen Low",
    symbol: "zLOT-ETH SLP",
    tokenSymbol: "zLOT",
    icon: "♨️",
    uniswapPair: "zLOT/ETH",
    lpToken: "0x9360b76f8f5f932ac33d46a3ce82ad6c52a713e5",
    allocPoint: "20",
  },
  {
    pid: 75,
    lpAddresses: {
      1: "0xa73df646512c82550c2b3c0324c4eedee53b400c",
    },
    tokenAddresses: {
      1: "0x0954906da0bf32d5479e25f46056d22f08464cab",
    },
    name: "Onsen Low",
    symbol: "INDEX-ETH SLP",
    tokenSymbol: "INDEX",
    icon: "♨️",
    uniswapPair: "INDEX/ETH",
    lpToken: "0xa73df646512c82550c2b3c0324c4eedee53b400c",
    allocPoint: "20",
  },
  {
    pid: 81,
    lpAddresses: {
      1: "0x53e9fb796b2feb4b3184afdf601c2a2797548d88",
    },
    tokenAddresses: {
      1: "0x8064d9Ae6cDf087b1bcd5BDf3531bD5d8C537a68",
    },
    name: "Onsen Low",
    symbol: "oBTC-ETH SLP",
    tokenSymbol: "oBTC",
    icon: "♨️",
    uniswapPair: "oBTC/ETH",
    lpToken: "0x53e9fb796b2feb4b3184afdf601c2a2797548d88",
    allocPoint: "20",
  },
  {
    pid: 82,
    lpAddresses: {
      1: "0xe5f06db4f3473e7e35490f1f98017728496fe81e",
    },
    tokenAddresses: {
      1: "0x26cf82e4ae43d31ea51e72b663d26e26a75af729",
    },
    name: "Onsen Low",
    symbol: "mbBASED-ETH SLP",
    tokenSymbol: "mbBASED",
    icon: "♨️",
    uniswapPair: "mbBASED/ETH",
    lpToken: "0xe5f06db4f3473e7e35490f1f98017728496fe81e",
    allocPoint: "20",
  },
  {
    pid: 86,
    lpAddresses: {
      1: "0xaa500101c73065f755ba9b902d643705ef2523e3",
    },
    tokenAddresses: {
      1: "0xef9cd7882c067686691b6ff49e650b43afbbcc6b",
    },
    name: "Onsen Low",
    symbol: "FNX-ETH SLP",
    tokenSymbol: "FNX",
    icon: "♨️",
    uniswapPair: "FNX/ETH",
    lpToken: "0xaa500101c73065f755ba9b902d643705ef2523e3",
    allocPoint: "10",
  },
  {
    pid: 92,
    lpAddresses: {
      1: "0xb2c29e311916a346304f83aa44527092d5bd4f0f",
    },
    tokenAddresses: {
      1: "0x8888801af4d980682e47f1a9036e589479e835c5",
    },
    name: "Onsen Low",
    symbol: "MPH-ETH SLP",
    tokenSymbol: "MPH",
    icon: "♨️",
    uniswapPair: "MPH/ETH",
    lpToken: "0xb2c29e311916a346304f83aa44527092d5bd4f0f",
    allocPoint: "20",
  },
  {
    pid: 95,
    lpAddresses: {
      1: "0xfceaaf9792139bf714a694f868a215493461446d",
    },
    tokenAddresses: {
      1: "0x4c19596f5aaff459fa38b0f7ed92f11ae6543784",
    },
    name: "Onsen Low",
    symbol: "TRU-ETH SLP",
    tokenSymbol: "TRU",
    icon: "♨️",
    uniswapPair: "TRU/ETH",
    lpToken: "0xfceaaf9792139bf714a694f868a215493461446d",
    allocPoint: "20",
  },
  {
    pid: 98,
    lpAddresses: {
      1: "0x71817445d11f42506f2d7f54417c935be90ca731",
    },
    tokenAddresses: {
      1: "0xcbc1065255cbc3ab41a6868c22d1f1c573ab89fd",
    },
    name: "Onsen Low",
    symbol: "CRETH2-ETH SLP",
    tokenSymbol: "CRETH2",
    icon: "♨️",
    uniswapPair: "CRETH2/ETH",
    lpToken: "0x71817445d11f42506f2d7f54417c935be90ca731",
    allocPoint: "20",
  },
  // Onsen Gems
  {
    pid: 48,
    lpAddresses: {
      1: "0x97f34c8E5992EB985c5F740e7EE8c7e48a1de76a",
    },
    tokenAddresses: {
      1: "0xad32A8e6220741182940c5aBF610bDE99E737b2D",
    },
    name: "Onsen Gem",
    symbol: "DOUGH-ETH SLP",
    tokenSymbol: "DOUGH",
    icon: "♨️",
    uniswapPair: "DOUGH/ETH",
    lpToken: "0x97f34c8E5992EB985c5F740e7EE8c7e48a1de76a",
    allocPoint: "10",
  },
  {
    pid: 59,
    lpAddresses: {
      1: "0xC5Fa164247d2F8D68804139457146eFBde8370F6",
    },
    tokenAddresses: {
      1: "0xCa3FE04C7Ee111F0bbb02C328c699226aCf9Fd33",
    },
    name: "Onsen Gem",
    symbol: "SEEN-ETH SLP",
    tokenSymbol: "SEEN",
    icon: "♨️",
    uniswapPair: "SEEN/ETH",
    lpToken: "0xC5Fa164247d2F8D68804139457146eFBde8370F6",
    allocPoint: "10",
  },
  {
    pid: 68,
    lpAddresses: {
      1: "0x4441eb3076f828d5176f4fe74d7c775542dae106",
    },
    tokenAddresses: {
      1: "0x1f3f9d3068568f8040775be2e8c03c103c61f3af",
    },
    name: "Onsen Gem",
    symbol: "ARCH-ETH SLP",
    tokenSymbol: "ARCH",
    icon: "♨️",
    uniswapPair: "ARCH/ETH",
    lpToken: "0x4441eb3076f828d5176f4fe74d7c775542dae106",
    allocPoint: "10",
  },
  {
    pid: 72,
    lpAddresses: {
      1: "0xb12aa722a3a4566645f079b6f10c89a3205b6c2c",
    },
    tokenAddresses: {
      1: "0x20c36f062a31865bed8a5b1e512d9a1a20aa333a",
    },
    name: "Onsen Gem",
    symbol: "DFD-ETH SLP",
    tokenSymbol: "DFD",
    icon: "♨️",
    uniswapPair: "DFD/ETH",
    lpToken: "0xb12aa722a3a4566645f079b6f10c89a3205b6c2c",
    allocPoint: "10",
  },
  {
    pid: 76,
    lpAddresses: {
      1: "0xadeaa96a81ebba4e3a5525a008ee107385d588c3",
    },
    tokenAddresses: {
      1: "0x87edffde3e14c7a66c9b9724747a1c5696b742e6",
    },
    name: "Onsen Gem",
    symbol: "SWAG-ETH SLP",
    tokenSymbol: "SWAG",
    icon: "♨️",
    uniswapPair: "SWAG/ETH",
    lpToken: "0xadeaa96a81ebba4e3a5525a008ee107385d588c3",
    allocPoint: "10",
  },
  {
    pid: 77,
    lpAddresses: {
      1: "0xf1360c4ae1cead17b588ec1111983d2791b760d3",
    },
    tokenAddresses: {
      1: "0x8a9c67fee641579deba04928c4bc45f66e26343a",
    },
    name: "Onsen Gem",
    symbol: "JRT-ETH SLP",
    tokenSymbol: "JRT",
    icon: "♨️",
    uniswapPair: "JRT/ETH",
    lpToken: "0xf1360c4ae1cead17b588ec1111983d2791b760d3",
    allocPoint: "10",
  },
  {
    pid: 78,
    lpAddresses: {
      1: "0x0040a2cebc65894bc2cfb57565f9acfa33fab137",
    },
    tokenAddresses: {
      1: "0xdbdd6f355a37b94e6c7d32fef548e98a280b8df5",
    },
    name: "Onsen Gem",
    symbol: "UWL-ETH",
    tokenSymbol: "UWL",
    icon: "♨️",
    uniswapPair: "UWL/ETH",
    lpToken: "0x0040a2cebc65894bc2cfb57565f9acfa33fab137",
    allocPoint: "10",
  },
  {
    pid: 79,
    lpAddresses: {
      1: "0x9cd028b1287803250b1e226f0180eb725428d069",
    },
    tokenAddresses: {
      1: "0x903bef1736cddf2a537176cf3c64579c3867a881",
    },
    name: "Onsen Gem",
    symbol: "ICHI-ETH SLP",
    tokenSymbol: "ICHI",
    icon: "♨️",
    uniswapPair: "ICHI/ETH",
    lpToken: "0x9cd028b1287803250b1e226f0180eb725428d069",
    allocPoint: "10",
  },
  {
    pid: 80,
    lpAddresses: {
      1: "0x67e475577b4036ee4f0f12fa2d538ed18cef48e3",
    },
    tokenAddresses: {
      1: "0x9d47894f8becb68b9cf3428d256311affe8b068b",
    },
    name: "Onsen Gem",
    symbol: "$ROPE-ETH SLP",
    tokenSymbol: "$ROPE",
    icon: "♨️",
    uniswapPair: "$ROPE/ETH",
    lpToken: "0x67e475577b4036ee4f0f12fa2d538ed18cef48e3",
    allocPoint: "10",
  },
  {
    pid: 84,
    lpAddresses: {
      1: "0xab3f8e0214d862bf7965d3cec7431d7c1a85cb34",
    },
    tokenAddresses: {
      1: "0x44ea84a85616f8e9cd719fc843de31d852ad7240",
    },
    name: "Onsen Gem",
    symbol: "nTRUMP-DAI SLP",
    tokenSymbol: "nTRUMP",
    icon: "♨️",
    uniswapPair: "nTRUMP/DAI",
    lpToken: "0xab3f8e0214d862bf7965d3cec7431d7c1a85cb34",
    allocPoint: "10",
  },
  {
    pid: 87,
    lpAddresses: {
      1: "0xeb1b57d4f7d4557b032b66c422bc94a8e4af859e",
    },
    tokenAddresses: {
      1: "0xe4f726adc8e89c6a6017f01eada77865db22da14",
    },
    name: "Onsen Gem",
    symbol: "BCP-ETH SLP",
    tokenSymbol: "BCP",
    icon: "♨️",
    uniswapPair: "BCP/ETH",
    lpToken: "0xeb1b57d4f7d4557b032b66c422bc94a8e4af859e",
    allocPoint: "10",
  },
  {
    pid: 88,
    lpAddresses: {
      1: "0x5f30aac9a472f6c33d5284f9d340c0d57ef33697",
    },
    tokenAddresses: {
      1: "0x17525e4f4af59fbc29551bc4ece6ab60ed49ce31",
    },
    name: "Onsen Gem",
    symbol: "YPIE-ETH SLP",
    tokenSymbol: "YPIE",
    icon: "♨️",
    uniswapPair: "YPIE/ETH",
    lpToken: "0x5f30aac9a472f6c33d5284f9d340c0d57ef33697",
    allocPoint: "10",
  },
  {
    pid: 89,
    lpAddresses: {
      1: "0x83e5e791f4ab29d1b0941bc4d00f3d6027d1dae5",
    },
    tokenAddresses: {
      1: "0x78f225869c08d478c34e5f645d07a87d3fe8eb78",
    },
    name: "Onsen Gem",
    symbol: "DEFI+L-ETH SLP",
    tokenSymbol: "DEFI+L",
    icon: "♨️",
    uniswapPair: "DEFI+L/ETH",
    lpToken: "0x83e5e791f4ab29d1b0941bc4d00f3d6027d1dae5",
    allocPoint: "10",
  },
  {
    pid: 90,
    lpAddresses: {
      1: "0xd8b8b575c943f3d63638c9563b464d204ed8b710",
    },
    tokenAddresses: {
      1: "0x07150e919b4de5fd6a63de1f9384828396f25fdc",
    },
    name: "Onsen Gem",
    symbol: "BASE-ETH SLP",
    tokenSymbol: "BASE",
    icon: "♨️",
    uniswapPair: "BASE/ETH",
    lpToken: "0xd8b8b575c943f3d63638c9563b464d204ed8b710",
    allocPoint: "10",
  },
  {
    pid: 91,
    lpAddresses: {
      1: "0xc2b0f2a7f736d3b908bdde8608177c8fc28c1690",
    },
    tokenAddresses: {
      1: "0x3a880652f47bfaa771908c07dd8673a787daed3a",
    },
    name: "Onsen Gem",
    symbol: "DDX-USDC SLP",
    tokenSymbol: "DDX",
    icon: "♨️",
    uniswapPair: "DDX/USDC",
    lpToken: "0xc2b0f2a7f736d3b908bdde8608177c8fc28c1690",
    allocPoint: "10",
  },
  {
    pid: 93,
    lpAddresses: {
      1: "0x98c2f9d752e044dc2e1f1743bf0b76a7096eceb2",
    },
    tokenAddresses: {
      1: "0xf8c3527cc04340b208c854e985240c02f7b7793f",
    },
    name: "Onsen Gem",
    symbol: "FRONT-USDT SLP",
    tokenSymbol: "FRONT",
    icon: "♨️",
    uniswapPair: "FRONT/USDT",
    lpToken: "0x98c2f9d752e044dc2e1f1743bf0b76a7096eceb2",
    allocPoint: "10",
  },
  {
    pid: 94,
    lpAddresses: {
      1: "0x8c2e6a4af15c94cf4a86cd3c067159f08571d780",
    },
    tokenAddresses: {
      1: "0xe4ae84448db5cfe1daf1e6fb172b469c161cb85f",
    },
    name: "Onsen Gem",
    symbol: "UOP-ETH SLP",
    tokenSymbol: "UOP",
    icon: "♨️",
    uniswapPair: "UOP/ETH",
    lpToken: "0x8c2e6a4af15c94cf4a86cd3c067159f08571d780",
    allocPoint: "10",
  },
  {
    pid: 97,
    lpAddresses: {
      1: "0xca658217ce94dfb2156a49a8fad0ff752cac39c2",
    },
    tokenAddresses: {
      1: "0x7ca4408137eb639570f8e647d9bd7b7e8717514a",
    },
    name: "Onsen Gem",
    symbol: "ALPA-ETH SLP",
    tokenSymbol: "ALPA",
    icon: "♨️",
    uniswapPair: "ALPA/ETH",
    lpToken: "0xca658217ce94dfb2156a49a8fad0ff752cac39c2",
    allocPoint: "0",
  },

  // Previous Menus of the Week
  {
    pid: 19,
    lpAddresses: {
      "1": "0x36e2FCCCc59e5747Ff63a03ea2e5C0c2C14911e7",
    },
    tokenAddresses: {
      "1": "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272",
    },
    name: "Chef's Menu",
    symbol: "xSUSHI-ETH SLP",
    tokenSymbol: "xSUSHI",
    icon: "👨🏻‍🍳",
    uniswapPair: "xSUSHI/ETH",
    lpToken: "0x36e2FCCCc59e5747Ff63a03ea2e5C0c2C14911e7",
    allocPoint: "0",
  },
  {
    pid: 20,
    lpAddresses: {
      "1": "0x0Cfe7968e7c34A51217a7C9b9dc1690F416E027e",
    },
    tokenAddresses: {
      "1": "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    },
    name: "Chef's Menu",
    symbol: "cDAI-DAI SLP",
    tokenSymbol: "cDAI",
    icon: "👨🏻‍🍳",
    uniswapPair: "cDAI/DAI",
    lpToken: "0x0Cfe7968e7c34A51217a7C9b9dc1690F416E027e",
    allocPoint: "0",
  },
  {
    pid: 22,
    lpAddresses: {
      "1": "0xf169CeA51EB51774cF107c88309717ddA20be167",
    },
    tokenAddresses: {
      "1": "0x2ba592F78dB6436527729929AAf6c908497cB200",
    },
    name: "Chef's Menu",
    symbol: "CREAM-ETH SLP",
    tokenSymbol: "CREAM",
    icon: "👨🏻‍🍳",
    uniswapPair: "CREAM/ETH",
    lpToken: "0xf169CeA51EB51774cF107c88309717ddA20be167",
    allocPoint: "0",
  },
  {
    pid: 23,
    lpAddresses: {
      "1": "0x17b3C19Bd640a59E832AB73eCcF716CB47419846",
    },
    tokenAddresses: {
      "1": "0xD5525D397898e5502075Ea5E830d8914f6F0affe",
    },
    name: "Chef's Menu",
    symbol: "MEME-ETH SLP",
    tokenSymbol: "MEME",
    icon: "👨🏻‍🍳",
    uniswapPair: "MEME/ETH",
    lpToken: "0x17b3C19Bd640a59E832AB73eCcF716CB47419846",
    allocPoint: "0",
  },
  {
    pid: 24,
    lpAddresses: {
      "1": "0xFcff3b04C499A57778ae2CF05584ab24278A7FCb",
    },
    tokenAddresses: {
      "1": "0x0d438f3b5175bebc262bf23753c1e53d03432bde",
    },
    name: "Chef's Menu",
    symbol: "wNXM-ETH SLP",
    tokenSymbol: "wNXM",
    icon: "👨🏻‍🍳",
    uniswapPair: "wNXM/ETH",
    lpToken: "0xFcff3b04C499A57778ae2CF05584ab24278A7FCb",
    allocPoint: "0",
  },
  {
    pid: 25,
    lpAddresses: {
      "1": "0x382c4a5147Fd4090F7BE3A9Ff398F95638F5D39E",
    },
    tokenAddresses: {
      "1": "0x5dbcf33d8c2e976c6b560249878e6f1491bca25c",
    },
    name: "Chef's Menu",
    symbol: "yUSD-ETH SLP",
    tokenSymbol: "yUSD",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "yUSD/ETH",
    lpToken: "0x382c4a5147Fd4090F7BE3A9Ff398F95638F5D39E",
    allocPoint: "0",
  },
  {
    pid: 26,
    lpAddresses: {
      "1": "0x2024324a99231509a3715172d4f4f4e751b38d4d",
    },
    tokenAddresses: {
      "1": "0x5dbcf33d8c2e976c6b560249878e6f1491bca25c",
    },
    name: "Chef's Menu",
    symbol: "yUSD-WBTC SLP",
    tokenSymbol: "yUSD",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "yUSD/WBTC",
    lpToken: "0x2024324a99231509a3715172d4f4f4e751b38d4d",
    allocPoint: "0",
  },
  {
    pid: 27,
    lpAddresses: {
      "1": "0x0be88ac4b5C81700acF3a606a52a31C261a24A35",
    },
    tokenAddresses: {
      "1": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
    },
    name: "Chef's Menu",
    symbol: "CRO-ETH SLP",
    tokenSymbol: "CRO",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "CRO/ETH",
    lpToken: "0x0be88ac4b5C81700acF3a606a52a31C261a24A35",
    allocPoint: "0",
  },
  {
    pid: 28,
    lpAddresses: {
      "1": "0x518d6CE2D7A689A591Bf46433443C31615b206C5",
    },
    tokenAddresses: {
      "1": "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
    },
    name: "Chef's Menu",
    symbol: "renBTC-WBTC SLP",
    tokenSymbol: "renBTC",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "renBTC/WBTC",
    lpToken: "0x518d6CE2D7A689A591Bf46433443C31615b206C5",
    allocPoint: "0",
  },
  {
    pid: 31,
    lpAddresses: {
      "1": "0x6463bd6026a2e7bfab5851b62969a92f7cca0eb6",
    },
    tokenAddresses: {
      "1": "0x584bC13c7D411c00c01A62e8019472dE68768430",
    },
    name: "Chef's Menu",
    symbol: "HEGIC-ETH SLP",
    tokenSymbol: "HEGIC",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "HEGIC/ETH",
    lpToken: "0x6463bd6026a2e7bfab5851b62969a92f7cca0eb6",
    allocPoint: "0",
  },
  {
    pid: 32,
    lpAddresses: {
      "1": "0x2dbc7dd86c6cd87b525bd54ea73ebeebbc307f68",
    },
    tokenAddresses: {
      "1": "0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa",
    },
    name: "Chef's Menu",
    symbol: "wBTC-tBTC SLP",
    tokenSymbol: "tBTC",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "wBTC/tBTC",
    lpToken: "0x2dbc7dd86c6cd87b525bd54ea73ebeebbc307f68",
    allocPoint: "0",
  },
  {
    pid: 33,
    lpAddresses: {
      "1": "0xba13afecda9beb75de5c56bbaf696b880a5a50dd",
    },
    tokenAddresses: {
      "1": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    },
    name: "Chef's Menu",
    symbol: "MKR-ETH SLP",
    tokenSymbol: "MKR",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "MKR/ETH",
    lpToken: "0xba13afecda9beb75de5c56bbaf696b880a5a50dd",
    allocPoint: "0",
  },
  {
    pid: 34,
    lpAddresses: {
      "1": "0x68c6d02d44e16f1c20088731ab032f849100d70f",
    },
    tokenAddresses: {
      "1": "0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7",
    },
    name: "Chef's Menu",
    symbol: "CORE-ETH SLP",
    tokenSymbol: "CORE",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "CORE/ETH",
    lpToken: "0x68c6d02d44e16f1c20088731ab032f849100d70f",
    allocPoint: "0",
  },
  {
    pid: 35,
    lpAddresses: {
      "1": "0x269db91fc3c7fcc275c2e6f22e5552504512811c",
    },
    tokenAddresses: {
      "1": "0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5",
    },
    name: "Chef's Menu",
    symbol: "PICKLE-ETH SLP",
    tokenSymbol: "PICKLE",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "PICKLE/ETH",
    lpToken: "0x269db91fc3c7fcc275c2e6f22e5552504512811c",
    allocPoint: "0",
  },
  {
    pid: 36,
    lpAddresses: {
      "1": "0x742c15d71ea7444964bc39b0ed729b3729adc361",
    },
    tokenAddresses: {
      "1": "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
    },
    name: "Chef's Menu",
    symbol: "OMG-ETH SLP",
    tokenSymbol: "OMG",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "OMG/ETH",
    lpToken: "0x742c15d71ea7444964bc39b0ed729b3729adc361",
    allocPoint: "0",
  },
  {
    pid: 37,
    lpAddresses: {
      1: "0xD75EA151a61d06868E31F8988D28DFE5E9df57B4",
    },
    tokenAddresses: {
      1: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    },
    name: "Chef's Menu",
    symbol: "AAVE-ETH SLP",
    tokenSymbol: "AAVE",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "AAVE/ETH",
    lpToken: "0xD75EA151a61d06868E31F8988D28DFE5E9df57B4",
    allocPoint: "0",
  },
  {
    pid: 38,
    lpAddresses: {
      1: "0x15e86e6f65ef7ea1dbb72a5e51a07926fb1c82e3",
    },
    tokenAddresses: {
      1: "0xff20817765cb7f73d4bde2e66e067e58d11095c2",
    },
    name: "Chef's Menu",
    symbol: "AMP-ETH SLP",
    tokenSymbol: "AMP",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "AMP/ETH",
    lpToken: "0x15e86e6f65ef7ea1dbb72a5e51a07926fb1c82e3",
    allocPoint: "0",
  },
  {
    pid: 39,
    lpAddresses: {
      1: "0xd597924b16cc1904d808285bc9044fd51ceeead7",
    },
    tokenAddresses: {
      1: "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272",
    },
    name: "Chef's Menu",
    symbol: "xSUSHI-USDC SLP",
    tokenSymbol: "xSUSHI",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "xSUSHI/USDC",
    lpToken: "0xd597924b16cc1904d808285bc9044fd51ceeead7",
    allocPoint: "0",
  },
  {
    pid: 40,
    lpAddresses: {
      1: "0x5a2943b25ce0678dc0b351928d2db331a55d94ea",
    },
    tokenAddresses: {
      1: "0x3F382DbD960E3a9bbCeaE22651E88158d2791550",
    },
    name: "Chef's Menu",
    symbol: "GHST-ETH SLP",
    tokenSymbol: "GHST",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "GHST/ETH",
    lpToken: "0x5a2943b25ce0678dc0b351928d2db331a55d94ea",
    allocPoint: "0",
  },
  {
    pid: 41,
    lpAddresses: {
      1: "0x53aabccae8c1713a6a150d9981d2ee867d0720e8",
    },
    tokenAddresses: {
      1: "0xfca59cd816ab1ead66534d82bc21e7515ce441cf",
    },
    name: "Chef's Menu",
    symbol: "RARI-ETH SLP",
    tokenSymbol: "RARI",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "RARI/ETH",
    lpToken: "0x53aabccae8c1713a6a150d9981d2ee867d0720e8",
    allocPoint: "0",
  },
  {
    pid: 42,
    lpAddresses: {
      1: "0x34b13f8cd184f55d0bd4dd1fe6c07d46f245c7ed",
    },
    tokenAddresses: {
      1: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
    },
    name: "Chef's Menu",
    symbol: "DPI-ETH SLP",
    tokenSymbol: "DPI",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "DPI/ETH",
    lpToken: "0x34b13f8cd184f55d0bd4dd1fe6c07d46f245c7ed",
    allocPoint: "0",
  },
  {
    pid: 43,
    lpAddresses: {
      1: "0xbcedc25cbb0ea44e03e41dc2d00d54fe6d4646db",
    },
    tokenAddresses: {
      1: "0xe1406825186D63980fd6e2eC61888f7B91C4bAe4",
    },
    name: "Chef's Menu",
    symbol: "vBTC-tBTC SLP",
    tokenSymbol: "vBTC",
    icon: "‍👨🏻‍🍳",
    uniswapPair: "vBTC/tBTC",
    lpToken: "0xbcedc25cbb0ea44e03e41dc2d00d54fe6d4646db",
    allocPoint: "0",
  },
  //
  {
    pid: 46,
    lpAddresses: {
      1: "0x69b39b89f9274a16e8a19b78e5eb47a4d91dac9e",
    },
    tokenAddresses: {
      1: "0xa0246c9032bC3A600820415aE600c6388619A14D",
    },
    name: "Chef's Menu",
    symbol: "FARM-ETH SLP",
    tokenSymbol: "FARM",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "FARM/ETH",
    lpToken: "0x69b39b89f9274a16e8a19b78e5eb47a4d91dac9e",
    allocPoint: "0",
  },
  {
    pid: 47,
    lpAddresses: {
      1: "0x0289b9cd5859476ce325aca04309d36addcebdaa",
    },
    tokenAddresses: {
      1: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
    },
    name: "Chef's Menu",
    symbol: "renBTC-ETH SLP",
    tokenSymbol: "renBTC",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "renBTC/ETH",
    lpToken: "0x0289b9cd5859476ce325aca04309d36addcebdaa",
    allocPoint: "0",
  },
  {
    pid: 48,
    lpAddresses: {
      1: "0x97f34c8e5992eb985c5f740e7ee8c7e48a1de76a",
    },
    tokenAddresses: {
      1: "0xad32A8e6220741182940c5aBF610bDE99E737b2D",
    },
    name: "Chef's Menu",
    symbol: "DOUGH-ETH SLP",
    tokenSymbol: "DOUGH",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "DOUGH/ETH",
    lpToken: "0x97f34c8e5992eb985c5f740e7ee8c7e48a1de76a",
    allocPoint: "0",
  },
  {
    pid: 49,
    lpAddresses: {
      1: "0x9fc5b87b74b9bd239879491056752eb90188106d",
    },
    tokenAddresses: {
      1: "0x0Ae055097C6d159879521C384F1D2123D1f195e6",
    },
    name: "Chef's Menu",
    symbol: "STAKE-ETH SLP",
    tokenSymbol: "STAKE",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "STAKE/ETH",
    lpToken: "0x9fc5b87b74b9bd239879491056752eb90188106d",
    allocPoint: "0",
  },
  {
    pid: 50,
    lpAddresses: {
      1: "0x6f58a1aa0248a9f794d13dc78e74fc75140956d7",
    },
    tokenAddresses: {
      1: "0x8762db106b2c2a0bccb3a80d1ed41273552616e8",
    },
    name: "Chef's Menu",
    symbol: "RSR-ETH SLP",
    tokenSymbol: "RSR",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "RSR/ETH",
    lpToken: "0x6f58a1aa0248a9f794d13dc78e74fc75140956d7",
    allocPoint: "0",
  },
  {
    pid: 51,
    lpAddresses: {
      1: "0xee6d78755e06c31ae7a5ea2b29b35c073dfc00a9",
    },
    tokenAddresses: {
      1: "0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa",
    },
    name: "Chef's Menu",
    symbol: "tBTC-ETH SLP",
    tokenSymbol: "tBTC",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "tBTC/ETH",
    lpToken: "0xee6d78755e06c31ae7a5ea2b29b35c073dfc00a9",
    allocPoint: "0",
  },
  {
    pid: 52,
    lpAddresses: {
      1: "0x4f871f310ad0e8a170db0021c0ce066859d37469",
    },
    tokenAddresses: {
      1: "0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998",
    },
    name: "Chef's Menu",
    symbol: "AUDIO-ETH SLP",
    tokenSymbol: "AUDIO",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "AUDIO/ETH",
    lpToken: "0x4f871f310ad0e8a170db0021c0ce066859d37469",
    allocPoint: "0",
  },
  {
    pid: 53,
    lpAddresses: {
      1: "0x364248b2f1f57c5402d244b2d469a35b4c0e9dab",
    },
    tokenAddresses: {
      1: "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7",
    },
    name: "Chef's Menu",
    symbol: "AKRO-ETH SLP",
    tokenSymbol: "AKRO",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "AKRO/ETH",
    lpToken: "0x364248b2f1f57c5402d244b2d469a35b4c0e9dab",
    allocPoint: "0",
  },
  {
    pid: 54,
    lpAddresses: {
      1: "0xd7c2a4aa31e1bf08dc7ff44c9980fa8573e10c1b",
    },
    tokenAddresses: {
      1: "0xEEF9f339514298C6A857EfCfC1A762aF84438dEE",
    },
    name: "Chef's Menu",
    symbol: "HEZ-ETH SLP",
    tokenSymbol: "HEZ",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "HEZ/ETH",
    lpToken: "0xd7c2a4aa31e1bf08dc7ff44c9980fa8573e10c1b",
    allocPoint: "0",
  },
  {
    pid: 55,
    lpAddresses: {
      1: "0x033ecd066376afec5e6383bc9f1f15be4c62dc89",
    },
    tokenAddresses: {
      1: "0xb1dc9124c395c1e97773ab855d66e879f053a289",
    },
    name: "Chef's Menu",
    symbol: "YAX-ETH SLP",
    tokenSymbol: "YAX",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "YAX/ETH",
    lpToken: "0x033ecd066376afec5e6383bc9f1f15be4c62dc89",
    allocPoint: "0",
  },
  {
    pid: 56,
    lpAddresses: {
      1: "0xe4455fdec181561e9ffe909dde46aaeaedc55283",
    },
    tokenAddresses: {
      1: "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86",
    },
    name: "Chef's Menu",
    symbol: "OUSD-USDT SLP",
    tokenSymbol: "oUSD",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "oUSD/USDT",
    lpToken: "0xe4455fdec181561e9ffe909dde46aaeaedc55283",
    allocPoint: "0",
  },
  {
    pid: 57,
    lpAddresses: {
      1: "0x0bff31d8179da718a7ee3669853cf9978c90a24a",
    },
    tokenAddresses: {
      1: "0xEa319e87Cf06203DAe107Dd8E5672175e3Ee976c",
    },
    name: "Chef's Menu",
    symbol: "SURF-ETH SLP",
    tokenSymbol: "SURF",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "SURF/ETH",
    lpToken: "0x0bff31d8179da718a7ee3669853cf9978c90a24a",
    allocPoint: "0",
  },
  {
    pid: 58,
    lpAddresses: {
      1: "0xaf988aff99d3d0cb870812c325c588d8d8cb7de8",
    },
    tokenAddresses: {
      1: "0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44",
    },
    name: "Chef's Menu",
    symbol: "KP3R-ETH SLP",
    tokenSymbol: "KP3R",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "KP3R/ETH",
    lpToken: "0xaf988aff99d3d0cb870812c325c588d8d8cb7de8",
    allocPoint: "0",
  },
  {
    pid: 59,
    lpAddresses: {
      1: "0xc5fa164247d2f8d68804139457146efbde8370f6",
    },
    tokenAddresses: {
      1: "0xCa3FE04C7Ee111F0bbb02C328c699226aCf9Fd33",
    },
    name: "Chef's Menu",
    symbol: "SEEN-ETH SLP",
    tokenSymbol: "SEEN",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "SEEN/ETH",
    lpToken: "0xc5fa164247d2f8d68804139457146efbde8370f6",
    allocPoint: "0",
  },
  {
    pid: 60,
    lpAddresses: {
      1: "0x35a0d9579b1e886702375364fe9c540f97e4517b",
    },
    tokenAddresses: {
      1: "0xF5D669627376EBd411E34b98F19C868c8ABA5ADA",
    },
    name: "Chef's Menu",
    symbol: "AXS-ETH SLP",
    tokenSymbol: "AXS",
    icon: "‍‍👨🏻‍🍳",
    uniswapPair: "AXS/ETH",
    lpToken: "0x35a0d9579b1e886702375364fe9c540f97e4517b",
    allocPoint: "0",
  },
];
