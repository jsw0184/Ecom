import {StyleSheet} from 'react-native';

const useStyle = () => {
  return StyleSheet.create({
    cardParent: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 7,
      justifyContent: 'center',
      borderBottomColor: 'grey',
      paddingBottom: 10,
      paddingTop: 10,
    },
    subParent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgRound: {height: 105, width: 105, borderRadius: 10},
    catName: {color: 'black', fontSize: 15, textAlign: 'center', marginTop: 8},
  });
};

export default useStyle;
