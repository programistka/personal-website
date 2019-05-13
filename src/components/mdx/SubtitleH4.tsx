import styled from 'styled-components';
import { colors, textColor } from '../../styles/common';

export default styled.h4`
    ${textColor.title};
    display: block;
    text-align: left;
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 20px;
    font-family: 'Inter';
    font-weight: 400;

    * {
        font-size: 18px !important;
    }
`;
