import React from 'react';

import { Divider } from '../Common';

import Paragraph from './Paragraph';
import SubtitleH2 from './SubtitleH2';
import SubtitleH3 from './SubtitleH3';
import SubtitleH4 from './SubtitleH4';
import Title from './Title';

export default {
    h1: props => <Title {...props} />,
    h2: props => <SubtitleH2 {...props} />,
    h3: props => <SubtitleH3 {...props} />,
    h4: props => <SubtitleH4 {...props} />,
    p: props => <Paragraph {...props} />,
    hr: props => <Divider {...props} />,
};
