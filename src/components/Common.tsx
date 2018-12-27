import styled from 'styled-components';
import Link from './Link';

import { colors, media } from '../styles/common';
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
    margin: 40px;
`;

export const Button = styled(Link)`
    height: 40px;
    line-height: 37px;
    padding: 0 20px;
    background-color: ${colors.background_dark};
    color: ${colors.text_light};
    font-size: ${fontSize.body.large};
    display: inline-block;
    border: 2px solid ${colors.background_dark};
    text-decoration: none;
    transition: all 125ms ease-in-out;

    ${media.small`
        font-size: ${fontSize.body.small}
    `};

    &:hover {
        text-decoration: none;
        color: ${colors.text_dark};
        background: none;
    }
`;
