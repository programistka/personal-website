import styled from 'styled-components';
import { colors, media } from '../styles/common';

export const fontSize = {
    title: {
        large: '36px',
        small: '28px',
    },
    body: {
        large: '20px',
        small: '16px',
    },
};

export const Title = styled.h1`
    font-size: ${fontSize.title.large};
    font-weight: 400;
    text-align: center;
    line-height: 1.1;
    margin: 0 0 40px 0;
    font-family: 'Scope One', sans-serif;
    color: ${props =>
        props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark};

    ${media.small`
        margin: 0 0 20px 0;
        font-size: ${fontSize.title.small};   
    `};
`;

export const Description = styled.p`
    font-size: ${fontSize.body.large};
    margin: 0 auto 40px;
    width: 800px;
    max-width: 100%;
    text-align: center;
    line-height: 1.4;

    ${media.small`
        font-size: ${fontSize.body.small};   
    `};
`;
