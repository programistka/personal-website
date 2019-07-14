import React from 'react';
import styled, { css } from 'styled-components';

const backgroundColors = ['#3D2645', '#832161', '#DA4167'];

const Row = styled.div<{ type: 'flex' | 'grid' }>`
    border: 4px solid #564787;
    width: 100%;
    max-width: 100%;
    margin: auto;
    resize: horizontal;
    overflow: auto;

    ${({ type }) =>
        type === 'flex'
            ? css`
                  display: flex;
                  padding: 5px;
                  flex-wrap: wrap;
                  justify-content: space-around;
              `
            : css`
                  padding: 10px;
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                  grid-gap: 10px;
                  justify-content: center;
              `}
`;

const Column = styled.div<{ type: 'flex' | 'grid' }>`
    height: 100px;
    border: 4px solid #dbcbd8;
    max-width: 100%;

    ${({ type }) =>
        type === 'flex'
            ? css`
                  flex-basis: 220px;
                  margin: 5px;
              `
            : css`
                  justify-self: center;
                  width: 220px;
              `}
`;

const Example = ({ type }) => {
    return (
        <Row type={type}>
            {backgroundColors.map(backgroundColor => (
                <Column type={type} style={{ backgroundColor }} key={backgroundColor} />
            ))}
        </Row>
    );
};

export default Example;
