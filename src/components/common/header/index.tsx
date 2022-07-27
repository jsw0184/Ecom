import React from 'react';
import {Text, View} from 'react-native';
import colors from '../../../utils/colors';
import {dW} from '../../../utils/dynamicHeightWidth';
import BackButton from '../backButton';

const Header = ({
  title,
  disableBackButton = true,
}: {
  title: string;
  disableBackButton?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.primaryColor,
      }}>
      {disableBackButton && <BackButton />}

      <View>
        <Text style={{fontSize: dW(20), marginStart: dW(20), color: 'white'}}>
          {title}
        </Text>
      </View>
      <View>
        <Text style={{fontSize: dW(15)}}> </Text>
      </View>
    </View>
  );
};
export default Header;
