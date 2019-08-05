import React from 'react';
import { Button } from '../../../src/components/Common';
import styled from '../../../src/lib/styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 40px;
`;

const ButtonRow = styled.div`
    margin: -20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

const ButtonGroup = ({ items }) => {
    return (
        <Wrapper>
            <ButtonRow>
                {items.map(item => (
                    <ButtonWrapper key={item.name}>
                        <Button to={item.link}>{item.name}</Button>
                    </ButtonWrapper>
                ))}
            </ButtonRow>
        </Wrapper>
    );
};

export default ButtonGroup;
