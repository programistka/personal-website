import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { Title } from '../components/Typography';
import { PaddedPageWrapper } from '../components/Common';

export const PageNotFound = () => (
    <Layout>
        <PaddedPageWrapper>
            <Title>Page Not Found</Title>
        </PaddedPageWrapper>
    </Layout>
);

export default PageNotFound;
