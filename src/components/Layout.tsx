import Helmet from 'react-helmet';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { withPrefix, StaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle } from '../lib/styled-components';
import Inter from '../../assets/fonts/Inter/Inter';
import PrismJSStyles from '../styles/prismjs';
import { colors, textColor, textSize } from '../styles/common';
import mdxComponents from './mdx';
import Footer, { footerHeight } from './Footer';
import Menu, { menuHeight } from './Menu';

const GlobalStyles = createGlobalStyle`
  ${Inter};
  ${PrismJSStyles};

  * {
      box-sizing: border-box;
  }

  html, body {
    ${textSize.normal};
    ${textColor.body};
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: ${props =>
        props.theme && props.theme.color === 'light' ? colors.backgroundLight : colors.backgroundDark};
  }

  pre {
      margin-top: 0;
  }

  ${() => {
      return null;
  }}

  strong {
      font-weight: 600;
  }

  ol,
  ul {
      padding: 0;
      margin: 0;
      list-style: none;
      line-height: 1.7;
      padding-left: 15px;

      li {
          margin-bottom: 8px;
      }
  }

  ul {
      list-style: none;

      li {
          position: relative;

          &::before {
              content: '-';
              position: absolute;
              left: -20px;
          }
      }
  }

  a {
      color: ${colors.linkInactiveLight};

      &:hover {
          color: ${colors.linkActiveLight};
      }
  }

    /**
    * This will hide the focus indicator if the element receives focus via the mouse,
    * but it will still show up on keyboard focus.
    */
    .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
    }

    .caption {
        font-style: italic;
        text-align: center;
        display: block;
        margin-top: -25px;
        margin-bottom: 40px;

        + h2,
        + h3,
        + h4,
        + h5 {
            margin-top: 0;
        }
    }
`;

const Main = styled.main`
    min-height: calc(100vh - ${footerHeight}px - ${menuHeight}px);
`;

type LayoutProps = {
    children: React.ReactNode;
    frontmatter?: {
        title: string | null;
        description: string | null;
        banner: {
            publicURL: string | null;
        };
    };
    title?: string | null;
    hideMenu?: boolean;
    hideFooter?: boolean;
};

export const Layout = ({
    frontmatter = { title: null, description: null, banner: { publicURL: null } },
    title: pageTitle = null,
    hideMenu = false,
    hideFooter = false,
    children,
}: LayoutProps) => {
    return (
        <StaticQuery
            query={graphql`
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
            `}
            render={data => {
                const { title: siteTitle, description: siteDescription, siteUrl } = data.site.siteMetadata;

                const {
                    title: frontmatterTitle,
                    description: frontmatterDescription,
                    banner: { publicURL },
                } = frontmatter;

                const title = pageTitle || frontmatterTitle || siteTitle;
                const description = frontmatterDescription || siteDescription;

                return (
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
                                content={`${siteUrl}${publicURL || withPrefix('/social-sharing.jpg')}`}
                            />
                            <meta property="og:description" content={description} />
                            <meta property="og:type" content="website" />
                        </Helmet>
                        {!hideMenu && <Menu />}
                        <MDXProvider components={mdxComponents}>
                            <Main>{children}</Main>
                        </MDXProvider>
                        {!hideFooter && <Footer />}
                    </>
                );
            }}
        />
    );
};

export default Layout;
