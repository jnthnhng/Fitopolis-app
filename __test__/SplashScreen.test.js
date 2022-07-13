import 'react-native';
import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react-native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeStack from '../App';
import { NavigationContainer } from "@react-navigation/native";

afterAll(cleanup);

describe('<SplashScreen /> Snapshot', () => {
  it('should match snapshot', () => {
    const rendered = render(<SplashScreen />).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});



// ************* Button Component Test ********************
/* 

*/

it('should find the button via testId', () => {
  const testIdName = 'LoginButton';

  const { getByTestId } = render(<SplashScreen />);

  const foundButton = getByTestId(testIdName);

  expect(foundButton).toBeTruthy();
});

it('should find the button via testId', () => {
    const testIdName = 'SignUpButton';
  
    const { getByTestId } = render(<SplashScreen />);
  
    const foundButton = getByTestId(testIdName);
  
    expect(foundButton).toBeTruthy();
  });
  
// ************* Login Button Component Test ********************
/* 

*/

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Login Screen Navigation', () => {

  test('page contains the header and Login Button', async () => {
  
    const screen = render(<SplashScreen />);

    const header = await screen.findByText('Fitopolis');
    const loginText = await screen.findAllByText('Login');
    expect(header).toBeTruthy();
    expect(loginText).toBeTruthy();


  });

});