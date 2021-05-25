import { screen, render, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock("next-auth/client");
jest.mock("next/router");

describe("<SubscribeButton />", () => {
  it("should render correctly", () => {
    const mockedUseSession = mocked(useSession);

    mockedUseSession.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("should redirects user to sign in when not authenticated", () => {
    const mockedUseSession = mocked(useSession);

    mockedUseSession.mockReturnValueOnce([null, false]);

    const mockedSignIn = mocked(signIn);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(mockedSignIn).toHaveBeenCalled();
  });

  it("should redirects user to posts when already has a subscription", () => {
    const mockedUseRouter = mocked(useRouter);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "john.doe@example.com" },
        activeSubscription: "fake-active-subscription",
        expires: "fake-expires",
      } as any,
      false,
    ]);

    const pushMock = jest.fn();

    mockedUseRouter.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
