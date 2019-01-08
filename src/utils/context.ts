import React from 'react';

// TODO: Figure out how to hook up types into Context
// Reference: https://github.com/sw-yx/react-typescript-cheatsheet#context
interface ProviderStore {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext({
    theme: 'dark',
    toggleTheme: () => null,
} as ProviderStore);

export interface Theme {
    color: string;
}
