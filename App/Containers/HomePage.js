import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StatusBar, StyleSheet, TextInput, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import ContactList from "../Components/ContactList";
import { ActionContact } from "../Redux/Actions/Contact";
import ErrorModal from "../Components/ErrorModal";

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const HomePage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { contactList, contactSpinner, errorModal } = useSelector((state) => state.contact);
    const [searchValue, setSearchValue] = useState("");
    const [filteredContactList, setFilteredContactList] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          StatusBar.setBackgroundColor('#FFF');
          StatusBar.setBarStyle('dark-content');
          getAllContact();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (searchValue === "") {
            setFilteredContactList(contactList?.data || []);
        } else {
            const filtered = contactList?.data?.filter(contact =>
                contact?.firstName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                contact?.lastName?.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredContactList(filtered);
        }
    }, [searchValue, contactList]);

    const getAllContact = () => {
        try {
            dispatch(
                ActionContact.GetAllContact(),
            );
        } catch (error) {
          console.log('Error Get All Contact: ', error);
        }
    }

    return (
        <View style={styles.homeContainer}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBarContent}>
                    <MaterialIcons name='search' size={24} color={'#666'} style={{ marginLeft: 20 }} />
                    <TextInput
                        placeholder='Search name in your contact'
                        placeholderTextColor={'#666666'}
                        style={styles.searchBarTextInput}
                        onChangeText={(e) => setSearchValue(e)}
                    />
                </View>
            </View>
            {errorModal
                ? <ErrorModal method={getAllContact} />
                : (filteredContactList.length > 0)
                    ? <View style={{ height: height / 1.4 }}>
                        <FlatList
                            style={styles.contactListContainer}
                            nestedScrollEnabled
                            data={filteredContactList}
                            renderItem={({ item }) => <ContactList item={item} />}
                        />
                    </View>
                    : <View style={styles.noContactContainer}>
                        <Image source={require('../Assets/Images/NoContactIllust.png')} />
                        <Text style={styles.noContactTitle}>No Contact</Text>
                        <Text style={styles.noContactDesc}>You haven't added a contact yet</Text>
                    </View>
            }
            <View style={styles.bottomView}>
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddContactPage')}>
                        <Entypo name="squared-plus" size={29} color="#E97802" />
                    </TouchableOpacity>
                    <Text style={styles.addText}>Add Contact</Text>
                </View>
                <Text style={styles.quoteText}>
                    "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'"
                    {"\n"} <Text style={{ fontFamily: 'Poppins-Bold' }}>~ C.S. Lewis ~</Text>
                </Text>
            </View>
            <Spinner
                visible={contactSpinner}
                textContent={'Loading...'}
                textStyle={{ color: '#E97802' }}
            />
        </View>
    );
}

export default HomePage;

const styles = StyleSheet.create({
    homeContainer: { 
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 20
    },
    searchBarContainer: {
        borderWidth: 1,
        marginHorizontal: 25,
        borderColor: '#DADADA',
        borderRadius: 8,
    },
    searchBarTextInput: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        width: width / 1.5,
        marginHorizontal: 10,
        color: '#000'
    },
    searchBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactListContainer: {
        marginHorizontal: 25,
        marginTop: 25,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height / 6,
        backgroundColor: '#E97802',
        borderTopLeftRadius: width / 3.5,
        borderTopRightRadius: width / 3.5,
        alignItems: 'center',
        paddingTop: 40,
    },
    addButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -28
    }, 
    addButton: {
        width: 49,
        height: 49,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E47602',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#FFF',
        marginTop: 4
    },
    quoteText: {
        width: width / 1.2,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 30,
    },
    noContactContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    noContactTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: '#000',
        marginTop: -30
    },
    noContactDesc: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#000',
        marginTop: -5
    }
});
