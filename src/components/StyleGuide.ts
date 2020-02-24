const StyleGuide = {
  spacing: 8,
  palette: {
    primary: "#3884ff",
    secondary: "#FF6584",
    tertiary: "#38ffb3",
    backgroundPrimary: "#d5e5ff", // === rgba(primary, 0.1)
    background: "#f2f2f2",
    border: "#f2f2f2"
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
      fontFamily: "SFProText-Regular"
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: "SFProText-Regular"
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
      fontFamily: "SFProText-Regular"
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      fontFamily: "SFProText-Regular",
      color: "#999999"
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
      // fontFamily: "SFProText-Semibold"
    },
    row: {
      width: "100%",
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      height: 60
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
      fontFamily: "SFProText-Bold"
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
      fontFamily: "SFProText-Bold"
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
      fontFamily: "SFProText-Bold"
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
      fontFamily: "SFProText-Bold"
    }
  }
};

export default StyleGuide;
