// import libraries
import React from "react";
import {render, waitFor, fireEvent} from "@testing-library/react";
import {fetchShow as mockFetchShow} from "./api/fetchShow"
import App from "./App";
import {show} from "./testData/show"

//set up test
jest.mock("./api/fetchShow");

test("renders episodes from API", async() => {
    mockFetchShow.mockResolvedValueOnce(show);

    const {queryAllByTestId, getByText} = render(<App/>);

    expect(mockFetchShow).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(queryAllByTestId(/episode/i)).toHaveLength(0));

    await waitFor(() => {
        getByText(/select a season/i);
    })
});

test('can select from dropdown', async() => {
    mockFetchShow.mockResolvedValueOnce(show);

    const {getByText} = render(<App/>)

    await waitFor(() => {
        getByText(/select a season/i);
    })

    fireEvent.mouseDown(getByText(/select a season/i));

    await waitFor(() => {
        getByText(/season 1/i);
    })
})

test('shows season 2 data after selection', async() => {
    mockFetchShow.mockResolvedValueOnce(show);

    const {getByText, queryAllByTestId} = render(<App/>)

    await waitFor(() => {
        getByText(/select a season/i);
    })

    fireEvent.mouseDown(getByText(/select a season/i));

    fireEvent.mouseDown(getByText(/season 2/i));

    // Assert that episodes are displaying for season one
    await waitFor(() => expect(getByText(/Chapter Two/i)).toHaveTextContent(/Trick or Treat, Freak/i));
    await waitFor(() => expect(queryAllByTestId(/episode/i)).toHaveLength(9));
})