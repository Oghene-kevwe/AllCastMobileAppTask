import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ThemeContext } from "../constants/themeContext";

const PriceInput = ({ usdAmount, setUsdAmount, btcPrice, setBtcEquivalent }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const theme = useContext(ThemeContext);

  function handleUsdChange (value) {
    const usd = parseFloat(value);

    if (value === "" || isNaN(usd)) {
      setUsdAmount("");
      setBtcEquivalent("--");
      setError(true);
      setErrorMessage("Please enter a valid number e.g 10");
      return;
    } else {
      setError(false);
    }

    if (usd > 100000000) {
      setError(true);
      setErrorMessage("Amount cannot exceed $100,000,000.");
      return;
    } else {
      setError(false);
    }

    if (btcPrice) {
      setBtcEquivalent((usd / btcPrice).toFixed(8));
    }

    setUsdAmount(value);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.colors.primary }]}>
        Enter USD amount:
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            color:theme.colors.foreground
          }
        ]}
        value={usdAmount}
        onChangeText={handleUsdChange}
        placeholder="Enter amount in USD"
        keyboardType="numeric"
        placeholderTextColor={theme.colors.bodyTextGray}
      />
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    textAlign:"center"
  },
  input: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
});

export default PriceInput;
