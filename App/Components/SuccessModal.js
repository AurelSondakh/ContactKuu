import React, { useState } from "react";
import { View, Text, Modal, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';

const width = Dimensions.get('screen').width;

const SuccessModal = ({method, title, desc}) => {
    const [showSuccessModal, setShowSuccessModal] = useState(true);

    return (
        <View style={{flex: 1}}>
            <Modal animationType='fade' visible={showSuccessModal} transparent={true} statusBarTranslucent>
                <SafeAreaView style={styles.modalDim}>
                    <View style={styles.modalBG}>
                        <View style={styles.modalContent}>
                            <Image source={require('../Assets/Images/SuccessIllust.png')} />
                            <Text style={styles.titleText}>{title}</Text>
                            <Text style={styles.descText}>{desc}</Text>
                            <View style={{justifyContent: 'center', marginTop: 17}}>
                                <TouchableOpacity onPress={() => {setShowSuccessModal(false); method();}} style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        Back
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    modalDim: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBG: {
        borderRadius: 15,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        width: width * 0.8,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15
    },
    titleText: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginBottom: 4,
        marginTop: 16,
        color: '#3B3B3B'
    },
    descText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        paddingHorizontal: 10,
        textAlign: 'center',
        color: '#898A8D'
    },
    button: {
        backgroundColor: '#E97802',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 96,
        marginLeft: 10
    },
    buttonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center'
    }
});
