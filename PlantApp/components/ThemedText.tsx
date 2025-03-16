import { Text, TextProps, TextStyle } from 'react-native';
import { useColorScheme } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'link';
}

export function ThemedText(props: ThemedTextProps) {
  const { style, type = 'default', ...otherProps } = props;
  const colorScheme = useColorScheme();

  const textStyle: TextStyle = {
    color: colorScheme === 'dark' ? '#fff' : '#000',
    ...(type === 'title' && { fontSize: 20, fontWeight: 'bold' as const }),
    ...(type === 'link' && { color: colorScheme === 'dark' ? '#87cefa' : '#2196f3' }),
  };

  return <Text style={[textStyle, style]} {...otherProps} />;
}