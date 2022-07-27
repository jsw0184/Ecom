import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Card, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import endPoint from '../../../services/endPoints';
import colors from '../../../utils/colors';
import {dW} from '../../../utils/dynamicHeightWidth';
import routes from '../../../utils/routes';
import useENavigation from '../../../utils/useENavigation';
import Header from '../../common/header';

interface Props {
  route: RouteProp<{RouteProps: {cartItems: []}}, 'RouteProps'>;
}

const Cart = ({
  route: {
    params: {cartItems},
  },
}: Props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (cartItems) setItems(cartItems);
  }, [cartItems]);

  const newRenderItem: React.FC<{item; index}> = ({item, index}) => (
    <Card
      elevation={10}
      style={{
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 7,
        borderBottomColor: 'grey',
        padding: 10,
      }}
      key={index.toString()}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          flex: 1,
        }}>
        <Image
          style={{height: 80, width: 80, borderRadius: 10}}
          source={{uri: endPoint.baseUrlForImages + item.images}}></Image>
        <View style={{flex: 1, marginLeft: 8}}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '700',
            }}
            numberOfLines={2}>
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginBottom: 5,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '700',
                  textDecorationLine: 'line-through',
                }}>
                {'Rs ' + item.selectedMrpPrice}
              </Text>
              <Text
                style={{
                  color: colors.primaryColor,
                  fontSize: 15,
                  fontWeight: '700',
                  marginStart: 10,
                }}>
                {'Rs ' + item.selectedDiscountPrice}
              </Text>
            </View>
            <View>
              <Pressable
                onPress={() => {
                  // addToCart(item);
                }}
                style={{flexDirection: 'row'}}>
                <Icon
                  name="minus-circle"
                  size={20}
                  color={colors.primaryColor}
                />
                <Text>{1}</Text>
                <Icon
                  name="plus-circle"
                  size={20}
                  color={colors.primaryColor}
                />
              </Pressable>
            </View>
          </View>
          <ScrollView horizontal>
            {item.newInventory.map((itm, indx) => {
              return (
                <Chip
                  selected={itm.isSelected === 1}
                  onPress={() => {
                    // chipSelected(item, itm, index);
                  }}
                  key={indx.toString()}
                  mode="flat">
                  {itm.key}
                </Chip>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Card>
  );

  const TotalFooter = () => {
    let total = 0;
    items.map(item => {
      total += Number(item.selectedDiscountPrice);
    });

    const {navigate} = useENavigation();

    const moveToCheckout = () => {
      navigate(routes.root.dashboard.checkout.NAME);
    };

    return (
      <View style={{marginBottom: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text style={{color: 'black', fontSize: 15}}>Total</Text>
          <Text style={{color: 'black', fontSize: 15}}>{'Rs ' + total}</Text>
        </View>
        <Pressable
          style={{
            backgroundColor: colors.primaryColor,
            paddingHorizontal: dW(10),
            paddingVertical: dW(10),
            alignItems: 'center',
            borderRadius: dW(10),
            marginHorizontal: dW(50),
          }}
          onPress={moveToCheckout}>
          <Text style={{color: colors.buttonTextColor}}>Checkout</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Cart" disableBackButton={false} />
      <FlatList
        style={{flex: 1}}
        data={items}
        renderItem={newRenderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TotalFooter />
    </SafeAreaView>
  );
};
export default Cart;
