import { css } from '../lib/styled-components';

export const colors = {
    textTitleLight: '#03256C',
    textTitleDark: '#80B2ED',

    textBodyLight: '#2C3137',
    textBodyDark: '#EAEAEA',

    linkInactiveLight: '#80B2ED',
    linkActiveLight: '#03256C',
    linkInactiveDark: '#80B2ED',
    linkActiveDark: '#EAEAEA',

    backgroundLight: '#F9FCFF',
    backgroundDark: '#051221',
    backgroundSecondaryLight: '#FFFFFF',
    backgroundSecondaryDark: '#09203A',

    inlineCodeLight: 'rgba(255, 229, 100, 0.2)',
    inlineCodeDark: '#142b44',

    quoteHighlightLight: '#03256C',
    quoteHighlightDark: '#03256C',
    quoteBackgroundLight: '#cae2ff',
    quoteBackgroundDark: '#80B2ED',

    buttonInactiveTextLight: '#EAEAEA',
    buttonInactiveTextDark: '#051221',
    buttonInactiveBorderLight: '#03256C',
    buttonInactiveBorderDark: '#80B2ED',
    buttonInactiveBackgroundLight: '#03256C',
    buttonInactiveBackgroundDark: '#80B2ED',

    buttonActiveTextLight: '#03256C',
    buttonActiveTextDark: '#EAEAEA',
    buttonActiveBorderLight: '#03256C',
    buttonActiveBorderDark: '#80B2ED',
    buttonActiveBackgroundLight: 'rgba(0, 0, 0, 0)',
    buttonActiveBackgroundDark: 'rgba(0, 0, 0, 0)',

    borderLight: `rgba(46, 116, 201, 0.2)`,
    borderDark: `rgba(128, 178, 237, 0.2)`,

    inputBorderLight: `rgba(46, 116, 201, 0.2)`,
    inputBorderDark: `rgba(128, 178, 237, 0.2)`,
};

type Sizes = { [index: string]: number };

const sizes: Sizes = {
    small: 576,
    medium: 992,
    large: 1200,
};

export const pageWidth = {
    small: css`
        width: 800px;
    `,
    large: css`
        width: 1200px;
    `,
};

export const transitionDuration = {
    slow: '0.2s',
    normal: '0.125s',
    fast: '0.0.1s',
};

type Media = { [index: string]: any };

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

export const textSize = {
    small: css`
        font-size: 1.4rem;
    `,
    normal: css`
        font-size: 1.8rem;
        line-height: 1.8;
        font-weight: 400;

        ${media.small`
            font-size: 1.6rem;
        `};
    `,
    large: css`
        line-height: 1.5;
        font-size: 2.4rem;
        font-weight: 400;

        ${media.small`
            font-size: 2rem;
        `};
    `,
    xlarge: css`
        font-size: 3.6rem;
        font-weight: 400;
        line-height: 1.4;

        ${media.small`
          font-size: 2.8rem;
        `};
    `,
};

export const textColor = {
    body: css`
        color: ${props => (props.theme && props.theme.color === 'light' ? colors.textBodyLight : colors.textBodyDark)};
    `,
    title: css`
        color: ${props =>
            props.theme && props.theme.color === 'light' ? colors.textTitleLight : colors.textTitleDark};
    `,
};
