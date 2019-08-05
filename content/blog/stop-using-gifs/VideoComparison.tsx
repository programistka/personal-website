import React from 'react';
import styled from '../../../src/lib/styled-components';

const StyledVideo = styled.video`
    max-width: 100%;
    margin: 40px auto;
    display: block;
`;

const VideoComparison = () => {
    return (
        <div>
            <StyledVideo autoPlay loop muted playsInline>
                <source src={`/mclovin.webm`} type="video/webm" />
            </StyledVideo>
            <span className="caption">WebM video of the Superbad GIF</span>
            <StyledVideo autoPlay loop muted playsInline>
                <source src={`/mclovin.mp4`} type="video/mp4" />
            </StyledVideo>
            <span className="caption">MPEG4 video of the Superbad GIF</span>
        </div>
    );
};

export default VideoComparison;
