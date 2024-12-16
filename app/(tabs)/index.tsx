import React from 'react';
import { View, Text, StyleSheet, ScrollView  } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <View style={styles.colorbox}>      
              <Text style={styles.Orange000}>orange000</Text>
              <Text style={styles.Orange100}>orange100</Text> 
              <Text style={styles.Orange200}>orange200</Text>
              <Text style={styles.Orange300}>orange300</Text>     
            </View>
            <View style={styles.colorbox}>      
              <Text style={styles.white}>white</Text>
              <Text style={styles.gray100}>gray100</Text>
              <Text style={styles.gray200}>gray200</Text>
              <Text style={styles.gray300}>gray300</Text>  
              <Text style={styles.gray400}>gray400</Text>  
              <Text style={styles.gray500}>gray500</Text>    
            </View>
            <View style={styles.colorbox}>      
              <Text style={styles.red}>red</Text>
              <Text style={styles.blue}>blue</Text>
              <Text style={styles.brown}>brown</Text>   
            </View>
            <View style={styles.typobox}>      
              <Text style={styles.display_large}>display_large</Text>
              <Text style={styles.display_medium}>display_medium</Text>
              <Text style={styles.display_small}>display_small</Text>   
            </View>
            <View style={styles.typobox}>      
              <Text style={styles.heading_large}>heading_large</Text>
              <Text style={styles.heading_medium}>heading_medium</Text>
              <Text style={styles.heading_small}>heading_small</Text>   
              <Text style={styles.heading_small_bold}>heading_small_bold</Text> 
            </View>
            <View style={styles.typobox}>      
              <Text style={styles.body_large}>body_large</Text>
              <Text style={styles.body_large_bold}>body_large_bold</Text>   
              <Text style={styles.body_medium}>body_medium</Text>
            </View>
            <View style={styles.typobox}>      
              <Text style={styles.label_large}>label_large</Text>
              <Text style={styles.label_small}>label_small</Text>
              <Text style={styles.label_very_small}>label_very_small</Text>   
            </View>
        </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray.gray100, // 배경색 Constants에서 가져오기
  },
  colorbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray.gray200,
  },
  typobox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray.gray200,
  },
  Orange000: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.orange.orange000, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  Orange100: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.orange.orange100, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  Orange200: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.orange.orange200, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  Orange300: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.orange.orange300, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  white: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.white, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  gray100: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray100, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  gray200: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray200, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  gray300: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray300, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  gray400: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray400, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  gray500: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  red: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.system.red, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  blue: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.system.blue, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  brown: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.system.brown, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  display_large: {
    ...Typography.display.display_large,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  display_medium: {
    ...Typography.display.display_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  display_small: {
    ...Typography.display.display_small,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  heading_large: {
    ...Typography.headig.heading_large,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  heading_medium: {
    ...Typography.headig.heading_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  heading_small: {
    ...Typography.headig.heading_small,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  heading_small_bold: {
    ...Typography.headig.heading_small_bold,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  body_large: {
    ...Typography.body.body_large,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  body_large_bold: {
    ...Typography.body.body_large_bold,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  body_medium: {
    ...Typography.body.body_medium,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  label_large: {
    ...Typography.label.label_large,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  label_small: {
    ...Typography.label.label_small,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
  label_very_small: {
    ...Typography.label.label_very_small,   // Typography에서 폰트 사이즈 가져오기
    color: Colors.gray.gray500, // 텍스트 색상 Constants에서 가져오기
    fontWeight: 'bold',
  },
 
});

export default App;