import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Email from '../components/icons/Email';
import Github from '../components/icons/Github';
import Layout from '../components/Layout';
import Link from '../components/Link';
import LinkedIn from '../components/icons/LinkedIn';
import Twitter from '../components/icons/Twitter';
import { PageWrapper, Divider, Button } from '../components/Common';
import { Title, fontSize } from '../components/Typography';
import { colors, media } from '../styles/common';
import BlogList from '../components/BlogList';

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
    color: ${colors.text_title};

    ${media.medium`
        font-size: ${fontSize.title.small};
    `};
`;

const IntroDescription = styled.p`
    line-height: 1.5;
    font-size: 24px;
    color: ${colors.text_dark};
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
    color: ${colors.text_dark};
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

export default function Index({
    data: {
        site,
        homeHeader,
        homeHeadshot,
        posts: { edges: posts },
        projects: { edges: projects },
    },
}) {
    return (
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
                            a front end web developer that <strong>writes web development</strong>{' '}
                            related articles and also provides{' '}
                            <strong>consulting services to clients</strong> who need front end
                            development support.
                        </IntroDescription>
                        <SocialMedia>
                            <SocialMediaItem>
                                <Link to="https://www.linkedin.com/in/robert-cooper/">
                                    <LinkedIn />
                                </Link>
                            </SocialMediaItem>
                            <SocialMediaItem>
                                <Link to="https://github.com/robertcoopercode">
                                    <Github />
                                </Link>
                            </SocialMediaItem>
                            <SocialMediaItem>
                                <Link to="https://twitter.com/RobertCooper_RC">
                                    <Twitter />
                                </Link>
                            </SocialMediaItem>
                            <SocialMediaItem>
                                <Link to="mailto:hi@robertcooper.me">
                                    <Email />
                                </Link>
                            </SocialMediaItem>
                        </SocialMedia>
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
                    <Button to="/blog">See all posts</Button>
                </RecentPosts>
                <Divider />
                <Section>
                    <Title as="h2">Recent Projects</Title>
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
                    <Button to="/projects">See all projects</Button>
                </Section>
            </PageWrapper>
        </Layout>
    );
}

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
