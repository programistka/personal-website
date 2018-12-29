import styled from 'styled-components';
import { colors } from '../../styles/common';

export default styled.h3`
    color: ${colors.text_title};
    display: block;
    text-align: left;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
    letter-spacing: 0.8px;
    font-family: 'Montserrat';
    font-weight: 400;
    line-height: 1.1;

    * {
        font-size: 20px !important;
    }
`;
