import styled from 'styled-components';
import { textColor } from '../../styles/common';

export default styled.h3`
    ${textColor.title};
    display: block;
    text-align: left;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
    font-family: 'Inter';
    font-weight: 400;

    * {
        font-size: 20px !important;
    }
`;
