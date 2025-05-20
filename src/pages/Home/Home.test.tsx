import { mockSymbols } from "../../../__mocks__/binanceMocks";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "./Home";
import { BinanceProvider } from "../../contexts/BinanceProvider";
import * as api from "../../services/api";

jest.mock("../../assets/images/logo.png", () => "test-file-stub");
jest.mock("../../services/api");

const renderWithProvider = () =>
  render(
    <BinanceProvider>
      <Home />
    </BinanceProvider>
  );

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    (api.getSymbols as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockSymbols), 500))
    );

    renderWithProvider();

    // Loader aparece
    expect(screen.getByTestId("loader")).toBeInTheDocument();

    // Espera o loader sumir
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
  });

  it("displays symbols after loading", async () => {
    (api.getSymbols as jest.Mock).mockResolvedValue(mockSymbols);

    renderWithProvider();

    // Para cada símbolo, espera que esteja na tela
    for (const symbol of mockSymbols) {
      expect(await screen.findByText(symbol.symbol)).toBeInTheDocument();
    }

    // Loader não deve estar mais
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  it("shows error message when fetch fails and allows retry", async () => {
    (api.getSymbols as jest.Mock)
      .mockRejectedValueOnce(new Error("Failed to fetch"))
      .mockResolvedValueOnce(mockSymbols);

    renderWithProvider();

    // Espera mensagem de erro
    expect(await screen.findByText(/failed to fetch/i)).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();

    // Clica no retry
    userEvent.click(retryButton);

    // Espera os símbolos aparecerem após retry
    for (const symbol of mockSymbols) {
      expect(await screen.findByText(symbol.symbol)).toBeInTheDocument();
    }

    // Mensagem de erro não deve estar mais
    expect(screen.queryByText(/failed to fetch/i)).not.toBeInTheDocument();
  });
});
