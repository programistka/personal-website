import 'aos/dist/aos.css';
import Helmet from 'react-helmet';
import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MDXProvider } from '@mdx-js/tag';
import { StaticQuery, graphql } from 'gatsby';

import '../styles/prismjs.css';

// @ts-ignore
import Montserrat from '../../assets/fonts/Montserrat/Montserrat-Regular.ttf';
// @ts-ignore
import ScopeOne from '../../assets/fonts/Scope_One/ScopeOne-Regular.ttf';
import { colors } from '../styles/common';
import { ThemeContext } from '../utils/context';
import { SiteMetadata } from '../types/SiteMetadata';

import mdxComponents from './mdx';
import Footer, { footerHeight } from './Footer';
import Menu, { menuHeight } from './Menu';

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
    font-family: 'Montserrat', sans-serif;
    transition: all 200ms linear;

    color: ${props => (props.theme.color === 'light' ? colors.text_body_light : colors.text_body_dark)};
    background-color: ${props => (props.theme.color === 'light' ? colors.background_light : colors.background_dark)};
  }

  pre {
      margin-top: 0;
  }

  ${() => {
      /* Override PrismJS Defaults */
      return null;
  }}

  a {
      color: ${colors.link_inactive_light};

      &:hover {
          color: ${colors.link_active_light};
      }
  }

    /**
    * This will hide the focus indicator if the element receives focus via the mouse,
    * but it will still show up on keyboard focus.
    */
    .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
    }
`;

const Main = styled.main`
    min-height: calc(100vh - ${footerHeight}px - ${menuHeight}px);
`;

type LayoutProps = {
    site: {
        siteMetadata: SiteMetadata;
    };
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

export default ({
    site,
    frontmatter = { title: null, description: null, banner: { publicURL: null } },
    title: pageTitle = null,
    hideMenu = false,
    hideFooter = false,
    children,
}: LayoutProps) => {
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
                <ThemeContext.Consumer>
                    {({ theme, toggleTheme }) => (
                        <ThemeProvider theme={{ color: theme }}>
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
                                {!hideMenu && <Menu theme={theme} toggleTheme={toggleTheme} />}
                                <MDXProvider components={mdxComponents}>
                                    <Main>{children}</Main>
                                </MDXProvider>
                                {!hideFooter && <Footer />}
                            </>
                        </ThemeProvider>
                    )}
                </ThemeContext.Consumer>
            )}
        />
    );
};
