import {CommonActions, useNavigation} from '@react-navigation/native';

const useENavigation = () => {
  const {navigate, goBack, dispatch, push} = useNavigation();
  const reset = (path: string, params: any) => {
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: path, params}],
      }),
    );
  };
  return {navigate, push, goBack, reset};
};

export default useENavigation;
