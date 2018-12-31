import React from 'react';
import styled from 'styled-components';
import { Location } from '@reach/router';

import Link from './Link';
import { PageWrapper } from './Common';
import { colors, media } from '../styles/common';
import { fontSize } from './Typography';
import ThemeSwitch from './ThemeSwitch';

export const menuHeight = 60;

const Menu = styled.div`
    position: relative;
    z-index: 1;
    height: ${menuHeight}px;
    padding: 0 20px;
    background-color: ${props =>
        props.theme.color === 'light'
            ? colors.backgroundSecondary_light
            : colors.backgroundSecondary_dark};

    border-bottom: 2px solid ${colors.border_light};
    border-color: ${props =>
        props.theme.color === 'light' ? colors.border_light : colors.border_dark};

    ${media.small`
        height: 180px;
    `};
`;

const ModifiedPageWrapper = styled(PageWrapper)`
    display: flex;
    align-items: center;
    height: 100%;

    ${media.small`
        flex-direction: column;
        justify-content: center;
    `};
`;

const MenuTitle = styled.span`
    font-family: 'Scope One';
    font-weight: 400;
    font-size: 24px;
    margin: 0 auto 0 0;
    color: ${props =>
        props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark};

    ${media.small`
        margin: 0 0 20px 0;
        font-size: 28px;
    `};
`;

const Nav = styled.nav``;

const NavList = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;

    ${media.small`
        margin-right: 0;
    `};
`;

const NavListItem = styled.li`
    padding: 0 35px;
    font-size: ${fontSize.body.large};

    ${media.small`
        font-size: ${fontSize.body.small};
    `};

    &:first-child {
        padding-left: 0;
    }

    &:last-child {
        padding-right: 0;
    }
`;

const NavLink = styled(Link)`
    text-decoration: none;
`;

const ModifiedThemeSwitch = styled(ThemeSwitch)`
    margin-left: 40px;

    ${media.small`
        margin-left: 0;
        margin-top: 20px;
    `};
`;

// tslint:disable-next-line prettier
const NAVIGATION = [
  { to: '/projects/', label: 'projects' },
  { to: '/blog/', label: 'blog' },
];

const MenuTitleComponent = ({ location, children }) => {
    if (location.pathname === '/') {
        return <MenuTitle as="h1" children={children} />;
    } else {
        return <MenuTitle children={children} />;
    }
};

type MenuComponentProps = {
    theme: 'light' | 'dark';
    toggleTheme: (event: Event) => null;
};

const MenuComponent = props => {
    return (
        <Menu>
            <Location>
                {({ location }) => (
                    <ModifiedPageWrapper>
                        <MenuTitleComponent location={location}>
                            <NavLink to="/" style={{ color: 'inherit' }}>
                                Robert Cooper
                            </NavLink>
                        </MenuTitleComponent>
                        <Nav>
                            <NavList>
                                {NAVIGATION.map(navigation => (
                                    <NavListItem key={navigation.label}>
                                        <NavLink
                                            to={navigation.to}
                                            active={(
                                                navigation.to === location.pathname
                                            ).toString()}
                                        >
                                            {navigation.label}
                                        </NavLink>
                                    </NavListItem>
                                ))}
                            </NavList>
                        </Nav>
                        <ModifiedThemeSwitch theme={props.theme} onChange={props.toggleTheme} />
                    </ModifiedPageWrapper>
                )}
            </Location>
        </Menu>
    );
};

export default MenuComponent;
