import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useENavigation from '../../../utils/useENavigation';

const BackButton = () => {
  const {goBack} = useENavigation();

  return (
    <Pressable onPress={goBack}>
      <Icon name="arrow-back-outline" size={30} color="#FFF" />
    </Pressable>
  );
};

export default BackButton;
