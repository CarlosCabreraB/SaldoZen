import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const SavingsProgress = ({ current, goal }) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Meta de ahorro</Text>
        <Text style={styles.amount}>
          ${current} <Text style={styles.goalText}>de ${goal}</Text>
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { 
              width: `${percentage}%`,
              backgroundColor: percentage >= 80 ? colors.primary : colors.secondary
            }
          ]}
        />
      </View>
      <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  label: {
    fontSize: 14,
    color: colors.mediumGray
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkerGray
  },
  goalText: {
    color: colors.mediumGray,
    fontWeight: '400'
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.lightBorder,
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 4
  },
  percentage: {
    alignSelf: 'flex-end',
    marginTop: 4,
    fontSize: 12,
    color: colors.mediumGray
  }
});

export default SavingsProgress;

// DONE