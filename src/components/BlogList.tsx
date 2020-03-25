import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/common';
import { Post } from '../types/Post';
import BlogCard from './BlogCard';

const BlogList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -10px;
    > * {
        width: calc(50% - 2 * 10px);
        margin: 0 10px;
    }

    ${media.large`
        flex-direction: column;
        justify-content: center;
        margin: unset;
        > * {
            margin: unset;
            width: 100%;
        }
    `};
`;

type BlogListComponentProps = {
    posts: (Post | undefined)[];
};

const BlogListComponent = ({ posts }: BlogListComponentProps) => {
    return (
        <BlogList>
            {posts.map(post => {
                if (post !== undefined) {
                    return <BlogCard key={post.node.id} post={post.node} />;
                }
            })}
        </BlogList>
    );
};

export default BlogListComponent;
