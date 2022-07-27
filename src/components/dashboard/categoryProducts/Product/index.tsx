import React from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import endPoint from '../../../../services/endPoints';
import colors from '../../../../utils/colors';

const Product: React.FC<{item; index; onChipSelected}> = ({
  item,
  index,
  onChipSelected,
}) => {
  console.log(index);

  return (
    <Card
      elevation={10}
      style={{
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 7,
        borderBottomColor: 'grey',
        padding: 10,
      }}>
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
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: '700',
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
          <ScrollView horizontal>
            {item.newInventory.map(itm => {
              return (
                <Pressable
                  onPress={() => {
                    onChipSelected(item, itm, index);
                  }}>
                  <View
                    style={{
                      borderColor: colors.primaryColor,
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <Text>{itm.key}</Text>
                  </View>
                </Pressable>
                // <Chip
                //   selected={itm.isSelected === 1}
                //   onPress={React.useCallback(() => {
                //     onChipSelected(item, itm, index);
                //   }, [itm.key])}
                //   key={itm.key.toString()}
                //   //   onPress={() => console.log('Pressed')}
                // >
                //   {itm.key}
                // </Chip>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Card>
  );
};

export default Product;
