import React from 'react';
import { Link } from '../Link';

export const Anchor: React.FC<{ theme: string; href: string; children: React.ReactChild }> = props => (
    <Link to={props.href} {...props}>
        {props.children}
    </Link>
);
