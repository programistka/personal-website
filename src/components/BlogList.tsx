import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

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

const AnimatedBlogList = posed(BlogList)({
    enter: { y: 0, opacity: 1, staggerChildren: 200 },
    exit: { y: 50, opacity: 0 },
});

const AnimatedBlogCard = posed(BlogCard)({
    enter: { opacity: 1 },
    exit: { opacity: 0 },
});

const BlogListComponent = ({ posts }: BlogListComponentProps) => {
    return (
        <AnimatedBlogList>
            {posts.map(({ node: post }) => (
                <AnimatedBlogCard post={post} />
            ))}
        </AnimatedBlogList>
    );
};

export default BlogListComponent;
