import { ReactElement, cloneElement } from "react";

import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";

type ActiveLinkProps = {
  children: ReactElement;
  activeClassName: string;
} & LinkProps;

export const ActiveLink = ({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : "";

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
};
