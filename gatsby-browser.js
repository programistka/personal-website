import React, { useState, useEffect } from "react";
import AOS from 'aos';

/**
 * Show outline only on keyboard interaction
 *
 * Adds 'js-focus-visible' class to body and 'focus-visible' class to focused element
 *
 * https://github.com/WICG/focus-visible
 * https://davidwalsh.name/css-focus
 */
import 'focus-visible';

import { ThemeContext } from './src/utils/context';

const ThemeWrapperComponent = ({children}) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        AOS.init({
            once: true,
        });
    };

    useEffect(() => {
        if (typeof window !== `undefined`) {
            AOS.init({
                once: true,
            });
        }
    });

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const wrapRootElement = ({ element }) => {
    return (
        <ThemeWrapperComponent>
            {element}
        </ThemeWrapperComponent>
    )
  }