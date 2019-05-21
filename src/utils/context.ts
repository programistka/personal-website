import React from 'react';
import Cookies from 'js-cookie';

export enum ThemeEnum {
    light = 'light',
    dark = 'dark',
}

export type ThemeType = ThemeEnum.light | ThemeEnum.dark;

interface ContextValue {
    theme: ThemeType;
    toggleTheme: () => null;
}

export const ThemeContext = React.createContext<ContextValue>({
    theme: (Cookies.get('theme') as ThemeEnum) || ThemeEnum.dark,
    toggleTheme: () => null,
});

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
