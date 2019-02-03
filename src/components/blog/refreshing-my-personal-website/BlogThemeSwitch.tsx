import React, { useState } from 'react';
import styled from 'styled-components';

import ThemeSwitch from '../../ThemeSwitch';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;

type BlogThemeSwitchProps = {};

const BlogThemeSwitch = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(previousTheme => (previousTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <Wrapper>
            <ThemeSwitch theme={theme} onChange={toggleTheme} />
        </Wrapper>
    );
};

export default BlogThemeSwitch;
