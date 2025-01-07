import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Menu, MenuItem } from 'react-native-material-menu';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../../src/styles/color';
import Typography from '../../../../src/styles/typhography';
import { STRINGS } from '../../../../src/config/string';
import BoongtamStoreCard from '../../../../components/screens/boongtamStoreCard';

const BoongtamList = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const sampleData = [
    { id: 1, name: '황금F 잉어빵 역삼', reviews: 10, distance: '22M', image: 'https://via.placeholder.com/80' },
    { id: 2, name: '황금F 잉어빵 강남', reviews: 8, distance: '50M', image: 'https://via.placeholder.com/80' },
  ];

  const toggleLike = (id) => {
    setLikeCounts((prev) => {
      const updated = {
        ...prev,
        [id]: prev[id] ? 0 : 1,
      };
      return updated;
    });
  };

  const renderItem = ({ item }) => (
    <BoongtamStoreCard
      item={item}
      likeCounts={likeCounts}
      toggleLike={toggleLike}
      onPressDetail={() => router.push(`/(subs)/(boongtam)/boongtamDetail?id=${item.id}`)}
    />
  );

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 네비게이션 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/(boongtam)/(main)/boongtam')}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="주소 검색"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <MaterialIcons name="search" size={24} color={Colors.gray200} style={styles.searchIcon} />
        </View>
      </View>

      {/* 필터 및 주문현황 */}
      <View style={styles.menuBar}>
        <Menu
          visible={menuVisible}
          anchor={
            <TouchableOpacity style={styles.filterButton} onPress={showMenu}>
              <View style={styles.filterButtonContent}>
                <MaterialIcons name="menu" size={24} color={Colors.orange100} />
                <Text style={styles.filterMenuText}>{STRINGS.BOONG_TAM.FILTER}</Text>
              </View>
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}
        >
          <MenuItem onPress={() => { hideMenu(); console.log('좋아요순 선택'); }}>
            <Text>{STRINGS.BOONG_TAM.INFO.LIKE}</Text>
          </MenuItem>
          <MenuItem onPress={() => { hideMenu(); console.log('최신순 선택'); }}>
            <Text>{STRINGS.BOONG_TAM.INFO.LATEST}</Text>
          </MenuItem>
        </Menu>
        <TouchableOpacity style={styles.statusButton} onPress={() => router.push('/(subs)/(boongtam)/boongtamOrderSuccess')}>
          <View style={styles.statusButtonContent}>
            <MaterialIcons name="phishing" size={24} color={Colors.orange100} />
            <Text style={styles.menuText}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER_CURRENT}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 리스트 */}
      <FlatList
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  backButton: {
    padding: 5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.orange100,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  searchIcon: {
    marginLeft: 5,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.orange100,
    borderRadius: 5,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterMenuText: {
    marginLeft: 8,
    color: Colors.orange100,
    ...Typography.body.medium,
  },
  statusButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButton: {
    paddingHorizontal: 60,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.orange100,
    borderRadius: 5,
  },
  menuText: {
    ...Typography.body.medium,
    color: Colors.gray500,
  },
  listContainer: {
    padding: 10,
  },
});

export default BoongtamList;