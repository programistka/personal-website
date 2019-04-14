import React from 'react';
import { graphql } from 'gatsby';

import styled from '../lib/styled-components';
import BlogList from '../components/BlogList';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { PageWrapper } from '../components/Common';
import { Title, Description } from '../components/Typography';
import { media } from '../styles/common';
import { SiteMetadata } from '../types/SiteMetadata';
import { Post } from '../types/Post';

const Header = styled.div``;

const ModifiedDescription = styled(Description)`
    margin-bottom: 80px;

    ${media.small`
        margin-bottom: 60px;
    `};
`;

const ModifiedPageWrapper = styled(PageWrapper)`
    padding: 80px 0;

    ${media.small`
        padding: 40px 0;
    `};
`;

const Pagination = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
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
            <ModifiedPageWrapper>
                <Header data-aos="fade">
                    <Title>Blog</Title>
                    <ModifiedDescription>I write stuff about web development.</ModifiedDescription>
                </Header>
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
            </ModifiedPageWrapper>
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
