import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../src/styles/common';

const shadesOfGrey = ['#595959', '#878787', '#ADADAD', '#C9C9C9'];

const Wrapper = styled.div`
    display: grid;
    justify-content: flex-start;
    margin: 30px auto;
    border: 2px solid blue;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ theme }) => (theme.color === 'light' ? colors.borderLight : colors.borderDark)};
    padding: 10px;
    border-radius: 3px;
    width: fit-content;
`;

const Circle = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background-color: ${({ color }) => color};
`;

const HiddenCircles = styled(Circle)`
    content: 'Shhh, this is secret content';
`;

const Title = styled.p`
    text-align: left;
    margin: 0 0 20px 0;
`;

const CirclesWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    width: 200px;
`;

const RemainingCircles = () => {
    return (
        <>
            {shadesOfGrey.slice(1).map((color) => (
                <HiddenCircles color={color} key={color} />
            ))}
        </>
    );
};

const ShadesOfGrey = () => {
    const [showCircles, setShowCircles] = useState(false);
    const handleMouseOver = () => setShowCircles(true);
    const handleMouseLeave = () => setShowCircles(false);

    return (
        <Wrapper>
            <Title>Four Shades of Grey</Title>
            <CirclesWrapper onMouseLeave={handleMouseLeave}>
                <Circle onMouseOver={handleMouseOver} color={shadesOfGrey[0]} />
                {showCircles && <RemainingCircles />}
            </CirclesWrapper>
        </Wrapper>
    );
};

export default ShadesOfGrey;
