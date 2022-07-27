import {RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../../utils/colors';
import {dW} from '../../../utils/dynamicHeightWidth';
import Header from '../../common/header';

interface Props {
  route: RouteProp<{RouteProps: {cartItems: []}}, 'RouteProps'>;
}

const Checkout = () => {
  const [items, setItems] = useState([]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Checkout" disableBackButton />
      <View style={{flex: 1, marginStart: 40, marginEnd: 40, marginTop: 30}}>
        <TextInput
          keyboardType="numeric"
          label="First Name"
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          left={
            <TextInput.Icon name="human-greeting" color={colors.primaryColor} />
          }
          // style={styles.inputText}
        />
        <TextInput
          label="Email"
          // style={styles.inputTextPassword}
          style={{marginTop: 10}}
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          left={<TextInput.Icon name="email" color={colors.primaryColor} />}
        />
        <TextInput
          label="Address"
          // style={styles.inputTextPassword}
          style={{marginTop: 10}}
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          left={
            <TextInput.Icon name="location-exit" color={colors.primaryColor} />
          }
        />
        <TextInput
          label="City"
          // style={styles.inputTextPassword}
          style={{marginTop: 10}}
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          left={
            <TextInput.Icon name="location-exit" color={colors.primaryColor} />
          }
        />
        <TextInput
          label="Zip"
          // style={styles.inputTextPassword}
          style={{marginTop: 10}}
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          left={<TextInput.Icon name="pin" color={colors.primaryColor} />}
        />
        <TextInput
          label="Amount"
          // style={styles.inputTextPassword}
          style={{marginTop: 10}}
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          left={
            <TextInput.Icon name="currency-inr" color={colors.primaryColor} />
          }
        />
        <TextInput
          label="State"
          // style={styles.inputTextPassword}
          style={{marginTop: 10}}
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          left={<TextInput.Icon name="home-city" color={colors.primaryColor} />}
        />
        <Pressable
          style={{
            backgroundColor: colors.primaryColor,
            paddingHorizontal: dW(10),
            paddingVertical: dW(10),
            marginTop: dW(25),
            alignItems: 'center',
            borderRadius: dW(10),
            marginHorizontal: dW(50),
          }}>
          <Text style={{color: colors.buttonTextColor}}>Place Order</Text>
        </Pressable>
      </View>
      {/* <Pressable style={styles.registerButton} onPress={registerUser}>
        <Text style={styles.regisButtonTextColor}>Register Here</Text>
      </Pressable> */}
    </SafeAreaView>
  );
};
export default Checkout;
