import { SafeAreaView, useColorScheme } from "react-native";
import BtcPriceWidget from "../components/btcPriceWidget";
import { useContext } from "react";
import { ThemeContext } from "../constants/themeContext";

export default function Index() {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        padding: "5%",
        paddingTop: "50%",
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <BtcPriceWidget />
    </SafeAreaView>
  );
}
