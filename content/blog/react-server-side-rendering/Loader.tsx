import React from 'react';
import styled from '../../../src/lib/styled-components';
import { colors } from '../../../src/styles/common';

const StyledLoader = styled.div`
    width: 3.5em;
    height: 1em;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    & div {
        width: 0.8em;
        height: 0.8em;
        border-radius: 50%;
        /* background-color: #fc2f70; */
        background-color: ${colors.linkInactiveDark};
        animation: fade 0.8s ease-in-out alternate infinite;
    }

    & div:nth-of-type(1) {
        animation-delay: -0.4s;
    }

    & div:nth-of-type(2) {
        animation-delay: -0.2s;
    }

    @keyframes fade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

const Loader = () => (
    <StyledLoader>
        <div />
        <div />
        <div />
    </StyledLoader>
);

export default Loader;
