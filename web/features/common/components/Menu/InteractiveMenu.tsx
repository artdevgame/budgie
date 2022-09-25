import { useInteractiveMenu } from 'features/common/context/InteractiveMenu';
import { Box, CloseIcon, IconButton, PresenceTransition } from 'native-base';

import { Background } from '../Background';
import { Menu } from './Menu';

export const InteractiveMenu = () => {
  const { isOpen, onClose } = useInteractiveMenu();

  return isOpen ? (
    <>
      <Box zIndex="1000" position="absolute" top="0" bottom="0">
        <PresenceTransition
          visible={isOpen}
          initial={{ translateX: -332 }}
          exit={{ translateX: -332 }}
          animate={{ translateX: 0 }}
          style={{ flexGrow: 1 }}
        >
          <Menu width="332" />
        </PresenceTransition>
      </Box>

      <Background onPress={onClose} />
      <IconButton icon={<CloseIcon />} onPress={onClose} position="absolute" zIndex="1002" top="4" right="4" />
    </>
  ) : null;
};
