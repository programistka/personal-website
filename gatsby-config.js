/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    pathPrefix: '/',
    siteMetadata: {
        siteUrl: 'https://www.robertcooper.me',
        author: 'Robert Cooper',
        title: 'Robert Cooper',
        description: `The front end web development blog and project portfolio of Robert Cooper, a Canadian web developer and consultant.`,
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/blog`,
                name: 'blog',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/projects`,
                name: 'projects',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/assets/images`,
                name: 'images',
            },
        },
        {
            resolve: `gatsby-mdx`,
            options: {
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 800,
                            sizeByPixelDensity: true,
                            backgroundColor: 'none',
                        },
                    },
                    {
                        resolve: `gatsby-remark-copy-linked-files`,
                    },
                ],
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-styled-components',
        'gatsby-plugin-catch-links',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Front end web developer, writer, and consultant',
                short_name: 'Robert Cooper',
                start_url: '/',
                background_color: '#fff',
                theme_color: '#114fe6', // TODO: Check how these colors manifest themselves 👻
                display: 'standalone',
                icon: 'assets/logo.png',
            },
        },
        'gatsby-plugin-offline',
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                feeds: [
                    {
                        serialize: ({ query: { site, allMdx } }) => {
                            return allMdx.edges.map(edge => {
                                return {
                                    ...edge.node.frontmatter,
                                    description: edge.node.excerpt,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [{ 'content:encoded': edge.node.html }],
                                };
                            });
                        },
                        query: `
                    {
                      allMdx(
                        limit: 1000,
                        sort: {
                          order: DESC,
                          fields: [frontmatter___date]
                        },
                        filter: { fields: { slug: { ne: null } } }
                      ) {
                        edges {
                          node {
                            frontmatter {
                              title
                              date
                            }
                            fields {
                              slug
                            }
                            excerpt
                            html
                          }
                        }
                      }
                    }
                  `,
                        output: `rss.xml`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-80196253-8',
            },
        },
    ],
};
/* eslint-enable @typescript-eslint/camelcase */
