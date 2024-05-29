// ContactList.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContactList from '../App/Components/ContactList';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockedNavigate,
    }),
}));

jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');

describe('ContactList Component', () => {
    const mockItem = {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        photo: 'N/A',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with default user icon when photo is N/A', () => {
        const { getByText, getByTestId } = render(<ContactList item={mockItem} />);

        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('30')).toBeTruthy();
        expect(getByTestId('FontAwesome')).toBeTruthy();
    });

    it('renders correctly with image from external URL', () => {
        mockItem.photo = 'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550';
        const { getByTestId } = render(<ContactList item={mockItem} />);

        expect(getByTestId('contact-image').props.source.uri).toBe('http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550');
    });

    it('renders correctly with image from own device', () => {
        mockItem.photo = 'file:///data/user/0/com.contactkuu/photo.jpg';
        const { getByTestId } = render(<ContactList item={mockItem} />);

        expect(getByTestId('contact-image').props.source.uri).toBe('file:///data/user/0/com.contactkuu/photo.jpg');
    });

    it('navigates to ContactDetailPage on press', () => {
        const { getByTestId } = render(<ContactList item={mockItem} />);

        fireEvent.press(getByTestId('contact-item'));

        expect(mockedNavigate).toHaveBeenCalledWith('ContactDetailPage', { item: mockItem });
    });
});
