import Img from 'gatsby-image';
import React from 'react';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styled from '../../lib/styled-components';
import Layout from '../../components/Layout';
import { PageWrapper, PaddedPageWrapper, Divider, Button } from '../../components/Common';
import { Project as ProjectType } from '../../types/Project';
import { colors, media, textSize, textColor, pageWidth } from '../../styles/common';

const Header = styled.div<any>`
    padding: 120px 20px;
    background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledPageWrapper = styled(PageWrapper)`
    display: flex;

    ${media.medium`
        flex-direction: column-reverse;
        align-items: center;
    `};
`;

const Title = styled.h1<any>`
    ${textSize.xlarge};
    margin-bottom: 5px;
    color: ${({ textColor }) => (textColor === 'light' ? colors.textBodyDark : colors.textBodyLight)};
`;

const Subtitle = styled.span<any>`
    font-weight: 300;
    color: ${({ textColor }) => (textColor === 'light' ? colors.textBodyDark : colors.textBodyLight)};
`;

const Description = styled.p<any>`
    ${textSize.large};
    color: ${({ textColor }) => (textColor === 'light' ? colors.textBodyDark : colors.textBodyLight)};
`;

const LeftSection = styled.div`
    padding-top: 40px;
    padding-right: 40px;
    max-width: 640px;
    margin-right: auto;

    ${media.medium`
        margin-right: 0;
        padding-right: 0;
        text-align: center;
    `};
`;

const Image = styled(Img)`
    width: 500px;
    max-width: 100%;

    ${media.medium`
        width: 400px;
    `};
`;

const SectionBody = styled(PaddedPageWrapper)`
    ${pageWidth.small};
    margin: auto;
`;

const SectionTitle = styled.h2`
    ${textColor.title};
    ${textSize.xlarge};
    text-align: center;
    margin-bottom: 40px;
`;

const SectionHeading = styled.h3`
    ${textSize.large};
    ${textColor.title};
    margin-top: 60px;
`;

const SectionParagraph = styled.p``;

const SectionImage = styled(Img)`
    margin: 40px auto;
    max-width: 100%;
`;

const SectionDivider = styled(Divider)`
    margin: 80px 0;
`;

const ViewButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;

const ViewButton = styled(Button)`
    margin: auto;
`;

type ProjectsProps = {
    data: {
        mdx: ProjectType['node'];
        image1: any;
        image2: any;
        image3: any;
        image4: any;
        image5: any;
    };
};

export const Project = ({
    data: {
        mdx: { frontmatter: project },
        image1,
        image2,
        image3,
        image4,
        image5,
    },
}: ProjectsProps) => {
    return (
        <Layout title="Robert Cooper | React Montreal">
            <Header backgroundColor={project.backgroundColor}>
                <StyledPageWrapper>
                    <LeftSection>
                        <Title textColor={project.textColor}>{project.title}</Title>
                        <Subtitle textColor={project.textColor}>{project.subtitle}</Subtitle>
                        <Description textColor={project.textColor}>{project.description}</Description>
                    </LeftSection>
                    <Image fluid={project.image.childImageSharp.fluid} />
                </StyledPageWrapper>
            </Header>
            <SectionBody>
                <SectionTitle>Objective</SectionTitle>
                <SectionParagraph>
                    The React Montreal meetup group was looking to have a web presence where they could display their
                    past and future meetups. For interested attendees, the site permits the meetup group to be
                    discovered through search engines, allow interested members to get an idea of what the meetup group
                    is about, and discover details about upcoming meetups. For attendees of the meetup group, the
                    website would be a place to reference additional information related to meetup presentations
                    (presenter links/notes and presentation video recording links). For meetup presenters, the site
                    would allow them to reference their talk when sharing their presentation with others.
                </SectionParagraph>
                <SectionDivider />
                <SectionTitle>Design</SectionTitle>
                <SectionParagraph>
                    The website design was prepared with a mockup designed in Figma. Before beginning the development of
                    the site, the mockups were presented to the meetup group organizers for approval.
                </SectionParagraph>
                <SectionImage fluid={image1.childImageSharp.fluid} />
                <span className="caption">Mockups were designed in Figma before beginning development</span>
                <SectionDivider />
                <SectionTitle>Result</SectionTitle>
                <SectionHeading>Content Management</SectionHeading>
                <SectionParagraph>
                    In order to allow the meetup organizers to easily enter information on the meetup site, Netlify CMS
                    was used as an interface to easily edit the content on the website. The CMS also allows to preview
                    content before publishing the content to go live.
                </SectionParagraph>
                <SectionImage fluid={image2.childImageSharp.fluid} />
                <span className="caption">
                    The CMS allows meetup organizers to add new information to the website and preview their changes
                    before publishing the content
                </span>
                <SectionHeading>Meetup Listings</SectionHeading>
                <SectionParagraph>
                    Each meetup has its own entry within the CMS that allows meetup organizers to add the following
                    information related to a meetup:
                </SectionParagraph>
                <ul>
                    <li>Description + Title</li>
                    <li>Date + Time + Location</li>
                    <li>Meetup.com link (in order to RSVP to the event)</li>
                    <li>Presenter info: name, presentation title, image, description, etc</li>
                    <li>Sponsors info: name, logo, description, links</li>
                </ul>
                <SectionImage fluid={image3.childImageSharp.fluid} />
                <span className="caption">
                    Each meetup has all of its presenters and sponsor information listed on the website
                </span>
                <SectionHeading>Search Engine and Social Media Optimization</SectionHeading>
                <SectionParagraph>
                    The website is built with GatsbyJS which is a static site generator. Since all the pages are
                    pre-built, all the pages can be properly crawled and indexed by search engines. Furthermore, the
                    metadata for each page can be configured in Netlify CMS, enabling each page to have its own custom
                    title, description, and image used by search engines and social media sites.
                </SectionParagraph>
                <SectionImage fluid={image4.childImageSharp.fluid} style={{ width: '500px' }} />
                <span className="caption">
                    Sharing the website on social media presents the site details in an attractive manner
                </span>
                <SectionHeading>Performance</SectionHeading>
                <SectionParagraph>
                    Because the site is static, the pages load quickly in the browser. A lighthouse speed test performed
                    on the website returns a perfect score in all areas.
                </SectionParagraph>
                <SectionImage fluid={image5.childImageSharp.fluid} />
                <span className="caption">Results of running a lighthouse speed test on the website</span>
                <SectionDivider />
                <ViewButtonWrapper>
                    <ViewButton to="https://meetup.letsreact.io/">View it live</ViewButton>
                </ViewButtonWrapper>
            </SectionBody>
        </Layout>
    );
};

export default Project;

export const pageQuery = graphql`
    query {
        mdx(frontmatter: { title: { eq: "React Montreal Meetup" } }) {
            frontmatter {
                title
                subtitle
                description
                backgroundColor
                textColor
                image {
                    childImageSharp {
                        fluid(maxWidth: 500) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        image1: file(name: { eq: "image-1" }, relativePath: { regex: "/react-montreal/images/" }) {
            childImageSharp {
                fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        image2: file(name: { eq: "image-2" }, relativePath: { regex: "/react-montreal/images/" }) {
            childImageSharp {
                fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        image3: file(name: { eq: "image-3" }, relativePath: { regex: "/react-montreal/images/" }) {
            childImageSharp {
                fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        image4: file(name: { eq: "image-4" }, relativePath: { regex: "/react-montreal/images/" }) {
            childImageSharp {
                fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        image5: file(name: { eq: "image-5" }, relativePath: { regex: "/react-montreal/images/" }) {
            childImageSharp {
                fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;
