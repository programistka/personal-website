import styled from 'styled-components';

import { colors, media } from '../styles/common';

import Link from './Link';
import { fontSize } from './Typography';

export const PageWrapper = styled.div`
    width: 1200px;
    max-width: 100%;
    margin: auto;
`;

export const SectionWrapper = styled(PageWrapper)`
    padding: 80px 0;

    ${media.small`
        padding: 40px 0;
    `};
`;

export const Divider = styled.hr`
    border: 1px solid ${colors.border_light};
    border-color: ${props =>
        props.theme.color === 'light' ? colors.border_light : colors.border_dark};
    margin: 40px;
`;

export const Button = styled(Link)`
    height: 40px;
    line-height: 37px;
    padding: 0 20px;
    background-color: ${props =>
        props.theme.color === 'light'
            ? colors.button_inactive_background_light
            : colors.button_inactive_background_dark};
    color: ${props =>
        props.theme.color === 'light'
            ? colors.button_inactive_text_light
            : colors.button_inactive_text_dark};
    border: 2px solid ${colors.button_inactive_border_light};
    border-color: ${props =>
        props.theme.color === 'light'
            ? colors.button_inactive_border_light
            : colors.button_inactive_border_dark};
    font-size: ${fontSize.body.large};
    display: inline-block;
    text-decoration: none;
    transition: all 125ms ease-in-out;

    ${media.small`
        font-size: ${fontSize.body.small}
    `};

    &:hover {
        text-decoration: none;
        background-color: ${props =>
            props.theme.color === 'light'
                ? colors.button_active_background_light
                : colors.button_active_background_dark};
        color: ${props =>
            props.theme.color === 'light'
                ? colors.button_active_text_light
                : colors.button_active_text_dark};
        border: 2px solid ${colors.button_active_border_light};
        border-color: ${props =>
            props.theme.color === 'light'
                ? colors.button_active_border_light
                : colors.button_active_border_dark};
    }
`;
