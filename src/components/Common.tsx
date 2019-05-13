import styled from 'styled-components';
import { colors, media, transitionDuration, textSize } from '../styles/common';
import Link from './Link';

export const PageWrapper = styled.div`
    width: 1200px;
    max-width: 100%;
    margin: auto;
`;

export const PaddedPageWrapper = styled(PageWrapper)`
    padding: 80px 20px;

    ${media.small`
      padding: 40px 20px;
    `};
`;

export const SectionWrapper = styled(PageWrapper)`
    padding: 80px 0;

    ${media.small`
        padding: 40px 0;
    `};
`;

export const Divider = styled.hr`
    border: 1px solid ${colors.borderLight};
    border-color: ${props => (props.theme.color === 'light' ? colors.borderLight : colors.borderDark)};
    margin: 40px;
`;

export const Button = styled(Link)`
    ${textSize.normal};
    height: 40px;
    line-height: 37px;
    padding: 0 20px;
    background-color: ${props =>
        props.theme.color === 'light' ? colors.buttonInactiveBackgroundLight : colors.buttonInactiveBackgroundDark};
    color: ${props => (props.theme.color === 'light' ? colors.buttonInactiveTextLight : colors.buttonInactiveTextDark)};
    border: 2px solid ${colors.buttonInactiveBorderLight};
    border-color: ${props =>
        props.theme.color === 'light' ? colors.buttonInactiveBorderLight : colors.buttonInactiveBorderDark};
    display: inline-block;
    text-decoration: none;
    transition: all ${transitionDuration.normal} ease-in-out;

    &:hover {
        text-decoration: none;
        background-color: ${props =>
            props.theme.color === 'light' ? colors.buttonActiveBackgroundLight : colors.buttonActiveBackgroundDark};
        color: ${props => (props.theme.color === 'light' ? colors.buttonActiveTextLight : colors.buttonActiveTextDark)};
        border: 2px solid ${colors.buttonActiveBorderLight};
        border-color: ${props =>
            props.theme.color === 'light' ? colors.buttonActiveBorderLight : colors.buttonActiveBorderDark};
    }
`;
