import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SuccessModal from '../App/Components/SuccessModal';

jest.mock('../App/Assets/Images/SuccessIllust.png', () => 'success-illustration.png');

describe('SuccessModal', () => {
  it('Should call the method prop on Back button press', () => {
    const mockMethod = jest.fn();

    const { getByText } = render(<SuccessModal method={mockMethod} />);

    fireEvent.press(getByText('Back'));

    expect(mockMethod).toHaveBeenCalledTimes(1);
  });
});
