import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/common';
import BlogCard from './BlogCard';
import { Post } from '../types/Post';

const BlogList = styled.div`
    display: flex;
    flex-direction: column;

    ${media.large`
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    `};
`;

type BlogListComponentProps = {
    posts: Post[];
};

const BlogListComponent = ({ posts }: BlogListComponentProps) => {
    return (
        <BlogList>
            {posts.map(({ node: post }) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </BlogList>
    );
};

export default BlogListComponent;
