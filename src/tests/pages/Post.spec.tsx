import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Post, { getServerSideProps } from "pages/posts/[slug]";

import { getPrismicClient } from "services/prismic";
import { getSession } from "next-auth/client";

jest.mock("next-auth/client");
jest.mock("services/prismic");

const post = {
  slug: "new-post",
  title: "New Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "March, 10",
};

describe("<Post />", () => {
  it("should render correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });

  it("should redirects user if no subscription is found", async () => {
    const mockedGetSession = mocked(getSession);

    mockedGetSession.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: "new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      })
    );
  });

  it("should load initial data", async () => {
    const mockedGetSession = mocked(getSession);
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

    mockedGetSession.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

    const response = await getServerSideProps({
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
