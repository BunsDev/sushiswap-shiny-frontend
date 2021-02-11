//import { transparentize } from "polished";
import React, { useMemo } from "react";
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme,
} from "styled-components";
import { useIsDarkMode } from "../../../services/exchange/state/user/hooks";
import { Text, TextProps } from "rebass";
import { Colors } from "./styled";

export * from "./components";

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280,
};

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

const white = "#FFFFFF";
const black = "#000000";
// added to keep type consistency with /frontend
const grey = "";

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? "#FFFFFF" : "#b3b5be",
    text2: darkMode ? "#C3C5CB" : "#b3b5be",

    text3: darkMode ? "#6C7284" : "#b3b3b3",
    text4: darkMode ? "#565A69" : "#C3C5CB",
    text5: darkMode ? "#2C2F36" : "#e5e7eb",

    // backgrounds / greys
    bg1: darkMode ? "#212429" : "#121722", //base color
    bg2: darkMode ? "#2C2F36" : "#2b2e39",
    bg3: darkMode ? "#40444F" : "#2b2e39",
    bg4: darkMode ? "#565A69" : "#CED0D9",
    bg5: darkMode ? "#6C7284" : "#b3b3b3",

    //specialty colors
    modalBG: darkMode ? "rgba(0,0,0,.425)" : "rgba(0,0,0,0.3)",
    advancedBG: darkMode ? "rgba(0,0,0,0.1)" : "#121722",

    //primary colors
    primary1: darkMode ? "#2172E5" : "#1976d3", //"#805e49",
    primary2: darkMode ? "#3680E7" : "#DD6B20", //"#88715f",
    primary3: darkMode ? "#4D8FEA" : "#ED8936", //"#aa9585",
    primary4: darkMode ? "#376bad70" : "#121722", //"#e2d6cf",
    primary5: darkMode ? "#153d6f70" : "#0d0d23", //"f0e9e7",

    // color text
    primaryText1: darkMode ? "#6da8ff" : "#b3b5be", //"#805e49",

    // secondary colors
    secondary1: darkMode ? "#2172E5" : "#0e0e23", //"#805e49",
    secondary2: darkMode ? "#17000b26" : "#151539", //"#e2d6cf",
    secondary3: darkMode ? "#17000b26" : "#0d0d23", //"#f0e9e7",

    // other
    red1: "#FF6871",
    red2: "#F82D3A",
    green1: "#27AE60",
    yellow1: "#FFE270",
    yellow2: "#F3841E",

    inputField: "#1f222d",
    // borderRadius: "5rem",

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  };
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? "#000" : "#2F80ED",

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
    // additional to preserve type consistency with /frontend
    // TODO: Need to fix / remove
    borderRadius: "0px",
    breakpoint: {
      mobile: 400,
    },
    color: {
      black,
      grey,
      primary: {
        light: "#",
        main: "#",
      },
      secondary: {
        main: "#",
      },
      white,
    },
    siteWidth: 1200,
    spacing: {
      1: 4,
      2: 8,
      3: 16,
      4: 24,
      5: 32,
      6: 48,
      7: 64,
    },
    topBarSize: 72,
  };
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode();

  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

export const TYPE = {
  main(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} color={"text2"} {...props} />;
  },
  link(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
  },
  black(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} color={"text1"} {...props} />;
  },
  body(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={400} fontSize={16} color={"text1"} {...props} />;
  },
  largeHeader(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
  },
  mediumHeader(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
  },
  subHeader(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
  },
  blue(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
  },
  yellow(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} color={"yellow1"} {...props} />;
  },
  darkGray(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} color={"text3"} {...props} />;
  },
  gray(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} color={"bg3"} {...props} />;
  },
  italic(props: TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={"italic"} color={"text2"} {...props} />;
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    //@ts-ignore
    return <TextWrapper fontWeight={500} color={error ? "red1" : "text2"} {...props} />;
  },
};

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.018em;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Inter var', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
`;

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: inherit;
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
}
`;

// export const ThemedGlobalStyle = createGlobalStyle`
// html {
//   color: ${({ theme }) => theme.text1};
//   background-color: ${({ theme }) => theme.bg2};
// }

