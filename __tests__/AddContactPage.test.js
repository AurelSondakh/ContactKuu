import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddContactPage from '../App/Containers/AddContactPage'
import ConfirmationModal from '../App/Components/ConfirmationModal';
import ErrorModal from '../App/Components/ErrorModal';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockedNavigate,
        addListener: jest.fn((_, callback) => callback()),
    }),
}));

jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('react-native-image-picker', () => 'Image');
jest.mock('react-native-loading-spinner-overlay', () => 'Spinner');
jest.mock('../App/Components/ConfirmationModal', () => jest.fn(() => null));
jest.mock('../App/Components/ErrorModal', () => jest.fn(() => null));

describe('AddContactPage Component', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    beforeEach(() => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    addContactSpinner: false,
                    errorModal: false,
                },
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the page correctly', () => {
        const { getByText, getByPlaceholderText } = render(<AddContactPage />);

        expect(getByText('Add Contact')).toBeTruthy();
        expect(getByPlaceholderText('First Name')).toBeTruthy();
        expect(getByPlaceholderText('Last Name')).toBeTruthy();
        expect(getByPlaceholderText('Age (number only)')).toBeTruthy();
        expect(getByText('Choose Photo from Gallery')).toBeTruthy();
        expect(getByText('SAVE CONTACT')).toBeTruthy();
        expect(getByText('CANCEL')).toBeTruthy();
    });

    it('disables save button when fields are empty', () => {
        const { getByTestId } = render(<AddContactPage />);
    
        const saveButton = getByTestId('save-contact-button');
        fireEvent.press(saveButton);
    
        const saveButtonStyle = saveButton.props.style;
        const expectedBackgroundColor = '#C3C3C3';
    
        expect(saveButtonStyle.backgroundColor).toBe(expectedBackgroundColor);
    });

    it('enables save button when all fields are filled', () => {
        const { getByPlaceholderText, getByTestId } = render(<AddContactPage />);

        const firstNameInput = getByPlaceholderText('First Name');
        const lastNameInput = getByPlaceholderText('Last Name');
        const ageInput = getByPlaceholderText('Age (number only)');

        fireEvent.changeText(firstNameInput, 'John');
        fireEvent.changeText(lastNameInput, 'Doe');
        fireEvent.changeText(ageInput, '30');

        const saveButton = getByTestId('save-contact-button');
        const saveButtonStyle = saveButton.props.style;
        const expectedBackgroundColor = '#E97802';

        expect(saveButtonStyle.backgroundColor).toBe(expectedBackgroundColor);
    });

    it('navigates to HomePage when cancel button is pressed', () => {
        const { getByText } = render(<AddContactPage />);

        fireEvent.press(getByText('CANCEL'));

        expect(mockedNavigate).toHaveBeenCalledWith('HomePage');
    });
    
    it('displays loading spinner when addContactSpinner is true', () => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    addContactSpinner: true,
                    errorModal: false,
                },
            })
        );

        const { getByTestId } = render(<AddContactPage />);

        expect(getByTestId('spinner')).toBeTruthy();
    });
});
