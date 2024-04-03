interface LinkProps {
  href: string;
}

function Link({ href, children }: React.PropsWithChildren<LinkProps>) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      className="focus:outline-offset-6 group underline decoration-gray-300 decoration-wavy underline-offset-4 transition-colors hover:decoration-primary-300 focus:decoration-gray-500"
    >
      {children}
    </a>
  );
}

export default Link;