// body {
//   min-height: 100vh;
//   background-position: 0 -30vh;
//   background-repeat: no-repeat;
//   background-image: ${({ theme }) =>
//     `radial-gradient(50% 50% at 50% 50%, ${theme.primary5} 0%, ${transparentize(
//       1,
//       theme.primary4
//     )} 100%)`};
// }
// `;

// import { transparentize } from "polished";
// import React, { useMemo } from "react";
// import styled, {
//   ThemeProvider as StyledComponentsThemeProvider,
//   createGlobalStyle,
//   css,
//   DefaultTheme,
// } from "styled-components";
// import { useIsDarkMode } from "../state/user/hooks";
// import { Text, TextProps } from "rebass";
// import { Colors } from "./styled";

// export * from "./components";

// const MEDIA_WIDTHS = {
//   upToExtraSmall: 500,
//   upToSmall: 600,
//   upToMedium: 960,
//   upToLarge: 1280,
// };

// const mediaWidthTemplates: {
//   [width in keyof typeof MEDIA_WIDTHS]: typeof css;
// } = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
//   (accumulator as any)[size] = (a: any, b: any, c: any) => css`
//     @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
//       ${css(a, b, c)}
//     }
//   `;
//   return accumulator;
// }, {}) as any;

// const white = "#FFFFFF";
// const black = "#000000";
// // added to keep type consistency with /frontend
// const grey = "";

// export function colors(darkMode: boolean): Colors {
//   return {
//     // base
//     white,
//     black,

//     // text
//     text1: darkMode ? "#FFFFFF" : "#000000",
//     text2: darkMode ? "#C3C5CB" : "#565A69",
//     text3: darkMode ? "#6C7284" : "#b3b3b3",
//     text4: darkMode ? "#565A69" : "#C3C5CB",
//     text5: darkMode ? "#2C2F36" : "#e5e7eb",

//     // backgrounds / greys
//     bg1: darkMode ? "#212429" : "#FFFFFF",
//     bg2: darkMode ? "#2C2F36" : "#e6e6e6",
//     bg3: darkMode ? "#f4f5f7" : "#f4f5f7", //"#40444F" : "#f4f5f7",
//     bg4: darkMode ? "#565A69" : "#CED0D9",
//     bg5: darkMode ? "#6C7284" : "#b3b3b3",

//     //specialty colors
//     modalBG: darkMode ? "rgba(0,0,0,.425)" : "rgba(0,0,0,0.3)",
//     advancedBG: darkMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.6)",

//     //primary colors
//     primary1: darkMode ? "#2172E5" : "#0e0e23", //"#805e49",
//     primary2: darkMode ? "#3680E7" : "#DD6B20", //"#88715f",
//     primary3: darkMode ? "#4D8FEA" : "#ED8936", //"#aa9585",
//     primary4: darkMode ? "#376bad70" : "#151539", //"#e2d6cf",
//     primary5: darkMode ? "#153d6f70" : "#f4f5f7", //"f0e9e7",

//     // color text
//     primaryText1: darkMode ? "#6da8ff" : "#0e0e23", //"#805e49",

//     // secondary colors
//     secondary1: darkMode ? "#2172E5" : "#0e0e23", //"#805e49",
//     secondary2: darkMode ? "#17000b26" : "#151539", //"#e2d6cf",
//     secondary3: darkMode ? "#17000b26" : "#0d0d23", //"#f0e9e7",

//     // other
//     red1: "#FF6871",
//     red2: "#F82D3A",
//     green1: "#27AE60",
//     yellow1: "#FFE270",
//     yellow2: "#F3841E",

//     // dont wanna forget these blue yet
//     // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
//     // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
//   };
// }

// export function theme(darkMode: boolean): DefaultTheme {
//   return {
//     ...colors(darkMode),

//     grids: {
//       sm: 8,
//       md: 12,
//       lg: 24,
//     },

//     //shadows
//     shadow1: darkMode ? "#000" : "#2F80ED",

//     // media queries
//     mediaWidth: mediaWidthTemplates,

