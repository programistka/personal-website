import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import BlogList from '../components/BlogList';
import Layout from '../components/Layout';
import Link from '../components/Link';
import styled from 'styled-components';
import { PageWrapper } from '../components/Common';
import { Title, Description } from '../components/Typography';
import { media } from '../styles/common';

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

const PaginationItem = styled.li`
    margin-left: ${props => (props.position === 'right' ? 'auto' : 0)};
`;

const PaginationLink = styled(Link)``;

const Categories = ({ categories }) => (
    <Fragment>
        <ul>
            {categories.map(category => (
                <li key={category}>
                    <Link to={`/categories/${category}`}>{category}</Link>
                </li>
            ))}
        </ul>
    </Fragment>
);

const Blog = ({ data: { site, allMdx }, pageContext: { pagination, categories } }) => {
    const { page, nextPagePath, previousPagePath } = pagination;

    const posts = page.map(id => allMdx.edges.find(edge => edge.node.id === id));

    return (
        <Layout site={site}>
            <ModifiedPageWrapper>
                <Title>Blog</Title>
                <ModifiedDescription>
                    I write articles related to front end web development. If you'd like me to write
                    for your publication, <Link to="mailto:hi@robertcooper.me">let's chat</Link>.
                </ModifiedDescription>
                {/* <div>
                    Browse posts by categories: <Categories categories={categories} />
                </div> */}
                <BlogList posts={posts} />
                <Pagination>
                    {nextPagePath && (
                        <PaginationItem>
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
                keywords
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
                }
            }
        }
    }
`;
