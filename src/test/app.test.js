import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import ChartComponent from "../Components/ChartComponent";

test("renders State dropdown", () => {
  render(<App />);
  const stateDropdown = screen.getByLabelText(/state/i);
  expect(stateDropdown).toBeInTheDocument();
});

test("selecting state updates the state value", () => {
  render(<App />);
  const stateDropdown = screen.getByLabelText(/state/i);
  fireEvent.change(stateDropdown, { target: { value: "CA" } });
  expect(stateDropdown.value).toBe("CA");
});

test("renders the chart with data", () => {
  const mockData = [
    { name: "7.0%", lenders: 6 },
    { name: "7.5%", lenders: 4 },
  ];
  render(<ChartComponent data={mockData} />);
  expect(screen.getByText(/7.0%/i)).toBeInTheDocument();
  expect(screen.getByText(/6 lenders/i)).toBeInTheDocument();
});
