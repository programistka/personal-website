import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';

const Code = ({ codeString, language, ...props }: { codeString: string; language: string }) => {
    return (
        <Highlight {...defaultProps} code={codeString} language={language} theme={undefined}>
            {({
                className,
                tokens,
                getLineProps,
                getTokenProps,
            }: {
                className: string;
                tokens: any[];
                getLineProps: (props: any) => any;
                getTokenProps: (props: any) => any;
            }) => (
                <div className="gatsby-highlight">
                    <pre className={className}>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                {line.map((token: any, key: number) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                </div>
            )}
        </Highlight>
    );
};

export default Code;
