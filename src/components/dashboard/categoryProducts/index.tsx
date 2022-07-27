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
import useEcFetch from '../../../services/useEcFetch';
import colors from '../../../utils/colors';
import routes from '../../../utils/routes';
import useENavigation from '../../../utils/useENavigation';
import Header from '../../common/header';
import useStyle from './styles';

interface Props {
  route: RouteProp<{RouteProps: {item}}, 'RouteProps'>;
}

const Products = ({
  route: {
    params: {item},
  },
}: Props) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const styles = useStyle();
  const ecFetch = useEcFetch();

  const fetchCategories = async () => {
    let getProducts = await ecFetch(endPoint.getProducts + item.id);

    getProducts = getProducts.map(item => {
      let keys = Object.keys(item.inventory);
      let newKeys = keys.map((itm, index) => {
        let newItem = {};
        index === 0 ? (newItem.isSelected = 1) : (newItem.isSelected = 0);
        newItem.key = itm;
        let prices = item.inventory[itm];
        newItem.mrp = prices.split(',')[0];
        newItem.discountMrp = prices.split(',')[1];

        if (index === 0) {
          try {
            item.selectedMrpPrice = newItem.mrp;
          } catch (error) {
            item.selectedPrice = '';
          }
          try {
            item.selectedDiscountPrice = newItem.discountMrp;
          } catch (error) {
            item.selectedPrice = '';
          }
        }

        return newItem;
      });
      item.newInventory = newKeys;
      return item;
    });
    setProducts(getProducts);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderChips: React.FC<{item; index}> = ({item, index}) => (
    <Chip selected={item.isSelected === 1}>{item.key}</Chip>
  );

  const chipSelected = (parenItem, item, parentIndex) => {
    console.log('selected', parentIndex);
    parenItem.selectedMrpPrice = item.mrp;
    parenItem.selectedDiscountPrice = item.discountMrp;
    parenItem.newInventory = parenItem.newInventory.map(itm => {
      item.key === itm.key ? (itm.isSelected = 1) : (itm.isSelected = 0);
      return itm;
    });
    let items = [...products];
    items[parentIndex] = parenItem;
    setProducts(items);
  };

  const addToCart = item => {
    setCartItems(cartItems.concat(item));
  };

  const {navigate} = useENavigation();

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
                  addToCart(item);
                }}>
                <Icon name="cart-plus" size={25} color={colors.primaryColor} />
              </Pressable>
            </View>
          </View>
          <ScrollView horizontal>
            {item.newInventory.map((itm, indx) => {
              return (
                <Chip
                  selected={itm.isSelected === 1}
                  onPress={() => {
                    chipSelected(item, itm, index);
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

  const moveToCartScreen = () => {
    navigate(routes.root.dashboard.cart.NAME, {
      cartItems,
    });
  };

  return (
    <SafeAreaView style={styles.parent}>
      <Header title={item.name} />
      <FlatList
        style={{flex: 1}}
        data={products}
        renderItem={newRenderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {cartItems.length > 0 && (
        <Pressable onPress={moveToCartScreen}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                backgroundColor: colors.primaryColor,
                padding: 10,
                color: 'white',
                fontSize: 15,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              {'Checkout ('}
              {cartItems.length}
              {' items in cart)'}
            </Text>
          </View>
        </Pressable>
      )}
    </SafeAreaView>
  );
};
export default Products;
