import '../styles/prismjs.css';
import Helmet from 'react-helmet';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MDXProvider } from '@mdx-js/tag';
import { Location } from '@reach/router';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    once: true,
});

// @ts-ignore
import Montserrat from '../../assets/fonts/Montserrat/Montserrat-Regular.ttf';
// @ts-ignore
import ScopeOne from '../../assets/fonts/Scope_One/ScopeOne-Regular.ttf';

import mdxComponents from './mdx';
import { colors } from '../styles/common';

import Footer from './Footer';
import Menu from './Menu';
import posed from 'react-pose';

const Transition = posed.div({
    enter: { opacity: 1, delay: 300, beforeChildren: true },
    exit: { opacity: 0 },
});

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

export default ({ site, frontmatter = { description: 'test' }, children }) => {
    const { title, description: siteDescription, keywords: siteKeywords } = site.siteMetadata;

    const { description: frontmatterDescription } = frontmatter;

    const keywords = siteKeywords.join(', ');
    const description = frontmatterDescription || siteDescription;

    return (
        <Location>
            {({ location }) => (
                <>
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
                    <Menu />
                    <Transition key={location.key}>
                        <MDXProvider components={mdxComponents}>
                            <Main>{children}</Main>
                        </MDXProvider>
                    </Transition>
                    <Footer />
                </>
            )}
        </Location>
    );
};
