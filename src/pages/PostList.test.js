import React from "react";
import {getByTestId, render, screen, waitForElementToBeRemoved} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import * as reactQuery from "react-query";
import { useColorMode, useTheme} from "@chakra-ui/core";
import { BrowserRouter } from "react-router-dom";
import PostList from "./PostList";

// jest.mock("react-query");
jest.mock("@chakra-ui/core", () => {
    const modules = jest.requireActual("@chakra-ui/core");
    return {
        __esModule: true,
        ...modules,
        useColorMode: jest.fn(),  
        useTheme: jest.fn()
    }
});

// Arrange -> Act -> Assert

describe('PostList', () => {
    let useQuery = null;
    beforeAll(() => {
        useQuery = jest.spyOn(reactQuery, "useQuery");
    })
    beforeEach(() => {
        useQuery.mockClear();
    })

    it("when isLoading is true then loading text should be displayed", () => {
        // Arrange
        useQuery.mockReturnValue({
            isLoading: true,
            error: null,
            data: null
        });
        useColorMode.mockReturnValue({colorMode: "dark-mode"});
        useTheme.mockReturnValue({});

        // Act
        render(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);
        // debug();

        // Assert
        // getByTestId("loading-text")
        // console.log(screen.queryByText("Loading..").innerHTML); // to grab html element
        const text = screen.getByTestId("loading-text");
        
        expect(text.innerHTML).toBe("Loading..");
        expect(text).toHaveTextContent("Loading..");
    });

    it("when isLoading is false and data exist then render list of data", () => {
        useQuery.mockReturnValue({
            isLoading: false,
            error: null,
            data: {
                data: [{id:1, title:"title 1"}]
            }
        });
        useColorMode.mockReturnValue({colorMode: "dark-mode"});
        useTheme.mockReturnValue({});
        render(<BrowserRouter><PostList isDrawerOpen={false} closeDrawer={jest.fn()} /></BrowserRouter> );
        const data = screen.getAllByTestId("list-item").map(li => li.textContent);
        // expect(data).toEqual([ 'title 1' ]);
        expect(data).toMatchInlineSnapshot(`
Array [
  "title 1",
]
`); // if list is long (not writable)
    });

    it("when api calls made to POST endpoint", async () => {
        useQuery.mockRestore();
        useColorMode.mockReturnValue({colorMode: "dark-mode"});
        useTheme.mockReturnValue({});
        render(<BrowserRouter><PostList isDrawerOpen={false} closeDrawer={jest.fn()} /></BrowserRouter> );

        await waitForElementToBeRemoved(() => screen.getByTestId("loading-text"));
    })
})