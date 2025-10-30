import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  primary: {
    backgroundColor: '#1a0033',
    borderColor: '#ff4da6',
    shadowColor: '#ff4da6',
  },
  secondary: {
    backgroundColor: '#001a33',
    borderColor: '#66ffff',
    shadowColor: '#66ffff',
  },
  danger: {
    backgroundColor: '#330000',
    borderColor: '#ff6666',
    shadowColor: '#ff6666',
  },
  disabled: {
    backgroundColor: '#333333',
    borderColor: '#666666',
    shadowColor: '#666666',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  primaryText: {
    color: '#ff4da6',
    textShadowColor: '#ff4da6',
  },
  secondaryText: {
    color: '#66ffff',
    textShadowColor: '#66ffff',
  },
  dangerText: {
    color: '#ff6666',
    textShadowColor: '#ff6666',
  },
});
