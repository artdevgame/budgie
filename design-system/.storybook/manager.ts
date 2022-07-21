import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import logo from './logo.png';

const theme = create({
  brandTitle: 'Budgie',
  brandUrl: 'https://github.com/artdevgame/budgie',
  brandImage: logo,
});

addons.setConfig({
  theme,
});
