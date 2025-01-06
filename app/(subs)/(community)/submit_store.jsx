import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import colors from '../../../src/styles/color';

export default function BoongTamScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>가게 제보하기 화면</Text>
      <Link 
        style={styles.card}
        href="(tabs)/(community)/community">
        커뮤니티 화면으로
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    backgroundColor: colors.gray100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray800,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.red100,
    fontSize: 18,
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    textAlign: 'center', // 텍스트를 가운데 정렬
  },
});
