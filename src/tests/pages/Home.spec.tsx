import { render, screen } from "@testing-library/react";
import { stripe } from "services/stripe";
import { mocked } from "ts-jest/utils";
import Home, { getStaticProps } from "pages/index";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});
jest.mock("services/stripe");

describe("<Home />", () => {
  it("should render correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "$10,00" }} />);

    expect(screen.getByText("for $10,00 month")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const mockedStripeRetrievePrices = mocked(stripe.prices.retrieve);

    mockedStripeRetrievePrices.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
