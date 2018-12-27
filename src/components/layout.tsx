import '../styles/prismjs.css';
import Helmet from 'react-helmet';
import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MDXProvider } from '@mdx-js/tag';
import { graphql } from 'gatsby';

import Montserrat from '../../assets/fonts/Montserrat/Montserrat-Regular.ttf';
import ScopeOne from '../../assets/fonts/Scope_One/ScopeOne-Regular.ttf';

import mdxComponents from './mdx';
import { colors } from '../styles/common';

import Footer from './Footer';
import Menu from './Menu';

// tslint:disable:no-unused-expression
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

  // @ts-ignore
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

  /* .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  } */
`;
// tslint:enable:no-unused-expression

const Main = styled.main``;

export default ({ site, frontmatter = { description: 'test' }, children }) => {
    const { title, description: siteDescription, keywords: siteKeywords } = site.siteMetadata;

    const { description: frontmatterDescription } = frontmatter;

    const keywords = siteKeywords.join(', ');
    const description = frontmatterDescription || siteDescription;

    return (
        <Fragment>
            <GlobalStyles />
            <Helmet
                title={title}
                meta={[
                    { name: 'description', content: description },
                    { name: 'keywords', content: keywords },
                ]}
            >
                <html lang="en" />
            </Helmet>
            <MDXProvider components={mdxComponents}>
                <Menu />
                <Main>{children}</Main>
                <Footer />
            </MDXProvider>
        </Fragment>
    );
};

// export const pageQuery = graphql`
//     fragment site on Site {
//         siteMetadata {
//             title
//             description
//             author
//             keywords
//         }
//     }
// `;
