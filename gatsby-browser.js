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
import Cookies from 'js-cookie';

import { ThemeContext } from './src/utils/context'

const ThemeWrapperComponent = ({children}) => {
    const [theme, setTheme] = useState(Cookies.get('theme') || 'dark');

    const toggleTheme = () => {
        const newThemeValue = theme === 'light' ? 'dark' : 'light';
        setTheme(newThemeValue);
        Cookies.set('theme', newThemeValue);
        AOS.init({
            once: true,
        });
    };

    useEffect(() => {
        if (Cookies.get('theme')) {
            setTheme(Cookies.get('theme'));
        } else {
            Cookies.set('theme', theme);
        }
        if (typeof window !== `undefined`) {
            AOS.init({
                once: true,
            });
        }
    }, [theme]);

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