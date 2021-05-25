import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Posts, { getStaticProps } from "pages/posts";

import { getPrismicClient } from "services/prismic";

jest.mock("services/prismic");

const posts = [
  {
    slug: "new-post",
    title: "New Post",
    excerpt: "Post excerpt",
    updatedAt: "March, 10",
  },
];

describe("<Post />", () => {
  it("should render correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("New Post")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const mockedGetPrismicClient = mocked(getPrismicClient);

    mockedGetPrismicClient.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "new-post",
            data: {
              title: [{ type: "heading", text: "New Post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "03-10-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "new-post",
              title: "New Post",
              excerpt: "Post excerpt",
              updatedAt: "10 de março de 2021",
            },
          ],
        },
      })
    );
  });
});
