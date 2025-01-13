import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../src/styles/color';
import Typography from '../../src/styles/typhography';
import { STRINGS } from '../../src/config/string';

const BoongtamStoreCard = ({ item, likeCounts, toggleLike, onPressDetail }) => {
  return (
    <TouchableOpacity onPress={onPressDetail}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardInfo}>
            리뷰 {(item.reviews ?? 0).toString()}개 | 거리 {(item.distance ?? '0M').toString()}
          </Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.orderButton} onPress={onPressDetail}>
              <View style={styles.orderButtonContent}>
                <MaterialIcons name="phishing" size={24} color={Colors.gray500} />
                <Text style={styles.orderButtonText}>{STRINGS.BOONG_TAM.TITLE}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.routeButton}>
              <View style={styles.naviButtonContent}>
                <MaterialIcons name="navigation" size={24} color={Colors.gray500} />
                <Text style={styles.routeButtonText}>{STRINGS.BOONG_TAM.INFO.FIND_LOAD}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(item.id)}>
          <MaterialIcons
            name={likeCounts[item.id] ? 'favorite' : 'favorite-border'}
            size={24}
            color={likeCounts[item.id] ? Colors.orange100 : Colors.orange100}
          />
          <Text>{(likeCounts[item.id] ?? 0).toString()}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.orange100,
    borderRadius: 10,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...Typography.body.large_bold,
  },
  cardInfo: {
    ...Typography.body.small,
    color: Colors.gray500,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  orderButton: {
    flex: 1,
    backgroundColor: Colors.orange100,
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
    alignItems: 'center',
  },
  orderButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    ...Typography.body.large,
    color: Colors.gray500,
  },
  routeButton: {
    flex: 1,
    backgroundColor: Colors.orange100,
    borderRadius: 5,
    padding: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  naviButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeButtonText: {
    ...Typography.body.large,
    color: Colors.gray500,
  },
  likeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BoongtamStoreCard;