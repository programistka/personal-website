import React from 'react';
import styled from 'styled-components';

import Link from './Link';
import { colors } from '../styles/common';
import { PageWrapper } from './Common';

export const footerHeight = 220;

const Footer = styled.footer`
    background-color: ${props =>
        props.theme.color === 'light'
            ? colors.backgroundSecondary_light
            : colors.backgroundSecondary_dark};
    border-top: 2px solid ${colors.border_light};
    border-color: ${props =>
        props.theme.color === 'light' ? colors.border_light : colors.border_dark};
    height: ${footerHeight}px;
`;

const ModifiedPageWrapper = styled(PageWrapper)`
    justify-content: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.span`
    font-family: 'Scope One';
    font-size: 24px;
    color: ${props =>
        props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark};
    margin-bottom: 20px;
    diplay: inline-block;
`;

const SocialMediaList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
`;

const SocialMediaListItem = styled.li`
    padding: 0 7px;
`;

const SocialMediaLink = styled(Link)``;

type FooterProps = {};

const FooterComponent = () => {
    return (
        <Footer>
            <ModifiedPageWrapper>
                <Title>Robert Cooper</Title>
                <SocialMediaList>
                    <SocialMediaListItem>
                        <SocialMediaLink to="https://www.linkedin.com/in/robert-cooper/">
                            LinkedIn
                        </SocialMediaLink>
                    </SocialMediaListItem>
                    <SocialMediaListItem>
                        <SocialMediaLink to="https://github.com/robertcoopercode">
                            Github
                        </SocialMediaLink>
                    </SocialMediaListItem>
                    <SocialMediaListItem>
                        <SocialMediaLink to="https://twitter.com/RobertCooper_RC">
                            Twitter
                        </SocialMediaLink>
                    </SocialMediaListItem>
                    <SocialMediaListItem>
                        <SocialMediaLink to="mailto:hi@robertcooper.me">Email</SocialMediaLink>
                    </SocialMediaListItem>
                </SocialMediaList>
            </ModifiedPageWrapper>
        </Footer>
    );
};

export default FooterComponent;
