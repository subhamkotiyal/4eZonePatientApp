
import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Modal} from '_atoms'
import {AppStyles,Mixins,Colors} from '_styles';

const ListModal = ({ isModalVisible, closeModal, array, title, labelRightIcon, onPressSelect, customeStyle, modalValue }, props) => {
    return (
        <Modal
            isModalVisible={isModalVisible}
            modalStyle={{
                justifyContent: 'center',
                borderRadius: 0,
                // backgroundColor: 'rgba(255, 255, 255, 0.1)',

            }}
            closeModal={() => closeModal()}>
            <View
                style={[
                    styles.modalBottomContent,
                    customeStyle && { ...customeStyle, },{
                        marginHorizontal:moderateScale(16), 
                    }
                ]}>
                <View style={{ marginTop: 2}}>
                    <FlatList
                        data={array}
                        keyExtractor={(item, index) => index + 'list'}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity 
                            onPress={() => onPressSelect && onPressSelect(item) }
                            style={[styles.rowSpaceBetween,
                            { backgroundColor: 'white',   
                                paddingHorizontal:16,
                                 paddingVertical:moderateScale(10) }]}>
                                <View style={{ 
                                    justifyContent: 'center', flex: 0.9 }}>
                                    <Text style={[styles.label, { fontSize: RFValue(16), paddingLeft: moderateScale(16) }]}>
                                        {item.name}</Text>
                                </View>
                                <TouchableOpacity 
                                    hitSlop={{ left: 50, right: 50, top: 50, botoom: 50 }}

                                    onPress={() => onPressSelect && onPressSelect(item) }
                                    style={{ justifyContent: 'center' }}>
                                        
                                        <Ionicons name={item.isSelected ?'ios-checkmark-circle' : 'ios-checkmark-circle-outline'} 
                                        size={28}
                                        color={'black'} />
                                     

                                </TouchableOpacity>
                            </TouchableOpacity>}
                    />
                </View>
            </View>
        </Modal>
    )
}
export default ListModal
const styles = StyleSheet.create(
    {
        rowSpaceBetween: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        modalBottomContent: {
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            // borderTopRightRadius: 15,
            // borderTopLeftRadius: 15,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },

        label: {
            fontSize: RFValue(16),
            color: Colors.black,
        },

    }
)