import React from 'react';
import styled from 'styled-components';
import SubtitleH3 from '../../../src/components/mdx/SubtitleH3';
import Loader from './Loader';

const Group = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0 0;
    justify-content: center;

    ul {
        text-align: center;

        li::before {
            display: none;
        }
    }
`;

const ListGroup = styled.div`
    margin: 0 20px 30px;
    flex-shrink: 1;
    min-width: 300px;
    flex-basis: calc(50% - 40px); // subtract margin
`;

const Subtitle = styled(SubtitleH3)`
    margin-top: 0;
    text-align: center;
`;

const HighlightYellow = styled.span`
    border-bottom: 3px solid #eac715;
`;

const HighlightGreen = styled.span`
    border-bottom: 3px solid #10ba65;
`;

const Comparison = () => {
    return (
        <Group>
            <ListGroup>
                <Subtitle>CSR</Subtitle>
                <ul>
                    <li>Browser requests a page</li>
                    <li>
                        <Loader />
                    </li>
                    <li>Blank index.html loaded</li>
                    <li>Browser requests linked JS bundle</li>
                    <li>
                        <Loader />
                    </li>
                    <li>React app loads</li>
                    <li>
                        <Loader />
                    </li>
                    <li>
                        <HighlightYellow>Content visible to the user</HighlightYellow>
                    </li>
                    <li>
                        <HighlightGreen>User can interact with app</HighlightGreen>
                    </li>
                    <li>Request API data</li>
                    <li>
                        <Loader />
                    </li>
                    <li>Re-render React app with new data</li>
                </ul>
            </ListGroup>
            <ListGroup>
                <Subtitle>SSR</Subtitle>
                <ul>
                    <li>Browser requests a page</li>
                    <li>
                        <Loader />
                    </li>
                    <li>
                        <HighlightYellow>Content visible to the user</HighlightYellow>
                    </li>
                    <li>Browser requests linked JS bundle</li>
                    <li>
                        <Loader />
                    </li>
                    <li>React app loads</li>
                    <li>
                        <Loader />
                    </li>
                    <li>
                        <HighlightGreen>User can interact with app</HighlightGreen>
                    </li>
                    <li>Request API data</li>
                    <li>
                        <Loader />
                    </li>
                    <li>Re-render React app with new data</li>
                </ul>
            </ListGroup>
        </Group>
    );
};

export default Comparison;
