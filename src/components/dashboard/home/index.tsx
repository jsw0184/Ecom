import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import endPoint from '../../../services/endPoints';
import useEcFetch from '../../../services/useEcFetch';
import colors from '../../../utils/colors';
import routes from '../../../utils/routes';
import useENavigation from '../../../utils/useENavigation';
import useStyle from './styles';

const Home = () => {
  const [topSliderImages, setTopSliderImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const {navigate} = useENavigation();

  const styles = useStyle();

  const ecFetch = useEcFetch();

  const fetchCategories = async () => {
    const getBanners = await ecFetch(endPoint.topBanner);
    const getCategories = await ecFetch(endPoint.allCategories);
    if (getBanners) {
      let images = [];
      getBanners.map(item => {
        images = images.concat(endPoint.baseUrlForImages + item.filename);
      });
      setTopSliderImages(images);
    }
    // console.log('images--->', getCategories);
    setCategories(getCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={3}
        dotStyle={{backgroundColor: colors.backgroundColor}}
        selectedDotStyle={{backgroundColor: colors.primaryColor}}
      />
    );
  };

  const Pager = () => (
    <View style={styles.firstSubParent}>
      <View style={styles.SubParentChildOne}></View>
      <View style={styles.SubParentChildTwo}></View>
      <View style={styles.absoluteViewPager}>
        <View style={styles.slider}>
          <IndicatorViewPager
            style={{flex: 1}}
            indicator={_renderDotIndicator()}
            autoPlayEnable>
            {topSliderImages.map((item, index) => {
              return (
                <View style={{flex: 1}} key={index} collapsable={false}>
                  <Image
                    style={{flex: 1, borderRadius: 10}}
                    source={{uri: item}}
                  />
                </View>
              );
            })}
          </IndicatorViewPager>
        </View>
      </View>
    </View>
  );

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

  const renderItem: React.FC<{item; index}> = ({item, index}) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingBottom: 10,
      }}>
      <Image
        style={{height: 80, width: 80, borderRadius: 10}}
        source={{uri: endPoint.baseUrlForImages + item.catimage}}></Image>
      <Text style={{marginStart: 10, color: 'black', fontSize: 18}}>
        {item.name}
      </Text>
    </View>
  );

  const moveToProductsScreen = item => {
    navigate(routes.root.dashboard.home.allProducts.NAME, {
      item,
    });
  };

  const newRenderItem: React.FC<{item; index}> = ({item, index}) => (
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
        data={categories}
        renderItem={newRenderItem}
        numColumns={2}
      />
    </SafeAreaView>
  );
};
export default Home;
