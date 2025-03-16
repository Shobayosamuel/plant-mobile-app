import { View, ViewProps } from 'react-native';
import { useColorScheme } from 'react-native';

export function ThemedView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const colorScheme = useColorScheme();

  const viewStyle = {
    backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
  };

  return <View style={[viewStyle, style]} {...otherProps} />;
}