
import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Label,Text,Modal } from '_atoms';
import {AppStyles,Mixins} from '_styles';
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins

export default BottomModal = (props) => {
    let {customeStyle,labelCardStyle} =props
    return (
        <Modal
            isModalVisible={props.isModalVisible}
             modalStyle={{
                justifyContent: 'flex-end',
                borderRadius:0
         }}
            closeModal={() => props.closeModal()}>
            <View
                style={[
                    AppStyles.modalBottomContent,
                    customeStyle && customeStyle
                ]}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Label
                        title={props.title}
                        cross={props.labelRightIcon}
                        onPressRight={props.closeModal}
                        {...props}
                        cardStyle={[boxShadow('black',{},0.4),{
                        backgroundColor:'white'},labelCardStyle && labelCardStyle
                    ]}
                    />
                    {props.children}
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    )
}