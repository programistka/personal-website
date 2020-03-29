import React from 'react';
import { Quote } from './Quote';

export const Blockquote: React.FC<{ theme: string; className?: string; children: React.ReactChild }> = (props) =>
    props.className && props.className === 'twitter-tweet' ? (
        <blockquote className={props.className}>{props.children}</blockquote>
    ) : (
        <Quote {...props} />
    );
