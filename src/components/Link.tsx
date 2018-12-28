import GatsbyLink from 'gatsby-link';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/common';

const Link = styled.a`
    color: ${props => (props.active ? colors.link_active : colors.link_inactive)};

    &:hover {
        color: ${colors.link_active};
    }
`;

type LinkComponentProps = {
    children: React.ReactChildren;
    to: string;
    active: string;
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
