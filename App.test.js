import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native'
import App from './App';

// Source: https://everyday.codes/react-native/iterate-faster-with-github-actions-for-react-native/



afterEach(cleanup);

describe('<App />', () => {
  it('should match snapshot', () => {
    const rendered = render(<App />).toJSON();

    expect(rendered).toMatchSnapshot();
  });

  it('should set counter to 0', () => {
    const rendered = render(<App />);
    const counterComponent = rendered.getByTestId('counter');

    expect(counterComponent.props.children).toContainEqual(0);
  });

  it('should increase counter by 1', () => {
    const rendered = render(<App />);
    const counterComponent = rendered.getByTestId('counter');
    const buttonComponent = rendered. getByTestId('button');

    fireEvent(buttonComponent, 'press');

    expect(counterComponent.props.children).toContainEqual(1);
  });
});