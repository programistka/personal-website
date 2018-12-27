import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/common';
import BlogCard from './BlogCard';

type BlogListComponentProps = {
    posts: any[];
};

const BlogList = styled.div`
    display: flex;
    flex-direction: column;

    ${media.large`
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    `};
`;

const BlogListComponent = ({ posts }: BlogListComponentProps) => {
    return (
        <BlogList>
            {posts.map(({ node: post }) => (
                <BlogCard post={post} />
            ))}
        </BlogList>
    );
};

export default BlogListComponent;
