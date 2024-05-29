// ConfirmationModal.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfirmationModal from '../App/Components/ConfirmationModal'

describe('ConfirmationModal', () => {
    const props = {
        image: 'add',
        title: 'Is the Contact Data Correct?',
        desc: 'Make sure before saving your new contact',
        approveButton: `That's right, Save Contact`,
        rejectButton: 'Try checking again first',
        setShowConfirmationModal: jest.fn(),
        showConfirmationModal: true,
        method: jest.fn()
    };

    it('renders correctly with given props', () => {
        const { getByText, getByTestId } = render(<ConfirmationModal {...props} />);
        expect(getByText('Is the Contact Data Correct?')).toBeTruthy();
        expect(getByText('Make sure before saving your new contact')).toBeTruthy();
        expect(getByText(`That's right, Save Contact`)).toBeTruthy();
        expect(getByText('Try checking again first')).toBeTruthy();
    });

    it('calls method and setShowConfirmationModal when approve button is pressed', () => {
        const { getByText } = render(<ConfirmationModal {...props} />);
        fireEvent.press(getByText(`That's right, Save Contact`));
        expect(props.setShowConfirmationModal).toHaveBeenCalledWith(false);
        expect(props.method).toHaveBeenCalled();
    });

    it('calls setShowConfirmationModal when reject button is pressed', () => {
        const { getByText } = render(<ConfirmationModal {...props} />);
        fireEvent.press(getByText('Try checking again first'));
        expect(props.setShowConfirmationModal).toHaveBeenCalledWith(false);
    });
});
