// ReviewBox.jsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import colors from '../styles/color';
import typography from '../styles/typhography';

const ReviewBox = ({ review }) => {
  return (
    <ScrollView>
        <View style={styles.reviewItem}>
        <Text style={styles.reviewUser}>{review.user}</Text>
        <Text style={styles.reviewComment}>{review.comment}</Text>
        <Text style={styles.reviewRating}>평점: {review.rating} / 5</Text>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    paddingBottom: 8,
  },
  reviewUser: {
    ...typography.body.small_bold,
    color: colors.gray500,
  },
  reviewComment: {
    ...typography.label.large,
    color: colors.gray500,
    marginTop: 4,
  },
  reviewRating: {
    ...typography.label.large,
    color: colors.orange200,
    marginTop: 4,
  },
});

export default ReviewBox;
