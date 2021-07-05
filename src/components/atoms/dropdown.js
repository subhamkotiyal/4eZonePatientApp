
import React from "react";
import { View,TouchableOpacity} from "react-native";
import { Mixins, Typography } from '_styles'
import { Text,Card } from "_atoms";
import Modal from "react-native-modal";

let { margin, boxShadow, scaleSize, padding } = Mixins
const DropDown = ({ array, onSelect,isdropDown,closeModal}) => {
    return  <Modal
    visible={isdropDown}
    backdropColor={"black"}
    animationType={"slide"}
    animationIn={"slideInUp"}
    animationInTiming={2000}
    animationOutTiming={2000}
    backdropTransitionInTiming={2000}
    backdropTransitionOutTiming={2000}
    backdropOpacity={0.01}
    onBackButtonPress={() =>closeModal()}
    onBackdropPress={() => closeModal()}
    style={[{flex:1,alignItems:'flex-end'}]}
  ><View style={[boxShadow('black'), {
        backgroundColor: 'white',
        zIndex:1000,
        paddingHorizontal: 16
    }]}>
        {[1, 1, 1, 1, 1, 1].map((item, index) => 
        <TouchableOpacity 
        onPress={()=> onSelect(item)}
        style={{ paddingVertical: 4 }}>
            <Text p>Test Ha</Text>
        </TouchableOpacity>)}
    </View>
    </Modal>
}

export default DropDown;
