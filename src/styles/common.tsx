import { css } from 'styled-components';

export const colors = {
    text_title: '#03256C',
    text_light: '#EAEAEA',
    text_dark: '#2C3137',

    link_inactive: '#2E74C9',
    link_active: '#03256C',

    background_light: '#F9FCFF',
    background_dark: '#03256C',

    footer: '#fff',

    border_light: `rgba(46, 116, 201, 0.2)`,

    post_background_light: '#fff',
};

const sizes = {
    large: 1200,
    medium: 992,
    small: 576,
};

// Iterate through the sizes and create a media template
export const media: any = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) =>
        css`
            @media (max-width: ${sizes[label]}px) {
                ${css(...args)};
            }
        `;

    return acc;
}, {});
