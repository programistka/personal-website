import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import { Post as PostType } from '../types/Post';
import { colors, media } from '../styles/common';

import Link from './Link';
import { fontSize } from './Typography';

const Post = styled.section`
    width: calc(100% - 40px);
    background-color: ${props =>
        props.theme.color === 'light'
            ? colors.backgroundSecondary_light
            : colors.backgroundSecondary_dark};
    height: 340px;
    margin: 0 20px 80px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    ${media.large`
        height: unset;
        margin: 0 20px 60px;
        flex-basis: 400px;
        flex-grow: 1;
        max-width: 500px;
    `};

    &:hover {
        transform: scale(1.02) !important;
        box-shadow: 0 4px 16px 8px rgba(0, 0, 0, 0.1);
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
    color: ${props =>
        props.theme.color === 'light' ? colors.text_body_light : colors.text_body_dark};
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
    color: ${props =>
        props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark};

    ${media.large`
        font-size: 24px;
    `};
`;

const MetaInfo = styled.div`
    font-size: 14px;
`;

const PostDate = styled.time``;

const MetaInfoSeparator = styled.span`
    display: inline-block;
    margin: 0 8px;
`;

const TimeToRead = styled.span``;

const Clock = styled.span`
    display: inline-block;
    margin-right: 5px;
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

    ${media.small`
        height: 200px;
        width: 100%;
    `};
`;

type BlogCardProps = {
    post: PostType['node'];
};

const BlogCard = ({ post }: BlogCardProps) => {
    return (
        <Post key={post.id} data-aos="fade-up">
            <PostLink to={post.frontmatter.slug}>
                <PostDescription>
                    <PostTitle>{post.frontmatter.title}</PostTitle>
                    <MetaInfo>
                        <PostDate dateTime={post.frontmatter.dateTimeString}>
                            {post.frontmatter.formattedDate}
                        </PostDate>
                        <MetaInfoSeparator>•</MetaInfoSeparator>
                        <TimeToRead>
                            <Clock>🕙</Clock>
                            {post.timeToRead} min read
                        </TimeToRead>
                    </MetaInfo>
                    <PostExcerpt>{post.frontmatter.description}</PostExcerpt>
                </PostDescription>
                {post.frontmatter.banner && (
                    <PostImage fluid={post.frontmatter.banner.childImageSharp.fluid} />
                )}
            </PostLink>
        </Post>
    );
};

export default BlogCard;
