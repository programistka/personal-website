import Img from 'gatsby-image';
import React from 'react';
import { graphql } from 'gatsby';

import styled from '../lib/styled-components';
import { Post } from '../types/Post';
import { Project as ProjectType } from '../types/Project';
import { ThemeContext, ThemeType } from '../utils/context';
import { colors, media } from '../styles/common';

import BlogList from '../components/BlogList';
import Email from '../components/icons/Email';
import Github from '../components/icons/Github';
import Layout from '../components/Layout';
import Link from '../components/Link';
import LinkedIn from '../components/icons/LinkedIn';
import Twitter from '../components/icons/Twitter';
import { Button, Divider, PageWrapper } from '../components/Common';
import { Title, fontSize } from '../components/Typography';
import { FluidImage } from '../types/Image';
import { SiteMetadata } from '../types/SiteMetaData';

const Header = styled.div`
    position: relative;
    height: 560px;
    margin-top: -60px; // height of the menu
    display: flex;
    padding: 0 20px;

    ${media.medium`
        height: unset;
        margin-top: -140px; // height of the menu
        padding-top: calc(140px + 20px);
        padding-bottom: 80px;
    `};
`;

const HeaderWrapper = styled(PageWrapper)`
    display: flex;
    height: 100%;

    ${media.medium`
        flex-direction: column;
    `};
`;

const HeaderImage = styled(Img)`
    left: 0;
    top: 0;
    width: 100vw;
    height: 560px;

    ${media.medium`
        height: 100%;
    `};

    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: ${props =>
            props.theme.color === 'light' ? colors.background_light : colors.background_dark};
        opacity: 0.5;
    }
`;

const HeadshotWrapper = styled.div`
    z-index: 1;
    align-self: flex-end;
    flex-shrink: 0;

    ${media.medium`
        align-self: center;
    `};
`;

const Headshot = styled(Img)`
    height: 460px;
    width: 460px;

    ${media.medium`
        height: 250px;
        width: 250px;
        margin-bottom: 40px;
    `};
`;

const Intro = styled.div`
    align-self: center;
    letter-spacing: 1.5px;
    margin-top: 20px;
    margin-left: 40px;
    z-index: 1;

    ${media.medium`
        margin-top: 0;
        margin-left: 0;
        text-align: center;
        width: 600px;
        max-width: 100%;
    `};
`;

const IntroTitle = styled.span`
    font-family: 'Scope One';
    font-size: ${fontSize.title.large};
    color: ${props =>
        props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark};

    ${media.medium`
        font-size: ${fontSize.title.small};
    `};
`;

const IntroDescription = styled.p`
    line-height: 1.5;
    font-size: 24px;
    color: ${props =>
        props.theme.color === 'light' ? colors.text_body_light : colors.text_body_dark};
    max-width: 100%;

    ${media.medium`
        font-size: 18px;
        margin-bottom: 30px;
    `};
`;

const SocialMedia = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0 -10px;

    ${media.medium`
        justify-content: center;
    `};

    svg {
        width: 35px;
    }
`;

const SocialMediaItem = styled.li`
    margin: 0 10px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 0;
`;

const RecentPosts = styled(Section)`
    align-items: center;
`;

const Projects = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
`;

const Project = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 360px;
    margin: 0 20px;
    margin-bottom: 60px;
`;

const ProjectTitle = styled.h3`
    font-family: 'Scope One';
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px 0;
    color: ${props =>
        props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark};
`;

const ProjectImage = styled(Img)`
    margin-bottom: 20px;
`;

const ProjectDescription = styled.p`
    text-align: center;
    font-size: 16px;
    margin: 0;
    line-height: 1.4;
