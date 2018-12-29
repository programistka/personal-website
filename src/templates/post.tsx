import Img from 'gatsby-image';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import React from 'react';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import ScrollProgress from '../utils/scrollProgress';

import Layout from '../components/Layout';
import Link from '../components/Link';
import { media, colors } from '../styles/common';
import styled from 'styled-components';
import { PageWrapper, Divider } from '../components/Common';
import { Title } from '../components/Typography';

const ModifiedPageWrapper = styled(PageWrapper)`
    width: 800px;
    padding: 80px 20px;

    ${media.small`
        padding: 40px 20px;
    `};

    .caption {
        font-weight: 400;
        font-style: italic;
        text-align: center;
        display: block;
        margin-top: -25px;
        margin-bottom: 40px;

        + h2,
        + h3,
        + h4,
        + h5 {
            margin-top: 0;
        }
    }

    hr {
        + h2,
        + h3,
        + h4,
        + h5 {
            margin-top: 0px;
        }
    }

    h2,
    h3,
    h4,
    h5 {
        + iframe {
            margin-top: 20px;
        }
    }

    img {
        max-width: 100%;
    }

    iframe {
        margin: 40px 0;
    }

    code {
        font-size: 14px;
    }

    .gatsby-highlight {
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .gatsby-resp-image-wrapper {
        margin: 40px 0;
    }
`;

const PostTitle = styled(Title)`
    text-align: left;
    margin: 0;

    ${media.small`
        text-align: center;
        margin-bottom: 5px;
    `};
`;

const Date = styled.time`
    display: block;
    margin-bottom: 40px;

    ${media.small`
        text-align: center;
    `};
`;

const FeaturedImage = styled(Img)`
    margin-bottom: 40px;
`;

const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const CategoriesLabel = styled.span`
    font-weight: 600;
    margin-bottom: 10px;
`;

const CategoryList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const CategoryListItem = styled.li`
    padding: 0 10px;
`;

const CategoryLink = styled(Link)``;

const NextPostWrapper = styled.span`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    line-height: 1.5;
    max-width: 50%;
`;

const PreviousPostWrapper = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
    line-height: 1.5;
    max-width: 50%;
`;

const PreviousPostLink = styled(Link)`
    text-align: right;
`;

const OtherPostsWrapper = styled.div`
    display: flex;
`;

const CategoryListComponent = ({ list = [] }) => (
    <CategoriesWrapper>
        <CategoriesLabel>Categories:</CategoriesLabel>
        <CategoryList>
            {list.map(category => (
                <CategoryListItem key={category}>
                    <CategoryLink to={`/categories/${category}`}>{category}</CategoryLink>
                </CategoryListItem>
            ))}
        </CategoryList>
    </CategoriesWrapper>
);

const ProgressContainer = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
    width: 100%;
    height: 10px;
`;

const ProgressBar = styled.div`
    height: 10px;
    background: ${colors.background_dark};
    width: 10%;
`;

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.progressBar = React.createRef();

        this.state = {
            progress: 0,
        };
    }

    componentDidMount() {
        this.progressObserver = new ScrollProgress((x, y) => {
            this.progressBar.current.style.width = y * 100 + '%';
        });
    }

    componentWillUnmount() {
        this.progressObserver.destroy();
    }

    render() {
        const {
            data: { site, mdx },
            pageContext: { next, prev },
        } = this.props;

        const disqusShortname = 'robertcoopercode';
        const disqusConfig = {
            identifier: mdx.id,
            title: mdx.frontmatter.title,
        };

        return (
            <Layout site={site} frontmatter={mdx.frontmatter}>
                <ProgressContainer>
                    <ProgressBar ref={this.progressBar} />
                </ProgressContainer>
                <ModifiedPageWrapper>
                    <PostTitle>{mdx.frontmatter.title}</PostTitle>
                    <Date dateTime={mdx.frontmatter.dateTimeString}>
                        {mdx.frontmatter.formattedDate}
                    </Date>

                    {mdx.frontmatter.banner && (
                        <FeaturedImage fluid={mdx.frontmatter.banner.childImageSharp.fluid} />
                    )}

                    <MDXRenderer>{mdx.code.body}</MDXRenderer>

                    <Divider />

                    <CategoryListComponent list={mdx.frontmatter.categories} />

                    {(next || prev) && (
                        <OtherPostsWrapper>
                            {prev && (
                                <NextPostWrapper>
                                    Next: <Link to={prev.fields.slug}>{prev.fields.title}</Link>
                                </NextPostWrapper>
                            )}
                            {next && (
                                <PreviousPostWrapper>
                                    Previous:{' '}
                                    <PreviousPostLink to={next.fields.slug}>
                                        {next.fields.title}
                                    </PreviousPostLink>
                                </PreviousPostWrapper>
                            )}
                        </OtherPostsWrapper>
                    )}
                    <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                </ModifiedPageWrapper>
            </Layout>
        );
    }
}

export default Post;

export const pageQuery = graphql`
    query($id: String!) {
        site {
            siteMetadata {
                title
                description
                author
                siteUrl
            }
        }
        mdx(fields: { id: { eq: $id } }) {
            id
            frontmatter {
                title
                description
                formattedDate: date(formatString: "MMMM DD, YYYY")
                dateTimeString: date(formatString: "YYYY-MM-DD")
                banner {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                slug
                categories
            }
            code {
                body
            }
        }
    }
`;
