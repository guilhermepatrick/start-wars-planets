import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Testando a Home", () => {
  it("Verifica se a Tabela é Renderizada Corretamente", async () => {
    render(<App />);
    expect(screen.getAllByRole("columnheader")).toHaveLength(13);
    await waitFor(
      () =>
        expect(
          screen.getByRole("cell", { name: /tatooine/i })
        ).toBeInTheDocument(),
      { timeout: 3000 }
    );
    userEvent.click(screen.getByTestId("button-filter"));
    await waitFor(
      () =>
        expect(screen.getByRole("button", { name: /x/i })).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });
  it("Verifica se a Tabela é Renderizada Corretamente", async () => {
    render(<App />);
    userEvent.click(screen.getByRole("radio", { name: /ascendente/i }));
    userEvent.click(screen.getByRole("button", { name: /ordenar/i }));
    await waitFor(
      () =>
        expect(screen.getAllByRole("cell")[0]).toHaveTextContent("Yavin IV"),
      { timeout: 3000 }
    );
  });
  it("Verifica se a Tabela é Renderizada Corretamente", async () => {
    render(<App />);
    userEvent.click(screen.getByRole("radio", { name: /descendente/i }));
    userEvent.click(screen.getByRole("button", { name: /ordenar/i }));
    await waitFor(
      () =>
        expect(screen.getAllByRole("cell")[0]).toHaveTextContent("Coruscant"),
      { timeout: 3000 }
    );
  });
});
