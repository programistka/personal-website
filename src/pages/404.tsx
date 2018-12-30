import React from 'react';
import styled from 'styled-components';

import PageNotFoundVideo from '../../assets/images/page-not-found.mp4';

import Layout from '../components/Layout';
import Title from '../components/mdx/Title';

const PageContent = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RandomVideo = styled.video`
    width: 800px;
    max-width: 100%;
    padding: 0 20px;
    height: auto;
    margin: auto;
    display: block;
`;

type PageNotFoundProps = {
    data: {
        site: any;
    };
};

export default ({ data: { site } }: PageNotFoundProps) => (
    <Layout site={site}>
        <PageContent>
            <Title>Page Not Found</Title>
        </PageContent>
        <RandomVideo src={PageNotFoundVideo} autoPlay={true} loop={true} />
    </Layout>
);

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                description
                author
                siteUrl
            }
        }
    }
`;
