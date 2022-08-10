import React, {useContext, useEffect, useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import {getCategories} from '../../../actions';
import {Context} from '../../../context';
import {CategoriesModel} from '../../../models/categories';
import endPoint from '../../../services/endPoints';
import useEcFetch from '../../../services/useEcFetch';
import colors from '../../../utils/colors';
import routes from '../../../utils/routes';
import useENavigation from '../../../utils/useENavigation';
import MainCategory from './components/mainCategory';
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

  const newRenderItem: React.FC<{item: CategoriesModel; index: number}> = ({
    item,
    index,
  }) => <MainCategory item={item} index={index} />;

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
