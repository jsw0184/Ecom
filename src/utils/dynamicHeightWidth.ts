import { Dimensions, Platform } from 'react-native';

/**
 * dimension class
 */
export const standardDeviceSize =
  Platform.OS === 'web'
    ? {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      }
    : { width: 375, height: 667 };

export const actualDeviceSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export const dH = (actualHeight: number) => {
  const heightRatio = (actualHeight + 0) / standardDeviceSize.height;
  const windowHeight = Dimensions.get('window').height;
  const reqHeight = heightRatio * windowHeight;
  return reqHeight;
};

export const dW = (actualWidth: number) => {
  const widthRatio = (actualWidth + 0) / standardDeviceSize.width;
  const windowWidth = Dimensions.get('window').width;
  const reqWidth = widthRatio * windowWidth;
  return reqWidth;
};
