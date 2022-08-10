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
import MainCategory from './components/mainCategory';
import useStyle from './styles';

const Home = ({categories, getCategories}) => {
  const [topSliderImages, setTopSliderImages] = useState<string[]>([]);
  const {state: allCategories, setCategories} = useContext(Context);

  const styles = useStyle();

  const ecFetch = useEcFetch();

  const fetchCategories = async () => {
    const getBanners = await ecFetch(endPoint.topBanner);

    if (getBanners) {
      let images: string[] = [];
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
        pageCount={topSliderImages.length}
        dotStyle={styles.dotStyle}
        selectedDotStyle={styles.selectedDotStyle}
      />
    );
  };

  const NewPager = () => (
    <View style={styles.pagerParent}>
      <IndicatorViewPager
        style={styles.indicatorPager}
        indicator={_renderDotIndicator()}
        autoPlayEnable>
        {topSliderImages.map((item, index) => {
          return (
            <View style={styles.indicatorPager} key={index} collapsable={false}>
              <Image style={styles.pagerImage} source={{uri: item}} />
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
        ListHeaderComponentStyle={styles.listHeader}
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
