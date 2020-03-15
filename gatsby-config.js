/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    pathPrefix: `/`,
    siteMetadata: {
        siteUrl: `https://www.robertcooper.me`,
        author: `Robert Cooper`,
        title: `Robert Cooper`,
        description: `A Canadian web developer based in Montreal, Canada.`,
        imagePath: `/social-sharing.png`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/projects`,
                name: `projects`,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            quality: 100,
                            maxWidth: 800,
                            backgroundColor: `none`,
                            withWebp: true,
                        },
                    },
                    `gatsby-remark-copy-linked-files`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: `language-`,
                            noInlineHighlight: true,
                            aliases: {},
                        },
                    },
                    `gatsby-remark-embedder`,
                    // TODO: It would be awesome to get this plugin to work so I don't have to manually
                    // run ffmpeg locally for my videos
                    // {
                    //     resolve: `gatsby-remark-videos`,
                    //     options: {
                    //         pipelines: [
                    //             {
                    //                 name: `vp9`,
                    //                 transcode: chain =>
                    //                     chain
                    //                         .videoCodec('libvpx-vp9')
                    //                         .noAudio()
                    //                         .outputOptions(['-crf 20', '-b:v 0']),
                    //                 maxHeight: 720,
                    //                 maxWidth: 1000,
                    //                 fileExtension: `webm`,
                    //             },
                    //             {
                    //                 name: `h264`,
                    //                 transcode: chain =>
                    //                     chain
                    //                         .videoCodec('libx264')
                    //                         .noAudio()
                    //                         .videoBitrate('1000k'),
                    //                 maxHeight: 720,
                    //                 maxWidth: 1000,
                    //                 fileExtension: `mp4`,
                    //             },
                    //         ],
                    //     },
                    // },
                ],
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                displayName: true,
            },
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-twitter`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Front-end web developer`,
                short_name: `Robert`,
                start_url: `/`,
                background_color: `#F9FCFF`,
                theme_color: `#09203A`,
                display: `standalone`,
                icon: `assets/logo.png`,
            },
        },
        {
            resolve: `gatsby-plugin-feed-custom`,
            options: {
                image_url: `https://www.robertcooper.me/social-sharing.png`,
                language: `en`,
                feeds: [
                    {
                        serialize: ({ query: { site, allMdx } }) => {
                            return allMdx.edges.map(edge => {
                                return {
                                    ...edge.node.frontmatter,
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
                                    description
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
                trackingId: `UA-80196253-8`,
            },
        },
        `gatsby-plugin-netlify`,
        `gatsby-plugin-netlify-cache`,
    ],
};
/* eslint-enable @typescript-eslint/camelcase */
