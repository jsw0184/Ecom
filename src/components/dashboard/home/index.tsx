import React, {useContext, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import {connect} from 'react-redux';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import {getCategories} from '../../../actions';
import {Context} from '../../../context';
import endPoint from '../../../services/endPoints';
import useEcFetch from '../../../services/useEcFetch';
import colors from '../../../utils/colors';
import routes from '../../../utils/routes';
import useENavigation from '../../../utils/useENavigation';
import useStyle from './styles';

const Home = ({categories, getCategories}) => {
  const [topSliderImages, setTopSliderImages] = useState([]);
  const {state: allCategories, setCategories} = useContext(Context);

  const {navigate} = useENavigation();

  const styles = useStyle();

  const ecFetch = useEcFetch();

  const fetchCategories = async () => {
    const getBanners = await ecFetch(endPoint.topBanner);

    if (getBanners) {
      let images = [];
      getBanners.map(item => {
        images = images.concat(endPoint.baseUrlForImages + item.filename);
      });
      setTopSliderImages(images);
    }
  };

  useEffect(() => {
    fetchCategories();
    getCategories();
  }, []);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={3}
        dotStyle={{backgroundColor: colors.backgroundColor}}
        selectedDotStyle={{backgroundColor: colors.primaryColor}}
      />
    );
  };

  const NewPager = () => (
    <View style={{flex: 1, height: 200, margin: 10}}>
      <IndicatorViewPager
        style={{flex: 1}}
        indicator={_renderDotIndicator()}
        autoPlayEnable>
        {topSliderImages.map((item, index) => {
          return (
            <View style={{flex: 1}} key={index} collapsable={false}>
              <Image style={{flex: 1, borderRadius: 10}} source={{uri: item}} />
            </View>
          );
        })}
      </IndicatorViewPager>
    </View>
  );

  const moveToProductsScreen = item => {
    navigate(routes.root.dashboard.home.allProducts.NAME, {
      item,
    });
  };

  const newRenderItem: React.FC<{item; index: number}> = ({item, index}) => (
    <Card
      elevation={10}
      style={{
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 7,
        justifyContent: 'center',
        borderBottomColor: 'grey',
        paddingBottom: 10,
        paddingTop: 10,
      }}
      onPress={() => moveToProductsScreen(item)}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: 105, width: 105, borderRadius: 10}}
          source={{uri: endPoint.baseUrlForImages + item.catimage}}></Image>

        <Text
          style={{
            color: 'black',
            fontSize: 15,
            textAlign: 'center',
            marginTop: 8,
          }}>
          {item.name}
        </Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.parent}>
      <FlatList
        style={{flex: 1}}
        ListHeaderComponent={<NewPager />}
        ListHeaderComponentStyle={{flex: 1}}
        data={allCategories}
        renderItem={newRenderItem}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const getStateToProps = state => {
  return {
    categories: state.data.categories,
  };
};

export default connect(getStateToProps, {getCategories})(Home);
