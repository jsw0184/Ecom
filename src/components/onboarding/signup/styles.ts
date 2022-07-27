import {StyleSheet} from 'react-native';
import colors from '../../../utils/colors';
import {dW} from '../../../utils/dynamicHeightWidth';

const useStyles = () => {
  return StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: dW(10),
    },
    mainParent: {
      backgroundColor: colors.backgroundColor,
      marginHorizontal: dW(30),
      marginTop: dW(30),
    },
    inputText: {
      borderColor: colors.borderColor,
      borderWidth: dW(1),
      paddingHorizontal: dW(8),
      paddingVertical: dW(8),
    },
    inputTextPassword: {
      borderColor: colors.borderColor,
      borderWidth: dW(1),
      paddingHorizontal: dW(8),
      paddingVertical: dW(8),
      marginTop: dW(25),
    },
    button: {
      backgroundColor: colors.primaryColor,
      paddingHorizontal: dW(10),
      paddingVertical: dW(10),
      marginTop: dW(25),
      alignItems: 'center',
      borderRadius: dW(10),
      marginHorizontal: dW(50),
    },
    registerButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: dW(30),
    },
    buttonTextColor: {
      color: colors.buttonTextColor,
    },
    regisButtonTextColor: {
      color: colors.primaryColor,
    },
  });
};
export default useStyles;
