import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Link from '../components/Link';
import ScrollProgress from '../utils/scrollProgress';
import { Divider, PaddedPageWrapper } from '../components/Common';
import { Title } from '../components/Typography';
import { colors, media, textSize, pageWidth } from '../styles/common';
import { PageContext } from '../types/PageContext';
import { css } from '../lib/styled-components';

const StyledPaddedPageWrapper = styled(PaddedPageWrapper)`
    ${pageWidth.small}
`;

const ProgressContainer = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
    width: 100%;
    height: 10px;
`;

const ProgressBar = styled.div`
    height: 10px;
    background: ${props => (props.theme.color === 'light' ? colors.textTitleLight : colors.textTitleDark)};
`;

const PostTitle = styled(Title)`
    text-align: left;
    margin: 0;
    margin-bottom: 5px;

    ${media.small`
        text-align: center;
    `};
`;

const Date = styled.time`
    display: block;
    margin-bottom: 40px;
    font-style: italic;

    ${media.small`
        text-align: center;
    `};
`;

const MDXContent = styled.div`
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

    code:not([class*='language-']) {
        font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
        font-size: 16px;
        border-radius: 0.3em;
        background: ${props => (props.theme.color === 'light' ? colors.inlineCodeLight : colors.inlineCodeDark)};
        padding: 0.15em 0.2em 0.05em;
        white-space: normal;

        ${media.small`
          font-size: 14px;
        `}
    }

    .gatsby-highlight {
        margin-top: 40px;
        margin-bottom: 40px;
        /* I can't get this styles to load on initial app load :( */
        /* ${props => props.theme.color === 'dark' && `border: 2px solid ${colors.borderDark}`}; */
    }

    .gatsby-resp-image-wrapper {
        margin: 40px 0;
    }

    .token-line {
        line-height: 1.8;
    }

    img {
        display: block;
        margin: 40px 0;
    }
`;

const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
`;

const CategoriesLabel = styled.span`
    font-weight: 600;
    margin-bottom: 10px;
`;

const StyledCategoryList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const CategoryListItem = styled.li`
    padding: 0 10px;
    margin: 0;

    &:before {
        content: '';
    }
`;

const PostWrapperStyles = css`
    display: flex;
    flex-direction: column;
    line-height: 1.5;
`;

const NextPostWrapper = styled.span`
    ${PostWrapperStyles};
    margin-right: 20px;
    max-width: 50%;
`;

const PreviousPostWrapper = styled.span`
    ${PostWrapperStyles};
    align-items: flex-end;
    margin-left: auto;
    max-width: 50%;
`;

const PreviousPostLink = styled(Link)`
    text-align: right;
`;

const OtherPostsWrapper = styled.div`
    display: flex;
`;

const CommentsSection = styled.div`
    margin-top: 40px;
`;

const EditPostWrapper = styled.div`
    ${textSize.small};
    display: flex;
    justify-content: flex-end;
    margin-bottom: 40px;
`;

const CategoryList = ({ list = [] }: { list?: string[] }) => (
    <CategoriesWrapper>
        <CategoriesLabel>Categories:</CategoriesLabel>
        <StyledCategoryList>
            {list.map(category => (
                <CategoryListItem key={category}>
                    <Link to={`/categories/${category}`}>{category}</Link>
                </CategoryListItem>
            ))}
        </StyledCategoryList>
    </CategoriesWrapper>
);

interface PostProps {
    data: {
        mdx: any;
    };
    pageContext: PageContext;
}

const Post = (props: PostProps) => {
    const {
        data: { mdx },
        pageContext: { next, prev },
    } = props;

    const disqusShortname = 'robertcoopercode';
    const disqusConfig = {
        identifier: mdx.id,
        title: mdx.frontmatter.title,
    };
    const { editLink } = mdx.fields;

    const progressBar = useRef({ current: { style: { width: 0 } } } as any);

    useEffect(() => {
        const progressObserver = new ScrollProgress((x, y) => {
            progressBar.current.style.width = `${y * 100}%`;
        });

        return () => progressObserver.destroy();
    });

    const postUpdatedSinceFirstPublic =
        mdx.frontmatter.formattedUpdatedAtDate !== mdx.frontmatter.formattedPublicationDate &&
        mdx.frontmatter.formattedUpdatedAtDate !== null;

    return (
        <Layout frontmatter={mdx.frontmatter}>
            <Helmet>
                <meta property="og:type" content="article" />
                <meta property="article:author" content="Robert Cooper" />
                <meta property="article:published_time" content={mdx.frontmatter.publicationDate} />
                <meta
                    property="article:modified_time"
                    content={
                        postUpdatedSinceFirstPublic ? mdx.frontmatter.updatedAtDate : mdx.frontmatter.publicationDate
                    }
                />
                {mdx.frontmatter.categories.map((category: string) => (
                    <meta key={category} property="article:tag" content={category} />
                ))}
            </Helmet>
            <ProgressContainer>
                <ProgressBar ref={progressBar} />
            </ProgressContainer>
            <StyledPaddedPageWrapper>
                <PostTitle>{mdx.frontmatter.title}</PostTitle>
                {postUpdatedSinceFirstPublic ? (
                    <Date dateTime={mdx.frontmatter.updatedAtDate}>
                        updated on {mdx.frontmatter.formattedUpdatedAtDate}
                    </Date>
                ) : (
                    <Date dateTime={mdx.frontmatter.publicationDate}>
                        published on {mdx.frontmatter.formattedPublicationDate}
                    </Date>
                )}

                <MDXContent>
                    <MDXRenderer>{mdx.code.body}</MDXRenderer>
                </MDXContent>

                <Divider />

                <EditPostWrapper>
                    See a typo?&nbsp;
                    <Link to={editLink}>Edit post on GitHub</Link>
                </EditPostWrapper>

                <CategoryList list={mdx.frontmatter.categories} />

                {(next || prev) && (
                    <OtherPostsWrapper>
                        {prev && (
                            <NextPostWrapper>
                                Next: <Link to={prev.fields.slug}>{prev.fields.title}</Link>
                            </NextPostWrapper>
                        )}
                        {next && (
                            <PreviousPostWrapper>
                                Previous: <PreviousPostLink to={next.fields.slug}>{next.fields.title}</PreviousPostLink>
                            </PreviousPostWrapper>
                        )}
                    </OtherPostsWrapper>
                )}
                <CommentsSection>
                    <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                </CommentsSection>
            </StyledPaddedPageWrapper>
        </Layout>
    );
};

export default Post;

export const pageQuery = graphql`
    query($id: String!) {
        mdx(fields: { id: { eq: $id } }) {
            id
            frontmatter {
                title
                description
                formattedPublicationDate: date(formatString: "MMMM DD, YYYY")
                publicationDate: date(formatString: "YYYY-MM-DD")
                formattedUpdatedAtDate: updatedAt(formatString: "MMMM DD, YYYY")
                updatedAtDate: updatedAt(formatString: "MMMM DD, YYYY")
                # This banner is used in the layout component
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
            fields {
                editLink
            }
            code {
                body
            }
        }
    }
`;
