import Helmet from 'react-helmet';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { withPrefix } from 'gatsby';
import styled, { createGlobalStyle, ThemeProvider } from '../lib/styled-components';
import Inter from '../../assets/fonts/Inter/Inter';
import '../styles/prismjs.css';
import { colors, textColor, textSize } from '../styles/common';
import { ThemeContext } from '../utils/context';
import { SiteMetadata } from '../types/SiteMetadata';
import mdxComponents from './mdx';
import Footer, { footerHeight } from './Footer';
import Menu, { menuHeight } from './Menu';

const GlobalStyles = createGlobalStyle`
  ${Inter};

  * {
      box-sizing: border-box;
  }

  html, body {
    ${textSize.normal};
    ${textColor.body};
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;

    background-color: ${props => (props.theme.color === 'light' ? colors.backgroundLight : colors.backgroundDark)};
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

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
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

export const Layout = ({
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
                                content={`${siteUrl}${publicURL || withPrefix('/social-sharing.jpg')}`}
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
    );
};

export default Layout;
