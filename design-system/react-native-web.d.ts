import { SyntheticEvent } from 'react';

declare module 'react-native' {
  interface PressableProps {
    onHoverIn?(event: SyntheticEvent): void;
    onHoverOut?(event: SyntheticEvent): void;
  }
}
