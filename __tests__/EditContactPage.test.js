import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import EditContactPage from '../App/Containers/EditContactPage'
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

describe('EditContactPage Component', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    beforeEach(() => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    editContactSpinner: false,
                    errorModal: false,
                },
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the page correctly', () => {
        const { getByText, getByPlaceholderText } = render(<EditContactPage />);

        expect(getByText('Edit Contact')).toBeTruthy();
        expect(getByPlaceholderText('First Name')).toBeTruthy();
        expect(getByPlaceholderText('Last Name')).toBeTruthy();
        expect(getByPlaceholderText('Age (number only)')).toBeTruthy();
        expect(getByText('Choose Photo from Gallery')).toBeTruthy();
        expect(getByText('SAVE CHANGES')).toBeTruthy();
        expect(getByText('DISCARD CHANGES')).toBeTruthy();
    });

    it('disables save button when fields are empty', () => {
        const { getByPlaceholderText, getByTestId } = render(<EditContactPage />);

        const firstNameInput = getByPlaceholderText('First Name');
        const lastNameInput = getByPlaceholderText('Last Name');
        const ageInput = getByPlaceholderText('Age (number only)');

        fireEvent.changeText(firstNameInput, '');
        fireEvent.changeText(lastNameInput, '');
        fireEvent.changeText(ageInput, '');
    
        const saveButton = getByTestId('save-contact-button');
        fireEvent.press(saveButton);
    
        const saveButtonStyle = saveButton.props.style;
        const expectedBackgroundColor = '#C3C3C3';
    
        expect(saveButtonStyle.backgroundColor).toBe(expectedBackgroundColor);
    });

    it('enables save button when all fields are filled', () => {
        const { getByPlaceholderText, getByTestId } = render(<EditContactPage />);

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
        const { getByText } = render(<EditContactPage />);

        fireEvent.press(getByText('DISCARD CHANGES'));

        expect(mockedNavigate).toHaveBeenCalledWith('HomePage');
    });
    
    it('displays loading spinner when editContactSpinner is true', () => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    editContactSpinner: true,
                    errorModal: false,
                },
            })
        );

        const { getByTestId } = render(<EditContactPage />);

        expect(getByTestId('spinner')).toBeTruthy();
    });
});
