import "react-native";
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import SearchScreen from '../screens/SearchScreen';

// Source: https://everyday.codes/react-native/iterate-faster-with-github-actions-for-react-native/

afterAll(cleanup);

describe("<SearchScreen />", () => {
  it("should match snapshot", () => {
    const rendered = render(<SearchScreen />).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});