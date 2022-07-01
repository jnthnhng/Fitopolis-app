import "react-native";
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import App from '../App';

// Source: https://everyday.codes/react-native/iterate-faster-with-github-actions-for-react-native/

afterAll(cleanup);

describe("<App />", () => {
  it("should match snapshot", () => {
    const rendered = render(<App />).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});
