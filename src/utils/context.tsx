import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export enum ThemeEnum {
    light = 'light',
    dark = 'dark',
}

interface ContextValue {
    theme: ThemeEnum;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ContextValue | undefined>({ theme: ThemeEnum.dark });

export const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be within a ThemeProvider');
    }
    return context;
};

export interface Theme {
    color: string;
}

export const ContextThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Set the default theme state to the value stored in the user's cookie and fallback
    // to 'dark' if no cookie is found
    const [theme, setTheme] = useState(ThemeEnum.dark);

    /**
     * Toggle between light and dark themes and set the current theme
     * value as a cookie. Also need to re-initialize the animate on scroll
     * module to ensure elements don't disappear.
     * @returns {void}
     */
    const toggleTheme = () => {
        const newThemeValue = theme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light;
        Cookies.set('theme', newThemeValue);
        setTheme(newThemeValue);
    };

    useEffect(() => {
        if (Cookies.get('theme') !== theme) {
            setTheme(Cookies.get('theme') as ThemeEnum);
        }
        // Reloads the disqus embed so that it can recalculate which color theme it should
        // display based on the text color the embed inherits (see https://help.disqus.com/installation/disqus-appearance-tweaks for more details)
        // TODO: Only run this command on pages that have the disqus embed
        if (typeof window !== `undefined`) {
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
