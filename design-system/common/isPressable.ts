import { PressableProps } from 'react-native';

export const isPressable = (props: PressableProps) => {
  return (
    !props.disabled &&
    (props.onAccessibilityAction ||
      props.onAccessibilityTap ||
      props.onBlur ||
      props.onFocus ||
      props.onHoverIn ||
      props.onHoverOut ||
      props.onLongPress ||
      props.onMagicTap ||
      props.onPress ||
      props.onPressIn ||
      props.onPressOut ||
      props.onTouchCancel ||
      props.onTouchEnd ||
      props.onTouchMove ||
      props.onTouchStart)
  );
};
