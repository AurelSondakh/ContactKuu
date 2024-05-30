import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { launchImageLibrary } from 'react-native-image-picker';
import ConfirmationModal from "../Components/ConfirmationModal";
import Spinner from 'react-native-loading-spinner-overlay';
import { ActionContact } from "../Redux/Actions/Contact";
import ErrorModal from "../Components/ErrorModal";
import SuccessModal from "../Components/SuccessModal";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const AddContactPage = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { addContactSpinner, errorModal } = useSelector((state) => state.contact);
    const [selectedImage, setSelectedImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const [saveButtonHitted, setSaveButtonHitted] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('#DB7102');
            StatusBar.setBarStyle('light-content');
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (firstName !== '' && lastName !== '' && age !== '') {
            setDisableSaveButton(false)
        } else setDisableSaveButton(true)
    }, [firstName, lastName, age, selectedImage])

    const handlePhoto = () => {
        const options = {
            mediaType: 'photo'
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error');
            } else if (response.customButton) {
                console.log('User tapped custom button');
            } else {
                const source = { uri: response.assets[0]?.uri };
                setSelectedImage(source.uri);
                console.log('Image selected: ', source);
            }
        });
    }

    const saveContact = async () => {
        let data = {
            firstName: firstName,
            lastName: lastName,
            age: Number(age),
            photo: selectedImage ?? 'N/A'
        }
        console.log(data)
        console.log(JSON.stringify(data))
        try {
            await dispatch(
                ActionContact.AddContact(data),
            );
        } catch (error) {
            console.log('Error Add Contact: ', error);
        }
        setSaveButtonHitted(true)
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add Contact</Text>
                </View>
                <View style={styles.formWrapper}>
                    <View style={styles.formContainer}>
                        <View style={styles.fullnameContainer}>
                            <View style={styles.fullnameTitle}>
                                <AntDesign name={'questioncircle'} color={'#E97802'} size={20} />
                                <Text style={styles.titleText}>What his/her name?</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="First Name"
                                    placeholderTextColor={'#666666'}
                                    onChangeText={(e) => setFirstName(e)}
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Last Name"
                                    placeholderTextColor={'#666666'}
                                    onChangeText={(e) => setLastName(e)}
                                />
                            </View>
                        </View>
                        <View style={styles.ageContainer}>
                            <View style={styles.ageTitle}>
                                <AntDesign name={'calendar'} color={'#E97802'} size={20} />
                                <Text style={styles.titleText}>Please fill out age</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Age (number only)"
                                    keyboardType="number-pad"
                                    placeholderTextColor={'#666666'}
                                    onChangeText={(e) => setAge(e)}
                                />
                            </View>
                        </View>
                        <View style={styles.photoContainer}>
                            <View style={styles.photoTitle}>
                                <FontAwesome name={'user'} color={'#E97802'} size={22} style={{ marginLeft: 3 }} />
                                <Text style={styles.titleText}>Add image to this profile</Text>
                            </View>
                            {selectedImage ? (
                                <View style={styles.changePhotoBox}>
                                    <Image source={{ uri: selectedImage }} style={{ width: 105, height: 105, borderRadius: 8 }} />
                                    <TouchableOpacity style={styles.changePhotoButton} onPress={() => handlePhoto()}>
                                        <FontAwesome name="camera" size={23} color="#C3C3C3" />
                                        <Text style={styles.photoText}>Change Photo</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.photoBox} onPress={() => handlePhoto()}>
                                    <FontAwesome name="camera" size={23} color="#C3C3C3" />
                                    <Text style={styles.photoText}>Choose Photo from Gallery</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity testID="save-contact-button" disabled={disableSaveButton} style={[styles.saveButton, { backgroundColor: !disableSaveButton ? '#E97802' : '#C3C3C3' }]} onPress={() => setShowConfirmationModal(true)}>
                        <Text style={styles.saveText}>SAVE CONTACT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('HomePage')}>
                        <Text style={styles.cancelText}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
                {showConfirmationModal
                    ? <ConfirmationModal
                        image={'add'}
                        title={'Is the Contact Data Correct?'}
                        desc={'Make sure before saving your new contact'}
                        approveButton={`That's right, Save Contact`}
                        rejectButton={'Try checking again first'}
                        setShowConfirmationModal={setShowConfirmationModal}
                        showConfirmationModal={showConfirmationModal}
                        method={saveContact}
                    />
                    : null
                }
                {saveButtonHitted && !errorModal && !addContactSpinner
                    ? <SuccessModal method={() => navigation.navigate('HomePage')} title={'Contacts Saved Successfully!'} desc={'You can find your new contact on the homepage'} />
                    : (saveButtonHitted && errorModal && !addContactSpinner)
                        ? <ErrorModal method={() => saveContact()} />
                        : null
                }
                <Spinner
                    testID="spinner"
                    visible={addContactSpinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#E97802' }}
                />
            </ScrollView>
        </View>
    )
}

export default AddContactPage

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    header: {
        backgroundColor: '#DB7102',
        paddingTop: 24,
        paddingBottom: 55,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#FFF',
        textAlign: 'center'
    },
    formWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: -height / 25
    },
    formContainer: {
        width: width / 1.2,
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fullnameContainer: {
        width: '100%',
    },
    fullnameTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        marginLeft: 12,
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#3B3B3B',
    },
    input: {
        height: 40,
        borderColor: '#DADADA',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 8,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#000'
    },
    ageContainer: {
        width: '100%',
        marginTop: 21
    },
    ageTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    photoContainer: {
        width: '100%',
        marginTop: 21,
    },
    photoTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    photoBox: {
        paddingVertical: 24,
        borderColor: '#C3C3C3',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    photoText: {
        marginTop: 6,
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#C3C3C3',
    },
    buttonContainer: {
        paddingHorizontal: 37,
        paddingBottom: 20,
    },
    saveButton: {
        backgroundColor: '#E97802',
        paddingVertical: 12,
        borderRadius: 8
    },
    saveText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        width: width / 1.2,
    },
    cancelButton: {
        marginTop: 9,
        borderWidth: 1,
        borderColor: '#FF1212',
        paddingVertical: 12,
        borderRadius: 8
    },
    cancelText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#FF1212',
        textAlign: 'center',
        width: width / 1.2,
    },
    changePhotoBox: {
        paddingVertical: 17,
        borderColor: '#C3C3C3',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'dashed',
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    changePhotoButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
