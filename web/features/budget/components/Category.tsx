import {
    Badge, Box, Checkbox, HStack, IconButton, Input, Pressable, Text, useMediaQuery, useTheme
} from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { useModal } from 'react-modal-hook';
import { Animated } from 'react-native';
import { useSwipeable } from 'react-swipeable';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { DeleteCategoryModal } from './DeleteCategoryModal';
import { RenameCategoryModal } from './RenameCategoryModal';
import { SetBudgetModal } from './SetBudgetModal';

interface CategoryProps {
  id: string;
  name: string;
}

const SwipeableActions = () => {
  const { fontSizes } = useTheme();
  const [showDeleteCategoryModal, hideDeleteCategoryModal] = useModal(() => (
    <DeleteCategoryModal onClose={hideDeleteCategoryModal} />
  ));
  const [showRenameCategoryModal, hideRenameCategoryModal] = useModal(() => (
    <RenameCategoryModal onClose={hideRenameCategoryModal} />
  ));

  return (
    <HStack alignItems="center" height="full" justifyContent="center" position="absolute" right="0" width="100">
      <IconButton
        onPress={showDeleteCategoryModal}
        colorScheme="warmGray"
        icon={<TrashIcon width={fontSizes['lg']} color="white" />}
      />
      <IconButton
        onPress={showRenameCategoryModal}
        colorScheme="warmGray"
        icon={<PencilIcon width={fontSizes['lg']} color="white" />}
      />
    </HStack>
  );
};

export const Category = ({ id, name }: CategoryProps) => {
  const { breakpoints } = useTheme();
  const [showActions, setShowActions] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const hasSwiped = useRef(false);

  const [showSetBudgetModal, hideSetBudgetModal] = useModal(() => <SetBudgetModal onClose={hideSetBudgetModal} />);

  const [isSmallScreen] = useMediaQuery({
    maxWidth: Number(breakpoints.md),
  });

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () => {
      hasSwiped.current = true;
      setShowActions(true);
      resetHasSwiped();
    },
    onSwipedRight: () => {
      hasSwiped.current = true;
      setShowActions(false);
      resetHasSwiped();
    },
  });

  const resetHasSwiped = () => setTimeout(() => (hasSwiped.current = false), 500);

  const openBudgetModal = () => {
    if (!hasSwiped.current) {
      showSetBudgetModal();
      resetHasSwiped();
    }
  };

  const onToggleMenu = () => {
    setShowActions((p) => !p);
  };

  const smallScreenHandlers = isSmallScreen && {
    onPress: openBudgetModal,
    onLongPress: onToggleMenu,
  };

  useEffect(() => {
    setShowActions(false);
  }, [isSmallScreen]);

  useEffect(() => {
    const slideLeft = Animated.timing(translateX, { toValue: -100, duration: 300, useNativeDriver: false });
    const slideRight = Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: false });

    if (showActions) {
      slideRight.stop();
      slideLeft.start();
    } else {
      slideLeft.stop();
      slideRight.start();
    }
  }, [translateX, showActions]);

  return (
    <Pressable
      {...(isSmallScreen && handlers)}
      {...smallScreenHandlers}
      borderTopColor="blueGray.300"
      borderTopWidth="1"
      borderTopStyle="dotted"
    >
      <Box bgColor="warmGray.700" overflowX="hidden">
        <Animated.View style={{ transform: [{ translateX }] }}>
          <HStack alignItems="center" px="4" py="2.5" space="4" bgColor="white">
            {!isSmallScreen && <Checkbox value={id} accessibilityLabel={name} />}
            <Text flexGrow="1" fontSize="xs" fontWeight="medium" color="muted.600">
              {name}
            </Text>
            {!isSmallScreen && (
              <HStack justifyContent="flex-end" flexBasis="15%" alignItems="center" space="1">
                <Text>&pound;</Text>
                <Input width="full" maxW="24" placeholder="0.00" textAlign="right" />
              </HStack>
            )}
            <Text textAlign="right" flexBasis="15%" fontSize="xs" fontWeight="medium" color="muted.600">
              -&pound;600
            </Text>
            <Box alignItems="flex-end" flexBasis="15%" width="0">
              <Badge variant="outline" colorScheme="success">
                &pound;500
              </Badge>
            </Box>
          </HStack>
        </Animated.View>
        {showActions && <SwipeableActions />}
      </Box>
    </Pressable>
  );
};
