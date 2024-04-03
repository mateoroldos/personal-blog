import React from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3';

export type HeadingProps = {
  level: HeadingLevel;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Heading(props: HeadingProps) {
  const { level, children, ...rest } = props;

  const Component = level;

  return <Component {...rest}>{rest.id ? <a href={`#${rest.id}`}>{children}</a> : children}</Component>;
}

export function createHeading(level: HeadingLevel) {
  return (props: Omit<HeadingProps, 'level'>) => <Heading level={level} {...props} />;
}
