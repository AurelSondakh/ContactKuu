import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactDetailPage from '../App/Containers/ContactDetailPage'
import { ActionContact } from '../App/Redux/Actions/Contact';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

const mockedGoBack = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockedGoBack,
        navigate: mockedNavigate,
        addListener: jest.fn((_, callback) => callback()),
    }),
}));

jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-loading-spinner-overlay', () => 'Spinner');

describe('ContactDetailPage Component', () => {
    const mockDispatch = jest.fn().mockRejectedValue({ response: { status: 400 } });
    useDispatch.mockReturnValue(mockDispatch);

    const mockRoute = {
        params: {
            item: {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                age: 30,
                photo: 'N/A'
            }
        }
    };

    beforeEach(() => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    deleteContactSpinner: false,
                    errorModal: false,
                },
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getByTestId } = render(<ContactDetailPage route={mockRoute} />);
        
        expect(getByText('30 y.o')).toBeTruthy();
        expect(getByText('Edit Contact')).toBeTruthy();
        expect(getByText('Delete Contact')).toBeTruthy();
        expect(getByTestId('FontAwesome')).toBeTruthy();
    });

    it('navigates back when back button is pressed', () => {
        const { getByTestId } = render(<ContactDetailPage route={mockRoute} />);
        const backButton = getByTestId('back-button');

        fireEvent.press(backButton);

        expect(mockedGoBack).toHaveBeenCalled();
    });

    it('shows confirmation modal when delete button is pressed', async () => {
        const { getByText } = render(<ContactDetailPage route={mockRoute} />);
        const deleteButton = getByText('Delete Contact');

        fireEvent.press(deleteButton);

        await waitFor(() => {
            expect(getByText('Are you sure you want to delete this contact?')).toBeTruthy();
        });
    });

    it('displays loading spinner when deleting contact', async () => {
        useSelector.mockImplementation(callback =>
            callback({
                contact: {
                    deleteContactSpinner: true,
                    errorModal: false,
                },
            })
        );

        const { getByTestId } = render(<ContactDetailPage route={mockRoute} />);
        expect(getByTestId('spinner')).toBeTruthy();
    });
});
