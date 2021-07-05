
import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Label, Text, Modal } from '_atoms';
import { AppStyles ,Colors} from '_styles';
export default CenterModal = ({ isModalVisible,fromQr, closeModal, title, labelRightIcon, children, cardStyle }, props) => {
    return (
        <Modal
            isModalVisible={isModalVisible}
            modalStyle={{
                justifyContent: fromQr ? 'flex-start' : 'center',
                paddingHorizontal: 16,
                borderRadius: 0,
            }}
            closeModal={() => closeModal()}>
            {
                (labelRightIcon) && <TouchableOpacity
                activeOpacity={0.9}
                    hitSlop={{ left: 25, right: 25, top: 25, bottom: 25 }}
                    onPress={() => (closeModal ? closeModal() : null)}
                    style={{
                        flex: 0.22,
                        alignItems: 'flex-start', justifyContent: 'center'
                    }}>
                    {
                        <Icon  name={'ios-close'} size={28} color={Colors.white}/>                    }
                </TouchableOpacity>
            }
            <View
                style={[
                    AppStyles.modalBottomContent,
                    {
                        paddingVertical: 16,
                    },
                    cardStyle && cardStyle
                ]}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    {title && <Label
                        title={title}
                        cross={labelRightIcon}
                        onPressRight={closeModal}

                    // {...props}
                    />}
                    {children}
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    )
}