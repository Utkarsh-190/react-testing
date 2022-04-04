// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import App from "./App";
import {render} from "@testing-library/react";

describe("app test", () => {
  it("when isLoading is true then loading text should be dsiplayed", () => {
    render(<App/>);
  });

  // it("when isLoading is false then render list of data");
})