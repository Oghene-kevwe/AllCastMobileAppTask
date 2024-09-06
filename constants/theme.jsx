const pallete = {
  primaryPurple: "#6D31EDFF",
  red: "#E64646",
  black: "#000000FF",
  white: "#ffffff",
  gray: "#7F7E7C",
  appBorder: "#655F5F",
};

export const lightTheme = {
  colors: {
    background: pallete.white,
    foreground: pallete.black,
    primary: pallete.primaryPurple,
    danger: pallete.red,
    bodyTextGray: pallete.gray,
    appBorderColor: pallete.appBorder,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xl2: 32,
    xl3: 40,
    xl4: 48,
    xl5: 56,
    xl6: 64,
    xl7: 72,
    xl8: 80,
    xl9: 88,
    xl10: 96,
    xl11: 100,
    xl12: 112,
    xl13: 120,
  },
  textVariants: {
    headLine: {
      fontWeight: "800",
      fontSize: 24,
      lineHeight: 30,
    },
    headLine2: {
      fontWeight: "700",
      fontSize: 20,
      lineHeight: 25,
    },
    listHeader: {
      fontWeight: "600",
      fontSize: 17,
      lineHeight: 21,
    },
    subHeadline: {
      fontWeight: "500",
      fontSize: 14,
      lineHeight: 18,
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: pallete.black,
    foreground: pallete.white,
    bodyTextGray: "#BAB8B8",
  },
};
