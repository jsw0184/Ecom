import React from 'react';
import {Image, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {CategoriesModel} from '../../../../../models/categories';
import endPoint from '../../../../../services/endPoints';
import routes from '../../../../../utils/routes';
import useENavigation from '../../../../../utils/useENavigation';
import useStyle from './styles';

const MainCategory: React.FC<{index: number; item: CategoriesModel}> = ({
  index,
  item,
}) => {
  const {navigate} = useENavigation();
  const styles = useStyle();

  const moveToProductsScreen = (item: CategoriesModel) => {
    navigate(routes.root.dashboard.home.allProducts.NAME, {
      item,
    });
  };
  return (
    <Card
      elevation={10}
      style={styles.cardParent}
      onPress={() => moveToProductsScreen(item)}>
      <View style={styles.subParent}>
        <Image
          style={styles.imgRound}
          source={{uri: endPoint.baseUrlForImages + item.catimage}}></Image>
        <Text style={styles.catName}>{item.name}</Text>
      </View>
    </Card>
  );
};

export default MainCategory;
