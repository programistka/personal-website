import React, { useState, useEffect } from 'react';
import { ContextThemeProvider, useTheme } from './src/utils/context';
import { ThemeProvider } from './src/lib/styled-components';
require('./src/styles/prismjs.css');
/**
 * Show outline only on keyboard interaction
 *
 * Adds 'js-focus-visible' class to body and 'focus-visible' class to focused element
 *
 * https://github.com/WICG/focus-visible
 * https://davidwalsh.name/css-focus
 */
// import 'focus-visible';

const Wrapper = ({ children }) => {
    const { theme } = useTheme();

    return <ThemeProvider theme={{ color: theme }}>{children}</ThemeProvider>;
};

export const wrapRootElement = ({ element }) => {
    return (
        <ContextThemeProvider>
            <Wrapper>{element}</Wrapper>
        </ContextThemeProvider>
    );
};
