import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, View} from 'react-native';

const History = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <Text>History Screen</Text>
    </SafeAreaView>
  );
};
export default History;