`;

const SocialMediaGroup = ({ theme }: { theme: 'light' | 'dark' }): JSX.Element => {
    const iconFill = theme === 'light' ? colors.text_title_light : colors.text_title_dark;

    const items = [
        {
            link: 'https://www.linkedin.com/in/robert-cooper/',
            icon: <LinkedIn iconFill={iconFill} />,
        },
        {
            link: 'https://github.com/robertcoopercode',
            icon: <Github iconFill={iconFill} />,
        },
        {
            link: 'https://twitter.com/RobertCooper_RC',
            icon: <Twitter iconFill={iconFill} />,
        },
        {
            link: 'mailto:hi@robertcooper.me',
            icon: <Email iconFill={iconFill} />,
        },
    ];
    return (
        <SocialMedia>
            {items.map(item => (
                <SocialMediaItem key={item.link}>
                    <Link to={item.link}>{item.icon}</Link>
                </SocialMediaItem>
            ))}
        </SocialMedia>
    );
};

type HomePageProps = {
    data: {
        site: {
            siteMetadata: SiteMetadata;
        };
        homeHeader: FluidImage;
        homeHeadshot: FluidImage;
        posts: {
            edges: Post[];
        };
        projects: {
            edges: ProjectType[];
        };
    };
};

export default ({
    data: {
        site,
        homeHeader,
        homeHeadshot,
        posts: { edges: posts },
        projects: { edges: projects },
    },
}: HomePageProps) => {
    return (
        <ThemeContext.Consumer>
            {({ theme }: { theme: ThemeType }) => (
                <Layout site={site}>
                    <Header>
                        <HeaderWrapper>
                            <HeadshotWrapper data-aos="fade-right" data-aos-delay="200">
                                <Headshot
                                    fluid={homeHeadshot.childImageSharp.fluid}
                                    alt="Robert Cooper's headshot"
                                />
                            </HeadshotWrapper>
                            <Intro data-aos="fade-up">
                                <IntroTitle>I'm Robert Cooper,</IntroTitle>
                                <IntroDescription>
                                    a front end web developer that{' '}
                                    <strong>writes web development</strong> articles and works as a{' '}
                                    <strong>freelancer</strong> to clients who need front end
                                    development support.
                                </IntroDescription>
                                <SocialMediaGroup theme={theme} />
                            </Intro>
                        </HeaderWrapper>
                        <HeaderImage
                            fluid={homeHeader.childImageSharp.fluid}
                            alt={'Snowy mountains'}
                            style={{ position: 'absolute' }}
                        />
                    </Header>
                    <PageWrapper>
                        <RecentPosts>
                            <Title as="h2" data-aos="fade">
                                Recent Posts
                            </Title>
                            <BlogList posts={posts} />
                            <Button to="/blog" data-aos="fade-up">
                                See all posts
                            </Button>
                        </RecentPosts>
                        <Divider data-aos="fade" />
                        <Section>
                            <Title as="h2" data-aos="fade">
                                Recent Projects
                            </Title>
                            <Projects>
                                {projects.map(({ node: project }) => (
                                    <Project key={project.fields.id} data-aos="fade-right">
                                        <ProjectImage
                                            fixed={project.frontmatter.image.childImageSharp.fixed}
                                        />
                                        <ProjectTitle>{project.frontmatter.title}</ProjectTitle>
                                        <ProjectDescription>
                                            {project.frontmatter.description}
                                        </ProjectDescription>
                                    </Project>
                                ))}
                            </Projects>
                            <Button to="/projects" data-aos="fade-up">
                                See all projects
                            </Button>
                        </Section>
                    </PageWrapper>
                </Layout>
            )}
        </ThemeContext.Consumer>
    );
};

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                description
                author
                siteUrl
            }
        }
        homeHeader: file(name: { eq: "home-header" }) {
            childImageSharp {
                fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        homeHeadshot: file(name: { eq: "home-headshot" }) {
            childImageSharp {
                fluid(maxHeight: 460) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        posts: allMdx(
            limit: 3
            sort: { fields: frontmatter___date, order: DESC }
            filter: { fields: { slug: { ne: null } } }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        formattedDate: date(formatString: "MMMM DD, YYYY")
                        dateTimeString: date(formatString: "YYYY-MM-DD")
                        banner {
                            childImageSharp {
                                fluid(maxHeight: 340) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        slug
                        categories
                    }
                    timeToRead
                }
            }
        }
        projects: allMdx(
            limit: 3
            sort: { fields: frontmatter___date, order: DESC }
            filter: { fields: { slug: { eq: null } } }
        ) {
            edges {
                node {
                    fields {
                        id
                        slug
                    }
                    frontmatter {
                        title
                        subtitle
                        description
                        image {
                            childImageSharp {
                                fixed(width: 240) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
