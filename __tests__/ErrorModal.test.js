import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorModal from '../App/Components/ErrorModal';

jest.mock('../App/Assets/Images/ErrorIllust.png', () => 'error-illustration.png');

describe('ErrorModal', () => {
  it('Should call the method prop on Try Again button press', () => {
    const mockMethod = jest.fn();
    const { getByText } = render(<ErrorModal method={mockMethod} />);
    fireEvent.press(getByText('Try Again!'));
    expect(mockMethod).toHaveBeenCalledTimes(1);
  });
});
