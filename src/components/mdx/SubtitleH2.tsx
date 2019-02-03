import styled from 'styled-components';

import { colors } from '../../styles/common';

export default styled.h2`
    color: ${props => (props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark)};
    display: block;
    text-align: left;
    font-size: 28px;
    margin-top: 30px;
    margin-bottom: 20px;
    font-family: 'Scope One';
    font-weight: 400;
    line-height: 1.1;
`;
