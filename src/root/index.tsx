import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {QueryClient, QueryClientProvider} from 'react-query';
import Cart from '../components/dashboard/cart';
import Products from '../components/dashboard/categoryProducts';
import Checkout from '../components/dashboard/checkout';
import History from '../components/dashboard/history';
import Home from '../components/dashboard/home';
import Settings from '../components/dashboard/settings';
import Login from '../components/onboarding/login';
import SignUp from '../components/onboarding/signup';
import colors from '../utils/colors';
import routes from '../utils/routes';

const Root = () => {
  const Stack = createStackNavigator();

  const checkUserLogIn = false;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            checkUserLogIn
              ? routes.root.dashboard.NAME
              : routes.root.onboarding.login.NAME
          }
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={routes.root.onboarding.login.NAME}
            component={Login}
          />
          <Stack.Screen
            name={routes.root.onboarding.signup.NAME}
            component={SignUp}
          />
          <Stack.Screen
            name={routes.root.dashboard.NAME}
            component={DashboarcNavigator}
          />
          <Stack.Screen
            name={routes.root.dashboard.home.allProducts.NAME}
            component={Products}
          />
          <Stack.Screen
            name={routes.root.dashboard.checkout.NAME}
            component={Checkout}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};
const Tab = createBottomTabNavigator();

const DashboarcNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === routes.root.dashboard.home.NAME) {
            iconName = focused ? 'md-home-outline' : 'md-home-outline';
          } else if (route.name === routes.root.dashboard.settings.NAME) {
            iconName = focused ? 'cog-outline' : 'cog-outline';
          } else if (route.name === routes.root.dashboard.history.NAME) {
            iconName = focused
              ? 'reload-circle-outline'
              : 'reload-circle-outline';
          } else {
            iconName = focused ? 'cart-outline' : 'cart-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabel: () => {
          let iconName;

          if (route.name === routes.root.dashboard.home.NAME) {
            iconName = 'Home';
          } else if (route.name === routes.root.dashboard.settings.NAME) {
            iconName = 'Settings';
          } else if (route.name === routes.root.dashboard.history.NAME) {
            iconName = 'History';
          } else {
            iconName = 'Cart';
          }
          return <Text>{iconName}</Text>;
        },
      })}>
      <Tab.Screen name={routes.root.dashboard.home.NAME} component={Home} />
      <Tab.Screen
        name={routes.root.dashboard.history.NAME}
        component={History}
      />
      <Tab.Screen name={routes.root.dashboard.cart.NAME} component={Cart} />
      <Tab.Screen
        name={routes.root.dashboard.settings.NAME}
        component={Settings}
      />
    </Tab.Navigator>
  );
};
export default Root;
