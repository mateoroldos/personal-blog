import type { JSX } from "solid-js/jsx-runtime";

interface LinkProps {
  href: string;
  children: JSX.Element;
}

function Link(props: LinkProps) {
  const { href, children } = props;
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      class="focus:outline-offset-6 group underline decoration-gray-300 decoration-wavy underline-offset-4 transition-colors hover:decoration-primary-300 focus:decoration-gray-500"
    >
      {children}
    </a>
  );
}

export default Link;
