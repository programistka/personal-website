import React from 'react';
import { graphql } from 'gatsby';
import { SiteMetadata } from '../types/SiteMetadata';
import Layout from '../components/Layout';
import { Title } from '../components/Typography';
import { PaddedPageWrapper } from '../components/Common';

type PageNotFoundProps = {
    data: {
        site: {
            siteMetadata: SiteMetadata;
        };
    };
};

export const PageNotFound = ({ data: { site } }: PageNotFoundProps) => (
    <Layout site={site}>
        <PaddedPageWrapper>
            <Title>Page Not Found</Title>
        </PaddedPageWrapper>
    </Layout>
);

export default PageNotFound;

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
