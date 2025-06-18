import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../../theme/globalStyles';

const AmountIndicator = ({ amount, label, type = 'neutral' }) => {
  const getColor = () => {
    switch(type) {
      case 'positive': return colors.primaryDark;
      case 'negative': return colors.danger;
      case 'warning': return colors.warning;
      default: return colors.darkerGray;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.mediumGray }]}>{label}</Text>
      <Text style={[styles.amount, { color: getColor() }]}>
        {amount >= 0 ? '+' : ''}{amount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8
  },
  label: {
    fontSize: 12,
    marginBottom: 4
  },
  amount: {
    fontSize: 18,
    fontWeight: '600'
  }
});

export default AmountIndicator;