import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ContactList = ({ item }) => {
    return (
        <View style={styles.contactContainer}>
            <View style={styles.row}>
                <View>
                    {item?.photo !== 'N/A' && item?.photo.startsWith('http://')
                        ? <Image 
                            source={{ uri: `${item?.photo}` }} 
                            style={styles.image}
                          />
                        : <FontAwesome name={'user-circle'} color={'#C9DBD5'} size={36} style={styles.icon} />
                    }
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item?.firstName} {item?.lastName}</Text>
                    <Text style={styles.age}><FontAwesome5 name={'calendar-alt'} /> {item?.age}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <FontAwesome5 name={'chevron-right'} size={8} color={'#FFF'} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contactContainer: {
        borderWidth: 1,
        borderColor: '#CACEDD',
        borderRadius: 6,
        marginBottom: 14
    },
    row: {
        marginVertical: 10,
        marginHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 38,
        height: 38,
        borderRadius: 25,
    },
    icon: {
        width: 38,
        height: 38,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    name: {
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        color: '#000'
    },
    age: {
        fontSize: 11,
        fontFamily: 'Poppins-SemiBold',
        color: '#C3C4CC'
    },
    iconContainer: {
        width: 16,
        height: 16,
        borderRadius: 12,
        backgroundColor: '#E97802',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ContactList;
