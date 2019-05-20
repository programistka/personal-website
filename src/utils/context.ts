import React from 'react';

export enum ThemeEnum {
    light = 'light',
    dark = 'dark',
}

export type ThemeType = ThemeEnum.light | ThemeEnum.dark;

interface ContextValue {
    theme: ThemeType;
    toggleTheme: () => null;
}

const ThemeContext = React.createContext<ContextValue | undefined>(undefined);

export const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be within a ThemeContext');
    }
    return context;
};

export interface Theme {
    color: string;
}
