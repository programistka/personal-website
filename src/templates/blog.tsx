import React from 'react';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styled from '../lib/styled-components';
import BlogList from '../components/BlogList';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { PaddedPageWrapper } from '../components/Common';
import { Title } from '../components/Typography';
import { media } from '../styles/common';
import { SiteMetadata } from '../types/SiteMetadata';
import { Post } from '../types/Post';

const StyledTitle = styled(Title)`
    margin-bottom: 100px;

    ${media.medium`
        margin-bottom: 60px;
    `};
`;

const Pagination = styled.ul`
    display: flex;
`;

const PaginationItem = styled.li<{ position: string }>`
    margin-left: ${props => (props.position === 'right' ? 'auto' : 0)};
`;

const PaginationLink = styled(Link)``;

type BlogProps = {
    data: {
        site: {
            siteMetadata: SiteMetadata;
        };
        allMdx: {
            edges: Post[];
        };
    };
    pageContext: {
        pagination: {
            page: string[];
            nextPagePath: string;
            previousPagePath: string;
        };
    };
};

const Blog = ({ data: { site, allMdx }, pageContext: { pagination } }: BlogProps) => {
    const { page, nextPagePath, previousPagePath } = pagination;

    const posts = page.map(id => allMdx.edges.find(post => post.node.id === id));

    return (
        <Layout site={site} title="Robert Cooper | Blog">
            <PaddedPageWrapper>
                <Fade top>
                    <StyledTitle>Blog</StyledTitle>
                </Fade>
                <BlogList posts={posts} />
                <Pagination>
                    {nextPagePath && (
                        <PaginationItem position="left">
                            <PaginationLink to={nextPagePath}>Newer Posts</PaginationLink>
                        </PaginationItem>
                    )}

                    {previousPagePath && (
                        <PaginationItem position="right">
                            <PaginationLink to={previousPagePath}>Older Posts</PaginationLink>
                        </PaginationItem>
                    )}
                </Pagination>
            </PaddedPageWrapper>
        </Layout>
    );
};

export default Blog;

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
        allMdx {
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
    }
`;
