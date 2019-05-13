import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { colors, media, transitionDuration, textColor, textSize } from '../styles/common';
import { Post as PostType } from '../types/Post';
import Link from './Link';

const Post = styled.section`
    width: calc(100% - 40px);
    background-color: ${props =>
        props.theme.color === 'light' ? colors.backgroundSecondaryLight : colors.backgroundSecondaryDark};
    height: 340px;
    margin: 0 20px 80px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all ease-in-out ${transitionDuration.slow};

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
    ${textColor.body};
    padding: 25px;
    width: 50%;
    height: 100%;

    ${media.large`
        padding-top: 15px;
        width: 100%;
    `};
`;

const PostTitle = styled.h3`
    ${textColor.title};
    font-weight: 400;
    line-height: 1.5;
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 5px;

    ${media.medium`
        font-size: 24px;
    `};
`;

const MetaInfo = styled.div`
    ${textSize.small};
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
    ${textSize.normal};
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
        <Fade bottom key={post.id}>
            <Post>
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
                    {post.frontmatter.banner && <PostImage fluid={post.frontmatter.banner.childImageSharp.fluid} />}
                </PostLink>
            </Post>
        </Fade>
    );
};

export default BlogCard;
