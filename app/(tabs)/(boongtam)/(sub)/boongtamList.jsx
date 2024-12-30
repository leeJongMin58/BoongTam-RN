import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Menu, MenuItem } from 'react-native-material-menu';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../../src/styles/color';
import Typography from '../../../../src/styles/typhography';
import { STRINGS } from '../../../../src/config/string';

const BoongtamList = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const sampleData = [ // 임시 데이터
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => router.push(`/boongtamDetail?id=${item.id}`)}>
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardInfo}>
              리뷰 {(item.reviews ?? 0).toString()}개 | 거리 {(item.distance ?? '0M').toString()}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => router.push(`/boongtamMenuList`)}
              >
                <View style={styles.orderButtonContent}>
                  <MaterialIcons name="phishing" size={24} color={Colors.gray500} />
                  <Text style={styles.orderButtonText}>붕탐 오더</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.routeButton}
                onPress={() => router.push('/boongtam/map')}
              >
                <View style={styles.naviButtonContent}>
                  <MaterialIcons name="navigation" size={24} color={Colors.gray500} />
                  <Text style={styles.routeButtonText}>길찾기</Text>
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

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 네비게이션 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="주소 검색"       // 현재 주소가 나오게 변경 예정
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
                <MaterialIcons name='menu' size={24} color={Colors.orange100} />
                <Text style={styles.filterMenuText}>필터</Text>
              </View>
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}
        >
          <MenuItem onPress={() => { hideMenu(); console.log('좋아요순 선택'); }}>
            <Text>좋아요순</Text>
          </MenuItem>
          <MenuItem onPress={() => { hideMenu(); console.log('리뷰순 선택'); }}>
            <Text>리뷰순</Text>
          </MenuItem>
        </Menu>
        <TouchableOpacity style={styles.statusButton} onPress={() => router.push('/boongtam/status')}>
          <View style={styles.statusButtonContent}>
            <MaterialIcons name='phishing' size={24} color={Colors.orange100} />
            <Text style={styles.menuText}>붕탐 오더 현황보기</Text>
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
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.orange100,
    borderRadius: 10,
    backgroundColor: Colors.white,
    position: 'relative', // 좋아요 버튼 위치 조정
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
    justifyContent: 'space-between', // 좌우로 꽉 차게 배치
    marginTop: 10,
  },
  orderButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButton: {
    flex: 1, // 좌우로 꽉 차게
    backgroundColor: Colors.orange100,
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    ...Typography.body.large,
    color: Colors.gray500,
  },
  naviButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeButton: {
    flex: 1, // 좌우로 꽉 차게
    backgroundColor: Colors.orange100,
    borderRadius: 5,
    padding: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  routeButtonText: {
    ...Typography.body.large,
    color: Colors.gray500
  },
  likeButton: {
    position: 'absolute',
    top: 5, // 버튼 위로 배치
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BoongtamList;
