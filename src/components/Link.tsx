import GatsbyLink from 'gatsby-link';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/common';

const Link = styled.a`
    color: ${props => {
        if (props.active === 'true') {
            if (props.theme.color === 'light') {
                return colors.link_active_light;
            } else {
                return colors.link_active_dark;
            }
        } else {
            if (props.theme.color === 'light') {
                return colors.link_inactive_light;
            } else {
                return colors.link_inactive_dark;
            }
        }
    }};

    &:hover {
        color: ${props => (props.theme.color === 'light' ? colors.link_active_light : colors.link_active_dark)};
    }
`;

type LinkComponentProps = {
    children: React.ReactNode;
    to: string;
    active?: string;
};

const LinkComponent = ({ children, to, active = 'false', ...other }: LinkComponentProps) => {
    const internal = /^\/(?!\/)/.test(to);

    if (internal) {
        return (
            <Link as={GatsbyLink} to={to} active={active} {...other}>
                {children}
            </Link>
        );
    }

    return (
        <Link href={to} active={active} {...other}>
            {children}
        </Link>
    );
};

export default LinkComponent;
