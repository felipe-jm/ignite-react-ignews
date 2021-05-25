import { render } from "@testing-library/react";
import { ActiveLink } from ".";

describe("<ActiveLink>", () => {
  it("should render correctly", () => {
    const { debug } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    debug();
  });
});