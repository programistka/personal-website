import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { Title, Description, fontSize } from '../components/Typography';
import { PageWrapper, SectionWrapper, Button } from '../components/Common';
import { colors, media } from '../styles/common';

const Header = styled(SectionWrapper)`
    text-align: center;
`;

const Project = styled.div`
    padding: 120px 20px;
    text-align: center;
    color: ${props => (props.textColor === 'light' ? colors.text_light : colors.text_dark)};

    ${media.small`
        padding: 80px 20px;
    `};
`;

const ProjectTitle = styled.h2`
    font-weight: 400;
    font-family: 'Scope One';
    font-size: ${fontSize.title.large};
    margin-top: 40px;
    margin-bottom: 0;

    ${media.small`
        font-size: ${fontSize.title.small};
    `};
`;

const ProjectSubtitle = styled.span`
    font-size: 14px;
    display: inline-block;
    margin-bottom: 25px;
`;

const ProjectDescription = styled.p`
    width: 600px;
    max-width: 100%;
    font-size: ${fontSize.body.large};
    margin: auto;
    line-height: 1.4;

    ${media.small`
        font-size: ${fontSize.body.small};
    `};
`;

const CTASection = styled(SectionWrapper)`
    padding: 100px 20px;
    text-align: center;

    ${media.small`
        padding: 60px 20px;
    `};
`;

const CTATitle = styled(Title)`
    margin-bottom: 40px;
`;

const ProjectImage = styled(Img)`
    width: 450px;
    margin: auto;
    max-width: 100%;

    ${media.small`
        width: 300px;
    `};
`;

type projectsProps = {};

const Projects = ({
    data: {
        site,
        allMdx: { edges: projects },
    },
}) => {
    return (
        <Layout site={site}>
            <Header data-aos="fade">
                <Title>Projects</Title>
                <Description>Here is a sample of some of my recent work.</Description>
            </Header>
            {projects.map(
                ({ node: project }, index) =>
                    console.log(index) || (
                        <Project
                            key={project.fields.id}
                            style={{ backgroundColor: project.frontmatter.backgroundColor }}
                            textColor={project.frontmatter.textColor}
                        >
                            <PageWrapper data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
                                <ProjectImage
                                    fluid={project.frontmatter.image.childImageSharp.fluid}
                                />
                                <ProjectTitle>{project.frontmatter.title}</ProjectTitle>
                                <ProjectSubtitle>{project.frontmatter.subtitle}</ProjectSubtitle>
                                <ProjectDescription>
                                    {project.frontmatter.description}
                                </ProjectDescription>
                            </PageWrapper>
                        </Project>
                    ),
            )}
            <CTASection data-aos="fade-up">
                <CTATitle as="h2">Interested in working together?</CTATitle>
                <Button to="mailto:hi@robertcooper.me">Get in touch</Button>
            </CTASection>
        </Layout>
    );
};

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                description
                author
                keywords
            }
        }
        allMdx(
            filter: { fields: { slug: { eq: null } } }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            edges {
                node {
                    fields {
                        id
                        slug
                    }
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
            }
        }
    }
`;

export default Projects;
