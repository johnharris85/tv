//import libraries
import React from "react";
import { render } from "@testing-library/react";
import Episodes from "./Episodes"
import {show} from "../testData/show"

test("renders stranger things episodes from API", () => {
  
  const { queryAllByTestId, rerender } = render(<Episodes episodes={[]} />);

  expect(queryAllByTestId(/episode/i)).toHaveLength(0);

  // We will rerender the component with our dummy data passed in as the new props
  rerender(<Episodes episodes={show._embedded.episodes} />);

  // Assert that we now have dog images rendering!
  expect(queryAllByTestId(/episode/i)).toHaveLength(show._embedded.episodes.length);
});