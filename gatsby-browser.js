import React, { useState, useEffect } from 'react';
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
import { ThemeContext } from './src/utils/context';

/**
 * Wrapper component that provides the theme and theme updater function to the entire app
 * @param {Object} props - Component props
 * @param {ReactNode} props.children
 * @returns
 */
// eslint-disable-next-line react/prop-types
const ThemeWrapperComponent = ({ children }) => {
    // Set the default theme state to the value stored in the user's cookie and fallback
    // to 'dark' if no cookie is found
    const [theme, setTheme] = useState(Cookies.get('theme') || 'dark');

    /**
     * Toggle between light and dark themes and set the current theme
     * value as a cookie. Also need to re-initialize the animate on scroll
     * module to ensure elements don't disappear.
     * @returns {void}
     */
    const toggleTheme = () => {
        const newThemeValue = theme === 'light' ? 'dark' : 'light';
        setTheme(newThemeValue);
        Cookies.set('theme', newThemeValue);
    };

    useEffect(() => {
        if (Cookies.get('theme')) {
            setTheme(Cookies.get('theme'));
        } else {
            Cookies.set('theme', theme);
        }
        if (typeof window !== `undefined`) {
            // Reloads the disqus embed so that it can recalculate which color theme it should
            // display based on the text color the embed inherits (see https://help.disqus.com/installation/disqus-appearance-tweaks for more details)
            // TODO: Only run this command on pages that have the disqus embed
            if (window.DISQUS) {
                // Using a timeout since the reset function needs to run only after the page's CSS color settings
                // have changed
                setTimeout(() => {
                    window.DISQUS.reset({ reload: true });
                }, 1000);
            }
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
    );
};

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => <ThemeWrapperComponent>{element}</ThemeWrapperComponent>;
