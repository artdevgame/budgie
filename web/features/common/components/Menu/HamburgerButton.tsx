import { useInteractiveMenu } from 'features/common/context/InteractiveMenu';
import { HamburgerIcon, IconButton } from 'native-base';

export const HamburgerButton = () => {
  const { onOpen } = useInteractiveMenu();
  return <IconButton colorScheme="muted" icon={<HamburgerIcon />} onPress={onOpen} />;
};
