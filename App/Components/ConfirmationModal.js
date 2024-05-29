import React, { useState } from "react";
import { View, Text, Modal, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import AddContactIllust from '../Assets/Images/AddContactIllust.png';
import DeleteContactIllust from '../Assets/Images/DeleteContactIllust.png';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const ConfirmationModal = ({image, title, desc, approveButton, rejectButton, setShowConfirmationModal, showConfirmationModal, method}) => {

    return (
        <View style={{flex: 1 }}>
            <Modal animationType='fade' visible={showConfirmationModal} transparent={true} statusBarTranslucent>
                <SafeAreaView style={styles.modalDim}>
                    <View style={[styles.modalBG]}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginHorizontal: 15 }}>
                            <Image source={(image === 'delete' ) ? DeleteContactIllust : AddContactIllust} />
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 18, marginBottom: 4, marginTop: 16, color: '#3B3B3B' }}>{title}</Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, paddingHorizontal: 10, textAlign: 'center' }}>{desc}</Text>
                            <View style={{ justifyContent: 'center', marginTop: 17 }}>
                                <TouchableOpacity onPress={() => {setShowConfirmationModal(false); method(); }} style={{ backgroundColor: '#E97802', borderRadius: 10, marginLeft: 10, paddingVertical: 12, width: width / 1.5 }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#FFF', alignSelf: 'center' }}>
                                        {approveButton}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'center', marginTop: 8 }}>
                                <TouchableOpacity onPress={() => {setShowConfirmationModal(false)}} style={{ borderColor: '#FF1212', borderWidth: 1, borderRadius: 10, marginLeft: 10,  width: width / 1.5, paddingVertical: 12 }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#FF1212', alignSelf: 'center' }}>
                                        {rejectButton}
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

export default ConfirmationModal
const styles = StyleSheet.create({
    modalDim: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalBG: {
        flex: 1,
        borderRadius: 15,
        marginHorizontal: width / 11,
        marginVertical: height / 4,
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