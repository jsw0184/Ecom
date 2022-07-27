import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../../utils/colors';
import routes from '../../../utils/routes';
import useStyles from './styles';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const styles = useStyles();

  const registerUser = () => {
    navigation.navigate(routes.root.onboarding.signup.NAME);
  };
  const goToDashboard = () => {
    navigation.navigate(routes.root.dashboard.NAME);
  };

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.mainParent}>
        <Image
          style={{height: 200, width: 200, alignSelf: 'center'}}
          source={require('./../../../assets/images/index.jpg')}
        />
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          label="Enter your phone number"
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          // style={styles.inputText}
          left={<TextInput.Icon name="email" color={colors.primaryColor} />}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          label="Enter your password"
          // style={styles.inputTextPassword}
          style={{marginTop: 10}}
          mode="outlined"
          dense
          activeOutlineColor={colors.primaryColor}
          left={<TextInput.Icon name="eye" color={colors.primaryColor} />}
        />
        <Pressable style={styles.button} onPress={goToDashboard}>
          <Text style={styles.buttonTextColor}>Login</Text>
        </Pressable>
      </View>
      {/* <Pressable style={styles.registerButton} onPress={registerUser}>
        <Text style={styles.regisButtonTextColor}>Register Here</Text>
      </Pressable> */}
    </SafeAreaView>
  );
};
export default Login;
