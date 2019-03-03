import styled from 'styled-components';

import { colors } from '../styles/common';

export default styled.div`
    background-color: ${props =>
        props.theme.color === 'light' ? colors.quote_background_light : colors.quote_background_dark};
    margin-left: 10px;
    margin-bottom: 16px;
    padding: 10px;
    position: relative;
    font-size: 16px;
    line-height: 1.58;
    letter-spacing: -0.003em;
    color: ${colors.text_body_light};

    a {
        color: ${colors.link_active_light};

        &:hover {
            color: ${colors.link_active_light};
        }
    }

    ::before {
        position: absolute;
        width: 10px;
        left: -10px;
        top: 0;
        background-color: ${props =>
            props.theme.color === 'light' ? colors.quote_highlight_light : colors.quote_highlight_dark};
        height: 100%;
        content: '';
    }
`;
