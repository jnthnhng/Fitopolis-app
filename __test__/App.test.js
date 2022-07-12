import 'react-native';
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import App from '../App';
import LoginScreen from '../screens/LoginScreen';

// Source: https://everyday.codes/react-native/iterate-faster-with-github-actions-for-react-native/

// ************* Snapshot Test ********************
/* 
Snapshot Test are useful to maintain consistency across components
that are shared. 

Usually there will be multiple snapshots saved that
can be matched against incase any changed made to one component affects
another. 

*/

afterAll(cleanup);

describe('<App />', () => {
  it('should match snapshot', () => {
    const rendered = render(<App />).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});
