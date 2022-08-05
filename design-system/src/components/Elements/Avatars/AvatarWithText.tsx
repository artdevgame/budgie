import { styled, StyledComponent } from 'nativewind';
import React, { ReactElement } from 'react';
import { Pressable, View } from 'react-native';

import { usePress } from '@react-native-aria/interactions';

import { Text } from '../Typography/Text';
import { TAnyAvatar } from './common';

export interface IAvatarWithText {
  avatar: TAnyAvatar;
  label?: string;
  name: string;
  onPress({ name }: { name: string }): void;
}

const StyledView = styled(View);

export const AvatarWithText = ({ avatar, label = 'View profile', name, onPress }: IAvatarWithText): ReactElement => {
  const { pressProps } = usePress({ onPress: () => onPress({ name }) });

  return (
    <StyledComponent component={Pressable} {...pressProps} className="inline-flex group block">
      <StyledView className="flex flex-row items-center">
        <View>{avatar}</View>
        <StyledView className="ml-3">
          <Text className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{name}</Text>
          <Text className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{label}</Text>
        </StyledView>
      </StyledView>
    </StyledComponent>
  );
};
