import { css } from '../lib/styled-components';

export const colors = {
    text_title_light: '#03256C',
    text_title_dark: '#80B2ED',

    text_body_light: '#2C3137',
    text_body_dark: '#EAEAEA',

    text_menu_inactive_light: 'rgba(44, 49, 55, .8)',
    text_menu_inactive_dark: '#80B2ED',
    text_menu_active_light: 'rgba(44, 49, 55, 1)',
    text_menu_active_dark: '#EAEAEA',

    link_inactive_light: '#80B2ED',
    link_active_light: '#03256C',
    link_inactive_dark: '#80B2ED',
    link_active_dark: '#EAEAEA',

    background_light: '#F9FCFF',
    backgroundSecondary_light: '#FFFFFF',
    background_dark: '#051221',
    backgroundSecondary_dark: '#09203A',

    inline_code_light: 'rgba(255, 229, 100, 0.2)',
    inline_code_dark: '#142b44',

    quote_background_light: '#cae2ff',
    quote_highlight_light: '#03256C',
    quote_background_dark: '#80B2ED',
    quote_highlight_dark: '#03256C',

    button_inactive_text_light: '#EAEAEA',
    button_inactive_border_light: '#03256C',
    button_inactive_background_light: '#03256C',
    button_inactive_text_dark: '#051221',
    button_inactive_border_dark: '#80B2ED',
    button_inactive_background_dark: '#80B2ED',

    button_active_text_light: '#03256C',
    button_active_border_light: '#03256C',
    button_active_background_light: 'rgba(0, 0, 0, 0)',
    button_active_text_dark: '#EAEAEA',
    button_active_border_dark: '#80B2ED',
    button_active_background_dark: 'rgba(0, 0, 0, 0)',

    border_light: `rgba(46, 116, 201, 0.2)`,
    border_dark: `rgba(128, 178, 237, 0.2)`,
};

type Sizes = { [index: string]: number };

const sizes: Sizes = {
    small: 576,
    medium: 992,
    large: 1200,
};

type Media = { [index: string]: any };

// TODO: fix this TypeScript error :/
// Iterate through the sizes and create a media query template
export const media: any = Object.keys(sizes).reduce((acc: Media, label) => {
    acc[label] = (...args: any) =>
        css`
            @media (max-width: ${sizes[label]}px) {
                // @ts-ignore
                ${css(...args)};
            }
        `;

    return acc;
}, {});
