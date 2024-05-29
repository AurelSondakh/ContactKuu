import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomePage from '../App/Containers/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import ContactList from '../App/Components/ContactList';
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

jest.mock('../App/Components/ErrorModal', () => jest.fn(() => null));
jest.mock('react-native-loading-spinner-overlay', () => 'Spinner');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-vector-icons/Entypo', () => 'Entypo');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');

describe('HomePage Component', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockContactList = {
        data: [
            { firstName: 'John', lastName: 'Doe', age: 30, photo: 'N/A' },
            { firstName: 'Jane', lastName: 'Doe', age: 25, photo: 'N/A' },
        ],
    };

    beforeEach(() => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    contactList: mockContactList,
                    contactSpinner: false,
                    errorModal: false,
                },
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the homepage correctly', () => {
        const { getByPlaceholderText, getByText } = render(<HomePage />);

        expect(getByPlaceholderText('Search name in your contact')).toBeTruthy();
        expect(getByText('Add Contact')).toBeTruthy();
        expect(getByText(/Friendship is born/)).toBeTruthy();
    });

    it('displays contacts when search value is empty', () => {
        const { getByText } = render(<HomePage />);

        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('Jane Doe')).toBeTruthy();
    });

    it('filters contacts based on search value', async () => {
        const { getByPlaceholderText, getByText, queryByText } = render(<HomePage />);

        fireEvent.changeText(getByPlaceholderText('Search name in your contact'), 'Jane');

        await waitFor(() => {
            expect(queryByText('John Doe')).toBeNull();
            expect(getByText('Jane Doe')).toBeTruthy();
        });
    });

    it('navigates to AddContactPage on add contact button press', () => {
        const { getByTestId } = render(<HomePage />);
    
        fireEvent.press(getByTestId('add-contact-button'));
        expect(mockedNavigate).toHaveBeenCalledWith('AddContactPage');
    });

    it('displays loading spinner when contactSpinner is true', () => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    contactList: mockContactList,
                    contactSpinner: true,
                    errorModal: false,
                },
            })
        );

        const { getByTestId } = render(<HomePage />);

        expect(getByTestId('spinner')).toBeTruthy();
    });

    it('displays error modal when errorModal is true', () => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    contactList: mockContactList,
                    contactSpinner: false,
                    errorModal: true,
                },
            })
        );

        render(<HomePage />);

        expect(ErrorModal).toHaveBeenCalledWith(expect.objectContaining({ method: expect.any(Function) }), {});
    });
});
