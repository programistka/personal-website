import React from 'react';
import styled from 'styled-components';

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
            <source src={`${src}.mp4`} type="video/mp4" />
        </StyledVideo>
    );
};

export default Video;
