import React from 'react';
import styled from 'styled-components';
import { supportsVideoType, VideoFormats } from '../../utils/supportsVideoType';

type VideoProps = {
    src: string;
};

const StyledVideo = styled.video`
    max-width: 100%;
    margin: 40px auto;
    display: block;
`;

const Video = ({ src }: VideoProps) => {
    return (
        <StyledVideo autoPlay loop muted playsInline>
            {supportsVideoType(VideoFormats.webm) ? (
                <source src={`${src}.webm`} type="video/webm" />
            ) : (
                <source src={`${src}.mp4`} type="video/mp4" />
            )}
        </StyledVideo>
    );
};

export default Video;
