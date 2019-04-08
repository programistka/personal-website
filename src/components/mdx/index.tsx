import React from 'react';
import { preToCodeBlock } from 'mdx-utils';

import Link from '../Link';
import { Divider } from '../Common';

import Paragraph from './Paragraph';
import SubtitleH2 from './SubtitleH2';
import SubtitleH3 from './SubtitleH3';
import SubtitleH4 from './SubtitleH4';
import Title from './Title';
import Code from './Code';

/* eslint-disable react/display-name */
export default {
    a: (props: { theme: string; href: string; children: React.ReactChild }) => (
        <Link to={props.href} {...props}>
            {props.children}
        </Link>
    ),
    h1: (props: { theme: string }) => <Title {...props} />,
    h2: (props: { theme: string }) => <SubtitleH2 {...props} />,
    h3: (props: { theme: string }) => <SubtitleH3 {...props} />,
    h4: (props: { theme: string }) => <SubtitleH4 {...props} />,
    p: (props: { theme: string }) => <Paragraph {...props} />,
    hr: (props: { theme: string }) => <Divider {...props} />,
    pre: (props: any) => {
        const preProps: { codeString: string; language: string; props: any } | undefined = preToCodeBlock(props);
        if (preProps) {
            return <Code {...preProps} />;
        } else {
            return <pre {...props} />;
        }
    },
};
/* eslint-enable react/display-name */
