module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://www.robertcooper.me/',
    author: 'Robert Cooper',
    title: 'Robert Cooper',
    description: `Robert Cooper's personal website`,
    keywords: [
      'Software Engineer',
      'Web Developer',
      'Consultant',
      'Freelancer',
    ],
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
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '>',
              aliases: {},
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
        theme_color: '#114fe6',
        display: 'standalone',
        icon: 'assets/logo.png', // TODO: update this logo
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
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  custom_elements: [{ "content:encoded": edge.node.rawBody }],
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
                      description
                    }
                  }
                }
              }
            }
          `,
            output: `rss.xml`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-80196253-8",
      },
    },
  ],
};
