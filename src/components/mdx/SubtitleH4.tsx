import styled from 'styled-components';
import { colors } from '../../styles/common';

export default styled.h4`
    color: ${props =>
        props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark};
    display: block;
    text-align: left;
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 20px;
    letter-spacing: 0.8px;
    font-family: 'Montserrat';
    font-weight: 400;
    line-height: 1.1;

    * {
        font-size: 18px !important;
    }
`;
