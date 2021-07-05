import React, { Component } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import {AppStyles} from "_styles";

const CustomModal = props => {
  return (
    <Modal
      visible={props.isModalVisible}
      backdropColor={"black"}
      animationType={"slide"}
      animationIn={"slideInUp"}
      animationInTiming={2000}
      animationOutTiming={2000}
      backdropTransitionInTiming={2000}
      backdropTransitionOutTiming={2000}
      backdropOpacity={0.01}
      onBackButtonPress={() => props.isOtp ? false :props.closeModal()}
      onBackdropPress={() =>  props.isOtp ? false :props.closeModal()}
      style={[AppStyles.bottomModal, props.modalStyle]}
    >
      {props.children}
    </Modal>
  );
};
export default CustomModal
