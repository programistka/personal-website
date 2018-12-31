import styled from 'styled-components';
import { colors } from '../../styles/common';

export default styled.p`
    text-align: left;
    font-size: 16px;
    line-height: 1.58;
    letter-spacing: -0.003em;
    margin-top: 0;
    margin-bottom: 16px;
    color: ${props =>
        props.theme.color === 'light' ? colors.text_body_light : colors.text_body_dark};
`;
