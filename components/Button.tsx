// src/components/common/Button.tsx
import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { COLORS } from '@/constants/colors'
import { SPACING } from '../constants/spacing'
import { BUTTON_VARIANTS } from '../constants/variants'

type ButtonVariant = keyof typeof BUTTON_VARIANTS

export interface ButtonProps {
  title: string
  onPress?: (event: GestureResponderEvent) => void
  variant?: ButtonVariant
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = BUTTON_VARIANTS.contained,
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === 'contained' && styles.contained,
        variant === 'outline' && styles.outline,
        variant === 'text' && styles.textOnly,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === 'contained' && styles.containedText,
          variant === 'outline' && styles.outlineText,
          variant === 'text' && styles.textOnlyText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contained: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textOnly: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  containedText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  textOnlyText: {
    color: COLORS.primary,
  },
})
