import React, { ReactElement } from 'react';

import { IButtonGroup } from '../../Elements/ButtonGroups/ButtonGroup';
import { Divider } from './Divider';

export type ToolbarDividerProps = {
  children: ReactElement<IButtonGroup>;
};

export const ToolbarDivider = ({ children }: ToolbarDividerProps): ReactElement => <Divider>{children}</Divider>;
