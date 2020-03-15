import React from 'react';
import { Link } from '../Link';
import { Divider } from '../Common';
import Paragraph from './Paragraph';
import SubtitleH2 from './SubtitleH2';
import SubtitleH3 from './SubtitleH3';
import SubtitleH4 from './SubtitleH4';
import { Quote } from './Quote';
import { Title } from './Title';
import { Video } from './Video';
import { Youtube } from './Youtube';
import { Sandbox } from './Sandbox';

export const components = {
    a: (props: { theme: string; href: string; children: React.ReactChild }) => (
        <Link to={props.href} {...props}>
            {props.children}
        </Link>
    ),
    h1: Title,
    h2: SubtitleH2,
    h3: SubtitleH3,
    h4: SubtitleH4,
    p: Paragraph,
    hr: Divider,
    blockquote: (props: { theme: string; className?: string; children: React.ReactChild }) =>
        props.className && props.className === 'twitter-tweet' ? (
            <blockquote className={props.className}>{props.children}</blockquote>
        ) : (
            <Quote {...props} />
        ),
    Video: Video,
    Youtube: Youtube,
    Sandbox: Sandbox,
    Link: Link,
    Quote: Quote,
};
