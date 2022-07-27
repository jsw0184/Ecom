import {StyleSheet} from 'react-native';
import colors from '../../../utils/colors';

const useStyle = () => {
  return StyleSheet.create({
    parent: {
      flex: 1,
    },
    firstSubParent: {
      flex: 4,
    },
    SubParentChildOne: {
      flex: 2,
      backgroundColor: colors.primaryColor,
    },
    SubParentChildTwo: {
      flex: 2,
      backgroundColor: colors.backgroundColor,
    },
    secondSubParent: {
      flex: 6,
      backgroundColor: colors.backgroundColor,
    },
    absoluteViewPager: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    slider: {
      flex: 1,

      marginLeft: 20,
      marginRight: 20,
      marginVertical: 20,
    },
  });
};
export default useStyle;
