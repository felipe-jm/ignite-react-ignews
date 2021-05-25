import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/client";
import PostPreview, { getStaticProps } from "pages/posts/preview/[slug]";

import { getPrismicClient } from "services/prismic";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

jest.mock("next-auth/client");
jest.mock("next/router");
jest.mock("services/prismic");

const post = {
  slug: "new-post",
  title: "New Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "March, 10",
};

describe("<PostPreview />", () => {
  it("should render correctly", () => {
    const mockedUseSession = mocked(useSession);

    mockedUseSession.mockReturnValueOnce([null, false]);

    render(<PostPreview post={post} />);

    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("should redirects user to full post when user is subscribed", async () => {
    const mockedUseSession = mocked(useSession);
    const mockedUseRouter = mocked(useRouter);
    const mockedPush = jest.fn();

    mockedUseSession.mockReturnValueOnce([
      {
        activeSubscription: "fake-active-subscription",
      },
      false,
    ] as any);

    mockedUseRouter.mockReturnValueOnce({
      push: mockedPush,
    } as any);

    render(<PostPreview post={post} />);

    expect(mockedPush).toHaveBeenCalledWith("/posts/new-post");
  });

  it("should load initial data", async () => {
    const mockedGetPrismicClient = mocked(getPrismicClient);

    mockedGetPrismicClient.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "New Post" }],
          content: [{ type: "paragraph", text: "Post excerpt" }],
        },
        last_publication_date: "05-10-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: "new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "new-post",
            title: "New Post",
            content: "<p>Post excerpt</p>",
            updatedAt: "10 de maio de 2021",
          },
        },
      })
    );
  });
});
