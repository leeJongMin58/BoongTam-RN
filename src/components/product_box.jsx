// product_box.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../styles/color';
import typography from '../styles/typhography';
import { STRINGS } from '../config/string';

const ProductBox = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <View style={styles.leftInfo}>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>
        <Text style={styles.reviewCount}>{STRINGS.SHOP.REVIEW_COUNT}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    flex: 1,
    margin: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    shadowColor: colors.gray300,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginLeft: 15,
  },
  leftInfo: {
    alignItems: 'flex-start',
  },
  productCategory: {
    ...typography.label.large,
    color: colors.red,
    marginBottom: 3,
  },
  productName: {
    ...typography.body.medium,
    fontWeight: 'bold',
    color: colors.gray500,
    marginBottom: 5,
  },
  productPrice: {
    ...typography.body.large_bold,
    color: colors.orange300,
  },
  reviewCount: {
    ...typography.label.normal,
    color: colors.gray400,
    marginRight: 25,
    textAlign: 'right',
  },
});

export default ProductBox;
