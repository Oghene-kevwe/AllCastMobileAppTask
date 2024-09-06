import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import PriceInput from "./priceInput";
import { ThemeContext } from "../constants/themeContext";

const BtcPriceWidget = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [usdAmount, setUsdAmount] = useState("");
  const [btcEquivalent, setBtcEquivalent] = useState("--");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [apiError, setApiError] = useState(false);

  const theme = useContext(ThemeContext); // Get current theme

  async function fetchBitcoinPrice() {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        const price = data.bitcoin.usd;
        const timestamp = new Date().toLocaleString();
        setBtcPrice(price);
        setLastUpdated(timestamp);
      }
    } catch (error) {
      setApiError(true);
      console.error("Error fetching Bitcoin price:", error);
    }
  }

  useEffect(() => {
    fetchBitcoinPrice();
    const interval = setInterval(() => {
      fetchBitcoinPrice();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  // add commas to current price
  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: theme.colors.appBorderColor,
          padding: theme.spacing.xl,
        },
        styles.container,
      ]}
    >
      {/* header */}
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        BTC Price Widget
      </Text>
      {/* fetch error text */}
      {apiError ? (
        <Text style={[styles.errorText, { color: theme.colors.danger }]}>
          An error occurred, please try again later.
        </Text>
      ) : (
        <View style={styles.priceContainer}>
          {/* current price */}
          <Text style={[styles.priceText, { color: theme.colors.foreground }]}>
            Current BTC Price: {btcPrice ? `$${formatNumber(btcPrice)}` : "--"}
          </Text>

          {/* last updated */}
          <Text
            style={[
              styles.lastUpdated,
              {
                color: theme.colors.bodyTextGray,
              },
            ]}
          >
            Last Updated: {lastUpdated || "--"}
          </Text>
        </View>
      )}

      {/* price input */}
      <PriceInput
        setUsdAmount={setUsdAmount}
        usdAmount={usdAmount}
        btcPrice={btcPrice}
        btcEquivalent={btcEquivalent}
        setBtcEquivalent={setBtcEquivalent}
      />

      {/* converted price */}
      <View style={styles.convertedContainer}>
        <Text
          style={[styles.convertedText, { color: theme.colors.foreground }]}
        >
          Converted BTC: {btcEquivalent} BTC
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 450,
    marginHorizontal: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 8,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  priceContainer: {
    marginBottom: 40,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  lastUpdated: {
    fontSize: 12,
    textAlign: "center",
  },
  convertedContainer: {
    marginTop: 16,
  },
  convertedText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
});

export default BtcPriceWidget;
