import '../styles/prismjs.css';
import Helmet from 'react-helmet';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MDXProvider } from '@mdx-js/tag';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { StaticQuery, graphql } from 'gatsby';

if (typeof window !== `undefined`) {
    AOS.init({
        once: true,
    });
}

// @ts-ignore
import Montserrat from '../../assets/fonts/Montserrat/Montserrat-Regular.ttf';
// @ts-ignore
import ScopeOne from '../../assets/fonts/Scope_One/ScopeOne-Regular.ttf';

import mdxComponents from './mdx';
import { colors } from '../styles/common';

import Footer from './Footer';
import Menu from './Menu';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url(${Montserrat});
  }

  @font-face {
    font-family: 'Scope One';
    font-weight: 400;
    src: url(${ScopeOne});
  }

  * {
      box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat';
    color: ${colors.text_dark};
    background-color: ${colors.background_light}
  }

  pre {
      margin-top: 0;
  }

  ${() => {
      /* Override PrismJS Defaults */
      return null;
  }}

  a {
      color: ${colors.link_inactive};

      &:hover {
          color: ${colors.link_active};
      }
  }
`;

const Main = styled.main``;

export default ({
    site,
    frontmatter = { title: null, description: null, banner: { publicURL: null } },
    title: pageTitle = null,
    children,
}) => {
    const { title: siteTitle, description: siteDescription, siteUrl } = site.siteMetadata;

    const {
        title: frontmatterTitle,
        description: frontmatterDescription,
        banner: { publicURL },
    } = frontmatter;

    const title = pageTitle || frontmatterTitle || siteTitle;
    const description = frontmatterDescription || siteDescription;

    return (
        <StaticQuery
            query={graphql`
                query {
                    file(name: { eq: "social-sharing" }) {
                        publicURL
                    }
                }
            `}
            render={data => (
                <>
                    <GlobalStyles />
                    <Helmet title={title}>
                        <html lang="en" />
                        <meta name="description" content={description} />

                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:site" content="@RobertCooper_RC" />

                        <meta property="og:title" content={title} />
                        <meta
                            property="og:image"
                            content={`${siteUrl}${publicURL || data.file.publicURL}`}
                        />
                        <meta property="og:description" content={description} />
                    </Helmet>
                    <Menu />
                    <MDXProvider components={mdxComponents}>
                        <Main>{children}</Main>
                    </MDXProvider>
                    <Footer />
                </>
            )}
        />
    );
};
