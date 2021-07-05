import React from "react";
import { View } from "react-native";
import { Mixins, Typography } from '_styles'
let { margin, boxShadow, scaleSize ,padding} = Mixins
const Card = ({children,cardStyle}) => {
    return <View style={[boxShadow('black',
        { heigh: 1, width: 1 }, 0.2,2),
        padding(16),{ flex: 1, backgroundColor: 'white'},cardStyle && cardStyle]}
          >
        {children}
    </View>
}


export default Card;
