import type { PressableProps } from 'react-native';
import { Pressable } from 'native-base';

interface BackgroundProps {
  onPress?: PressableProps['onPress'];
}

export const Background = ({ onPress = null }: BackgroundProps) => {
  return (
    <Pressable
      onPress={onPress}
      position="absolute"
      top="0"
      left="0"
      bottom="0"
      right="0"
      bgColor="blueGray.300"
      zIndex="1"
      opacity="0.8"
    />
  );
};
