import { observer } from 'mobx-react';
import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Toolbar } from '../Toolbar';
import { ipcRenderer } from 'electron';
import { Info, Icon, Handle } from './style';
import { Style } from '~/renderer/app/style';
import store from '../../store';
import console = require('console');

const GlobalStyle = createGlobalStyle`${Style}`;

window.onbeforeunload = () => {
  ipcRenderer.send('browserview-clear');
};

export const App = observer(() => {
  return (
    <ThemeProvider
      theme={{
        dark: store.isDark,
        background: store.background,
        foreground: store.foreground,
      }}
    >
      <React.Fragment>
        <GlobalStyle />
        <Handle />
        <Toolbar />
        <Info visible={store.tabsStore.tabs.length === 0}>
          <Icon /> Drop windows here, ya dick
        </Info>
      </React.Fragment>
    </ThemeProvider>
  );
});
