import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import Link from './Link';
import { colors, media } from '../styles/common';
import { fontSize } from './Typography';

type BlogCardProps = {};

const Post = styled.section`
    width: calc(100% - 40px);
    background-color: ${colors.post_background_light};
    height: 340px;
    margin: 0 20px 80px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 125ms ease-in-out;

    ${media.large`
        height: 500px;
        margin: 0 20px 60px;
        flex-basis: 400px;
        flex-grow: 1;
        max-width: 500px;
    `};

    &:hover {
        box-shadow: 0 4px 16px 2px rgba(0, 0, 0, 0.1);
    }
`;

const PostLink = styled(Link)`
    display: flex;
    text-decoration: none;
    height: 100%;

    ${media.large`
        flex-direction: column-reverse;
    `};
`;

const PostDescription = styled.div`
    padding: 25px;
    color: ${colors.text_dark};
    width: 50%;
    height: 100%;

    ${media.large`
        padding-top: 15px;
        width: 100%;
    `};
`;

const PostTitle = styled.h3`
    font-family: 'Scope One';
    font-weight: 400;
    font-size: 28px;
    margin-top: 25px;
    margin-bottom: 0;
    color: ${colors.text_title};

    ${media.large`
        font-size: 24px
    `};
`;

const PostDate = styled.time`
    font-size: 14px;
`;

const PostExcerpt = styled.p`
    font-size: ${fontSize.body.large};
    letter-spacing: 0.2px;
    line-height: 1.5;

    ${media.large`
        font-size: ${fontSize.body.small};
    `};
`;

const PostImage = styled(Img)`
    flex-shrink: 0;
    width: 50%;

    ${media.large`
        height: 250px;
        width: 100%;
    `};
`;

const BlogCard = React.forwardRef(({ post }, ref) => {
    return (
        <Post key={post.id} ref={ref}>
            <PostLink to={post.frontmatter.slug}>
                <PostDescription>
                    <PostTitle>{post.frontmatter.title}</PostTitle>
                    <PostDate dateTime={post.frontmatter.dateTimeString}>
                        {post.frontmatter.formattedDate}
                    </PostDate>
                    <PostExcerpt>{post.frontmatter.description}</PostExcerpt>
                </PostDescription>
                {post.frontmatter.banner && (
                    <PostImage fluid={post.frontmatter.banner.childImageSharp.fluid} />
                )}
            </PostLink>
        </Post>
    );
});

export default BlogCard;
