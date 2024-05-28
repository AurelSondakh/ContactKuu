import React, { useState } from "react";
import { View, Text, Modal, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const SuccessModal = ({method, title, desc}) => {

    const [showSuccessModal, setShowSuccessModal] = useState(true)

    return (
        <View style={{flex: 1 }}>
            <Modal animationType='fade' visible={showSuccessModal} transparent={true} statusBarTranslucent>
                <SafeAreaView style={styles.modalDim}>
                    <View style={[styles.modalBG]}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginHorizontal: 15 }}>
                            <Image source={require('../Assets/Images/SuccessIllust.png')} />
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 18, marginBottom: 4, marginTop: 16, color: '#3B3B3B' }}>{title}</Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, paddingHorizontal: 10, textAlign: 'center' }}>{desc}</Text>
                            <View style={{ justifyContent: 'center', marginTop: 17 }}>
                                <TouchableOpacity onPress={() => {setShowSuccessModal(false); method()}} style={{ backgroundColor: '#E97802', borderRadius: 10, marginLeft: 10,  paddingHorizontal: 96, paddingVertical: 12 }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#FFF', alignSelf: 'center' }}>
                                        Back
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default SuccessModal
const styles = StyleSheet.create({
    modalDim: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalBG: {
        flex: 1,
        borderRadius: 15,
        marginHorizontal: width / 11,
        marginVertical: height / 3.5,
        backgroundColor: '#FFF',
        overflow: 'hidden'
    },
    modalTitle: {
        flexDirection: 'row',
        marginLeft: 21,
        marginTop: 21,
        marginBottom: 14
    },
})