import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../../theme/globalStyles';

const PrimaryButton = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[
        globalStyles.buttonPrimary,
        styles.button,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  disabled: {
    opacity: 0.6
  }
});

export default PrimaryButton;