//     // css snippets
//     flexColumnNoWrap: css`
//       display: flex;
//       flex-flow: column nowrap;
//     `,
//     flexRowNoWrap: css`
//       display: flex;
//       flex-flow: row nowrap;
//     `,
//     // additional to preserve type consistency with /frontend
//     // TODO: Need to fix / remove
//     borderRadius: 12,
//     breakpoint: {
//       mobile: 400,
//     },
//     color: {
//       black,
//       grey,
//       primary: {
//         light: "#",
//         main: "#",
//       },
//       secondary: {
//         main: "#",
//       },
//       white,
//     },
//     siteWidth: 1200,
//     spacing: {
//       1: 4,
//       2: 8,
//       3: 16,
//       4: 24,
//       5: 32,
//       6: 48,
//       7: 64,
//     },
//     topBarSize: 72,
//   };
// }

// export default function ThemeProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const darkMode = useIsDarkMode();

//   const themeObject = useMemo(() => theme(darkMode), [darkMode]);

//   return (
//     <StyledComponentsThemeProvider theme={themeObject}>
//       {children}
//     </StyledComponentsThemeProvider>
//   );
// }

// const TextWrapper = styled(Text)<{ color: keyof Colors }>`
//   color: ${({ color, theme }) => (theme as any)[color]};
// `;

// export const TYPE = {
//   main(props: TextProps) {
//     return <TextWrapper fontWeight={500} color={"text2"} {...props} />;
//   },
//   link(props: TextProps) {
//     return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
//   },
//   black(props: TextProps) {
//     return <TextWrapper fontWeight={500} color={"text1"} {...props} />;
//   },
//   body(props: TextProps) {
//     return (
//       <TextWrapper fontWeight={400} fontSize={16} color={"text1"} {...props} />
//     );
//   },
//   largeHeader(props: TextProps) {
//     return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
//   },
//   mediumHeader(props: TextProps) {
//     return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
//   },
//   subHeader(props: TextProps) {
//     return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
//   },
//   blue(props: TextProps) {
//     return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
//   },
//   yellow(props: TextProps) {
//     return <TextWrapper fontWeight={500} color={"yellow1"} {...props} />;
//   },
//   darkGray(props: TextProps) {
//     return <TextWrapper fontWeight={500} color={"text3"} {...props} />;
//   },
//   gray(props: TextProps) {
//     return <TextWrapper fontWeight={500} color={"bg3"} {...props} />;
//   },
//   italic(props: TextProps) {
//     return (
//       <TextWrapper
//         fontWeight={500}
//         fontSize={12}
//         fontStyle={"italic"}
//         color={"text2"}
//         {...props}
//       />
//     );
//   },
//   error({ error, ...props }: { error: boolean } & TextProps) {
//     return (
//       <TextWrapper
//         fontWeight={500}
//         color={error ? "red1" : "text2"}
//         {...props}
//       />
//     );
//   },
// };

// export const FixedGlobalStyle = createGlobalStyle`
// html, input, textarea, button {
//   font-family: 'Inter', sans-serif;
//   letter-spacing: -0.018em;
//   font-display: fallback;
// }
// @supports (font-variation-settings: normal) {
//   html, input, textarea, button {
//     font-family: 'Inter var', sans-serif;
//   }
// }

// html,
// body {
//   margin: 0;
//   padding: 0;
// }

// * {
//   box-sizing: border-box;
// }

// button {
//   user-select: none;
// }

// html {
//   font-size: 16px;
//   font-variant: none;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
// }
// `;

// export const ThemedGlobalStyle = createGlobalStyle`
// html {
//   color: ${({ theme }) => theme.text1};
//   background-color: ${({ theme }) => theme.bg2};
// }

// body {
//   min-height: 100vh;
//   background-position: 0 -30vh;
//   background-repeat: no-repeat;
//   background-image: ${({ theme }) =>
//     `radial-gradient(50% 50% at 50% 50%, ${theme.primary5} 0%, ${transparentize(
//       1,
//       theme.primary4
//     )} 100%)`};
// }
// `;