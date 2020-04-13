import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../src/styles/common';
import { Button } from '../../../src/components/Common';

const Container = styled.div`
    border: 4px solid ${colors.buttonActiveBorderDark};
    padding: 30px 10px;
    text-align: center;
    margin: 80px 0;
`;

const Text = styled.p`
    margin: 0;
    margin-bottom: 15px;
`;

const HireMeComponent: React.FC<{}> = () => {
    return (
        <Container>
            <Text>
                {`Don't have to bandwidth to migrate to Prisma 2? I'm available for hire to do the migration for you.`}
            </Text>
            <Button to="mailto:robert@robertcooper.me?Subject= Inquiry on upgrading a Prisma 1 project to Prisma 2">
                Hire me
            </Button>
        </Container>
    );
};

export default HireMeComponent;
