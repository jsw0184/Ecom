import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../common/header';
import useStyles from './styles';

const SignUp = () => {
  const styles = useStyles();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPinCode] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.parent}>
      <Header title={'Register'} />
      <View style={styles.mainParent}>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          placeholder="Enter your phone number"
          style={styles.inputText}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={styles.inputTextPassword}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={styles.inputTextPassword}
        />
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
          style={styles.inputTextPassword}
        />
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
          style={styles.inputTextPassword}
        />
        <TextInput
          value={pincode}
          onChangeText={setPinCode}
          placeholder="Enter your pincode"
          style={styles.inputTextPassword}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          style={styles.inputTextPassword}
        />
        <Pressable style={styles.button}>
          <Text style={styles.buttonTextColor}>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default SignUp;
