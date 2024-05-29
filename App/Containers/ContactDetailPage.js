import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ContactDetailPage = (props) => {
    
    const navigation = useNavigation()
    const ownDevicePattern = "file:///data/user/0/com.contactkuu/";
    const item = props?.route?.params?.item

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          StatusBar.setBackgroundColor('#D86F02');
          StatusBar.setBarStyle('light-content');
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'chevron-left'} size={28} color={'#FFF'} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                {item?.photo !== 'N/A' ? (
                    item?.photo.startsWith('http://') ? (
                        <Image 
                            source={{ uri: item?.photo }} 
                            style={styles.image}
                        />
                    ) : (
                        item?.photo.startsWith(ownDevicePattern) ? (
                            <Image 
                                source={{ uri: item?.photo }} 
                                style={styles.image}
                            />
                        ) : (
                            <FontAwesome name={'user-circle'} color={'#C9DBD5'} size={144} style={styles.icon} />
                        )
                    )
                ) : (
                    <FontAwesome name={'user-circle'} color={'#C9DBD5'} size={144} style={styles.icon} />
                )}
            </View>
            <Text style={styles.fullname}>{item?.firstName} {item?.lastName}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('EditContactPage', {item})} style={[styles.button, {backgroundColor: 'rgba(0, 76, 50, 0.12)'}]}>
                    <View style={styles.buttonContent}>
                        <FontAwesome5 name={'pencil-alt'} size={18} color={'#004C32'} />
                        <Text style={styles.buttonText}>Edit Contact</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'rgba(255, 210, 210, 0.79)'}]}>
                    <View style={styles.buttonContent}>
                        <FontAwesome5 name={'trash-alt'} size={18} color={'#FF1212'} />
                        <Text style={styles.buttonTextDelete}>Delete Contact</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.biodataContainer}>
                <View style={styles.fullnameContainer}>
                    <AntDesign name={'questioncircle'} color={'#E97802'} size={20} />
                    <Text style={styles.fullnameTitle}>Fullname</Text>
                    <Text style={styles.fullnameValue}>{item?.firstName} {item?.lastName}</Text>
                </View>
                <View style={[styles.fullnameContainer, { marginTop: 8 }]}>
                    <AntDesign name={'calendar'} color={'#E97802'} size={20} />
                    <Text style={styles.fullnameTitle}>Age</Text>
                    <Text style={styles.fullnameValue}>{item?.age} y.o</Text>
                </View>
            </View>
            <View style={styles.illustContainer}>
                <Image style={{ marginTop: -10, justifyContent: 'center', alignItems: 'center' }} source={require('../Assets/Images/ContactDetailIllust.png')} />
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.quoteText}>
                "A real friend is one who walks in when the rest of the world walks out."
                    {"\n"} <Text style={{ fontFamily: 'Poppins-Bold' }}>~ Walter Winchell ~</Text>
                </Text>
            </View>
        </View>
    )
}

export default ContactDetailPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerContainer: {
        paddingLeft: 18,
        paddingTop: 10,
        paddingBottom: 65,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#D86F02',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -72
    },
    image: {
        width: 144,
        height: 144,
        borderRadius: 72,
    },
    icon: {
        width: 144,
        height: 144,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    fullname: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#000',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 14
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 11
    },
    buttonContent: {
        flexDirection: 'row'
    },
    buttonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#004C32',
        marginLeft: 11
    },
    buttonTextDelete: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#FF1212',
        marginLeft: 11
    },
    biodataContainer: {
        marginTop: 24,
        marginHorizontal: 44,
        paddingHorizontal: 25,
        paddingVertical: 26,
        backgroundColor: '#FFF',
        borderRadius: 5,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fullnameTitle: {
        flex: 1,
        marginLeft: 12,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#3B3B3B'
    }, 
    fullnameValue: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#000'
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 24,
        paddingBottom: 20,
        backgroundColor: '#E97802',
        alignItems: 'center',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
    quoteText: {
        width: width / 1.2,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
    },
    illustContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})