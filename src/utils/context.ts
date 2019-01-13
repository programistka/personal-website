import React from 'react';

enum ThemeEnum {
    light = 'light',
    dark = 'dark',
}

export type ThemeType = ThemeEnum.light | ThemeEnum.dark;

// TODO: Figure out how to hook up types into Context
// Reference: https://github.com/sw-yx/react-typescript-cheatsheet#context
interface ProviderStore {
    theme: ThemeType;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext({
    theme: 'dark',
    toggleTheme: () => null,
} as ProviderStore);

export interface Theme {
    color: string;
}
