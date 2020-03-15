import Img from 'gatsby-image';
import React from 'react';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import BlogList from '../components/BlogList';
import Github from '../components/icons/Github';
import Layout from '../components/Layout';
import { Link } from '../components/Link';
import Twitter from '../components/icons/Twitter';
import { Button, Divider, PageWrapper } from '../components/Common';
import { FluidImage } from '../types/Image';
import { Post } from '../types/Post';
import { Project as ProjectType } from '../types/Project';
import { useTheme } from '../utils/context';
import { Title } from '../components/Typography';
import { colors, media, textSize, textColor, transitionDuration } from '../styles/common';
import Newsletter from '../components/Newsletter';

const Header = styled.div`
    position: relative;
    height: 560px;
    margin-top: -60px; /* height of the menu */
    display: flex;
    padding: 0 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(128, 178, 237, 0.2)' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

    ${media.medium`
        height: unset;
        margin-top: -140px; /* height of the menu */
        padding-top: calc(140px + 20px);
        padding-bottom: 80px;
    `};
`;

const StyledPageWrapper = styled(PageWrapper)`
    padding: 40px 0;
`;

const HeaderWrapper = styled(PageWrapper)`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

const IntroTitle = styled.h1`
    ${textSize.xlarge};
    ${textColor.title};
    margin: 0;
    margin-bottom: 10px;
`;

const IntroDescription = styled.p`
    ${textSize.large};
    ${textColor.body};
    margin-top: 0;
    margin-bottom: 30px;
`;

const SocialMedia = styled.ul`
    display: flex;
    align-items: center;
    margin: 0 -10px;
    padding: 0;
    justify-content: center;

    svg {
        width: 35px;
        display: flex;
    }
`;

const SocialMediaItem = styled.li`
    margin: 0 10px;

    &:before {
        content: '';
    }
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px;
`;

const RecentPosts = styled(Section)`
    align-items: center;
`;

const Projects = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    justify-content: center;
`;

const ProjectWrapper = styled.div`
    flex-basis: 360px;
    max-width: 100%;
`;

const LinkedProject = styled(Link)`
    text-decoration: none;
    color: inherit;
    transition: all ease-in-out ${transitionDuration.slow};
    display: block;

    &:hover {
        transform: scale(1.02);
        color: inherit;
    }
`;

const Project = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-bottom: 60px;
`;

const ProjectTitle = styled.h3`
    ${textColor.title};
    ${textSize.large};
    font-family: 'Inter';
    margin: 0 0 10px 0;
`;

const ProjectImage = styled(Img)`
    margin-bottom: 20px;
    width: 240px;
    max-width: 100%;
`;

const ProjectDescription = styled.p`
    ${textSize.normal};
    text-align: center;
    margin: 0;
`;

const StyledTitle = styled(Title)`
    margin-bottom: 100px;

    ${media.medium`
        margin-bottom: 60px;
    `};
`;

const SocialMediaGroup = (): JSX.Element => {
    const { theme } = useTheme();
    const iconFill = theme === 'light' ? colors.textTitleLight : colors.textTitleDark;
    const items = [
        {
            link: 'https://github.com/robertcoopercode',
            icon: <Github iconFill={iconFill} />,
        },
        {
            link: 'https://twitter.com/RobertCooper_RC',
            icon: <Twitter iconFill={iconFill} />,
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

const WrappedProject = ({
    projectPageLink,
    children,
}: {
    projectPageLink: string | undefined;
    children: React.ReactNode;
}) => {
    if (projectPageLink) {
        return (<LinkedProject to={`${projectPageLink}`}>{children}</LinkedProject>) as any;
    } else {
        return children;
    }
};

export const Home = ({
    data: {
        homeHeader,
        homeHeadshot,
        posts: { edges: posts },
        projects: { edges: projects },
    },
}: HomePageProps) => {
    return (
        <Layout>
            <Header>
                <HeaderWrapper>
                    <IntroTitle>Robert Cooper</IntroTitle>
                    <IntroDescription>Web Developer</IntroDescription>
                    <SocialMediaGroup />
                </HeaderWrapper>
            </Header>
            <StyledPageWrapper>
                <RecentPosts>
                    <Fade top>
                        <StyledTitle as="h2">Recent Posts</StyledTitle>
                    </Fade>
                    <BlogList posts={posts} />
                    <Fade bottom>
                        <Button to="/blog">See all posts</Button>
                    </Fade>
                </RecentPosts>
                <Fade>
                    <Divider />
                </Fade>
                <Section>
                    <Fade top>
                        <StyledTitle as="h2">Recent Projects</StyledTitle>
                    </Fade>
                    <Projects>
                        {projects.map(({ node: project }) => (
                            <ProjectWrapper key={project.fields.id}>
                                <WrappedProject projectPageLink={project.frontmatter.detailsPageLink}>
                                    <Fade top>
                                        <Project>
                                            <ProjectImage fluid={project.frontmatter.image.childImageSharp.fluid} />
                                            <ProjectTitle>{project.frontmatter.title}</ProjectTitle>
                                            <ProjectDescription>{project.frontmatter.description}</ProjectDescription>
                                        </Project>
                                    </Fade>
                                </WrappedProject>
                            </ProjectWrapper>
                        ))}
                    </Projects>
                    <Fade bottom>
                        <Button to="/projects">See all projects</Button>
                    </Fade>
                </Section>
                <Fade>
                    <Divider />
                </Fade>
                <Section>
                    <Newsletter />
                </Section>
            </StyledPageWrapper>
        </Layout>
    );
};

export default Home;

export const pageQuery = graphql`
    query {
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
                                fluid(maxHeight: 340, quality: 100) {
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
                        detailsPageLink
                        image {
                            childImageSharp {
                                fluid(maxWidth: 240) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
