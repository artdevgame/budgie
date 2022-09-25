import { useDisclose } from 'native-base';
import { createContext, PropsWithChildren, useContext } from 'react';

interface Context {
  onClose(): void;
  onOpen(): void;
  onToggle(): void;
  isOpen: boolean;
}

const InteractiveMenuContext = createContext<Context>(null);

export const useInteractiveMenu = () => {
  const context = useContext(InteractiveMenuContext);

  if (!context) {
    throw new Error('useInteractiveMenu must be used within a <InteractiveMenuProvider />');
  }

  return context;
};

export const InteractiveMenuProvider = ({ children }: PropsWithChildren) => {
  const disclose = useDisclose();

  return <InteractiveMenuContext.Provider value={disclose}>{children}</InteractiveMenuContext.Provider>;
};
