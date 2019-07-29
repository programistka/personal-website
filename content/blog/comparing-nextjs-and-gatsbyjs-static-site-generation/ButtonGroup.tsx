import React from 'react';
import { Button } from '../../../src/components/Common';
import styled from '../../../src/lib/styled-components';

const Wrapper = styled.div`
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    grid-gap: 20px;
    margin: 40px 0;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const ButtonGroup = ({ items }) => {
    return (
        <Wrapper>
            {items.map(item => (
                <ButtonWrapper key={item.name}>
                    <Button to={item.link}>{item.name}</Button>
                </ButtonWrapper>
            ))}
        </Wrapper>
    );
};

export default ButtonGroup;
