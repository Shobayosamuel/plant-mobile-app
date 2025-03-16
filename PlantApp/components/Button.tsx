import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import Colors from '@/constants/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  ...rest
}) => {
  const getButtonStyle = (): ViewStyle => {
    let buttonStyle: ViewStyle = { ...styles.button };

    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle = { ...buttonStyle, ...styles.primaryButton };
        break;
      case 'secondary':
        buttonStyle = { ...buttonStyle, ...styles.secondaryButton };
        break;
      case 'outline':
        buttonStyle = { ...buttonStyle, ...styles.outlineButton };
        break;
      case 'text':
        buttonStyle = { ...buttonStyle, ...styles.textButton };
        break;
    }

    // Size styles
    switch (size) {
      case 'small':
        buttonStyle = { ...buttonStyle, ...styles.smallButton };
        break;
      case 'medium':
        buttonStyle = { ...buttonStyle, ...styles.mediumButton };
        break;
      case 'large':
        buttonStyle = { ...buttonStyle, ...styles.largeButton };
        break;
    }

    // Disabled style
    if (disabled || loading) {
      buttonStyle = {
        ...buttonStyle,
        ...styles.disabledButton,
        ...(variant === 'outline' ? styles.disabledOutlineButton : {}),
        ...(variant === 'text' ? styles.disabledTextButton : {})
      };
    }

    return buttonStyle;
  };

  const getTextStyle = (): TextStyle => {
    let textStyleObj: TextStyle = { ...styles.buttonText };

    // Variant text styles
    switch (variant) {
      case 'primary':
        textStyleObj = { ...textStyleObj, ...styles.primaryButtonText };
        break;
      case 'secondary':
        textStyleObj = { ...textStyleObj, ...styles.secondaryButtonText };
        break;
      case 'outline':
        textStyleObj = { ...textStyleObj, ...styles.outlineButtonText };
        break;
      case 'text':
        textStyleObj = { ...textStyleObj, ...styles.textButtonText };
        break;
    }

    // Size text styles
    switch (size) {
      case 'small':
        textStyleObj = { ...textStyleObj, ...styles.smallButtonText };
        break;
      case 'medium':
        textStyleObj = { ...textStyleObj, ...styles.mediumButtonText };
        break;
      case 'large':
        textStyleObj = { ...textStyleObj, ...styles.largeButtonText };
        break;
    }

    // Disabled text style
    if (disabled || loading) {
      textStyleObj = {
        ...textStyleObj,
        ...(variant === 'outline' || variant === 'text' ? styles.disabledOutlineText : styles.disabledButtonText)
      };
    }

    return textStyleObj;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' ? Colors.white : Colors.primary}
        />
      ) : (
        <>
          {icon && icon}
          <Text style={[getTextStyle(), icon ? { marginLeft: icon ? 8 : 0 } : {}, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  // Variant styles
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
  },

  // Size styles
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  // Disabled styles
  disabledButton: {
    backgroundColor: Colors.lightGrey,
    borderColor: Colors.lightGrey,
  },
  disabledOutlineButton: {
    backgroundColor: 'transparent',
    borderColor: Colors.grey,
  },
  disabledTextButton: {
    backgroundColor: 'transparent',
  },

  // Text styles
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
  },
  secondaryButtonText: {
    color: Colors.text,
  },
  outlineButtonText: {
    color: Colors.primary,
  },
  textButtonText: {
    color: Colors.primary,
  },

  // Text size styles
  smallButtonText: {
    fontSize: 12,
  },
  mediumButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 16,
  },

  // Disabled text styles
  disabledButtonText: {
    color: Colors.darkGrey,
  },
  disabledOutlineText: {
    color: Colors.grey,
  },
});