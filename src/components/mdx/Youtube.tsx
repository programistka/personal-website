import React from 'react';
import styled from 'styled-components';
import { media } from '../../styles/common';

type YoutubeProps = {
    src: string;
};

const StyledIframe = styled.iframe`
    width: 100%;
    margin: 40px 0;

    ${media.small`
        height: 350px;
    `};
`;

const Youtube = ({ src }: YoutubeProps) => {
    return (
        <StyledIframe
            width="560"
            height="420"
            src={src}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
};

export default Youtube;
