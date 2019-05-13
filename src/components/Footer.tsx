import React from 'react';
import styled from 'styled-components';
import { colors, textColor, textSize } from '../styles/common';
import Link from './Link';
import { PageWrapper } from './Common';

export const footerHeight = 220;

const Footer = styled.footer`
    background-color: ${props =>
        props.theme.color === 'light' ? colors.backgroundSecondaryLight : colors.backgroundSecondaryDark};
    border-top: 2px solid ${colors.borderLight};
    border-color: ${props => (props.theme.color === 'light' ? colors.borderLight : colors.borderDark)};
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
    ${textColor.title};
    ${textSize.large};
    text-transform: uppercase;
    margin-bottom: 20px;
    display: inline-block;
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

const FooterComponent = ({  }: FooterProps) => {
    return (
        <Footer>
            <ModifiedPageWrapper>
                <Title>Robert Cooper</Title>
                <SocialMediaList>
                    <SocialMediaListItem>
                        <SocialMediaLink to="https://github.com/robertcoopercode">Github</SocialMediaLink>
                    </SocialMediaListItem>
                    <SocialMediaListItem>
                        <SocialMediaLink to="https://twitter.com/RobertCooper_RC">Twitter</SocialMediaLink>
                    </SocialMediaListItem>
                    <SocialMediaListItem>
                        <SocialMediaLink to="mailto:hi@robertcooper.me">Email</SocialMediaLink>
                    </SocialMediaListItem>
                    <SocialMediaListItem>
                        <SocialMediaLink to="https://www.robertcooper.me/rss.xml">RSS</SocialMediaLink>
                    </SocialMediaListItem>
                </SocialMediaList>
            </ModifiedPageWrapper>
        </Footer>
    );
};

export default FooterComponent;
