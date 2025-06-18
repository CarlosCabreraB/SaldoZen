import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 16
  },
  darkContainer: {
    backgroundColor: colors.black,
    paddingHorizontal: 16
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.darkerGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  darkCard: {
    backgroundColor: colors.darkerGray,
    shadowColor: colors.black
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.darkerGray,
    marginBottom: 8
  },
  darkTitle: {
    color: colors.softWhite
  },
  subtitle: {
    fontSize: 14,
    color: colors.mediumGray,
    marginBottom: 16
  },
  darkSubtitle: {
    color: colors.secondaryText
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 16
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightBorder,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: colors.white,
    color: colors.darkerGray
  },
  darkInput: {
    backgroundColor: colors.darkerGray,
    borderColor: colors.border,
    color: colors.softWhite
  },
  positiveAmount: {
    color: colors.primaryDark,
    fontWeight: '600'
  },
  negativeAmount: {
    color: colors.danger,
    fontWeight: '600'
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightBorder,
    marginVertical: 8
  },
  darkSeparator: {
    backgroundColor: colors.border
  }
});