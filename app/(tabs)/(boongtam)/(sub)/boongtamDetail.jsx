import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from 'react-native-vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';
import Colors from '../../../../src/styles/color';
import Typography from '../../../../src/styles/typhography';
import { useRouter } from 'expo-router';

const BoongtamDetail = () => {
    const router = useRouter();
    const scrollViewRef = useRef(null);

    const menuSectionRef = useRef(null);
    const photoSectionRef = useRef(null);
    const reviewSectionRef = useRef(null);

    const [selectedTab, setSelectedTab] = useState('menu');
    const [photoFilterMenuVisible, setPhotoFilterMenuVisible] = useState(false);
    const [reviewFilterMenuVisible, setReviewFilterMenuVisible] = useState(false);

    const scrollToSection = (sectionRef) => {
        sectionRef?.current?.measureLayout(
            scrollViewRef.current,
            (x, y) => {
                scrollViewRef.current.scrollTo({ y: y - 100, animated: true });
            },
            () => { }
        );
    };

    const handleTabPress = (tabName, sectionRef) => {
        setSelectedTab(tabName);
        scrollToSection(sectionRef);
    };

    const showPhotoFilterMenu = () => setPhotoFilterMenuVisible(true);
    const hidePhotoFilterMenu = () => setPhotoFilterMenuVisible(false);

    const showReviewFilterMenu = () => setReviewFilterMenuVisible(true);
    const hideReviewFilterMenu = () => setReviewFilterMenuVisible(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollViewRef}>
                {/* 상단 네비게이션 */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backbutton} onPress={() => router.push('/boongtamList')}>
                        <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>매장 정보</Text>
                </View>

                {/* 가게 정보 */}
                <View style={styles.section}>
                    <Text style={styles.storeTitle}>황금F 잉어빵 역삼GFC역점</Text>
                    <View style={styles.storeDetails}>
                        <Text style={styles.detailText}>리뷰 10개</Text>
                        <Text style={styles.detailText}>|</Text>
                        <Text style={styles.detailText}>거리 22M</Text>
                    </View>
                    <View style={styles.storeDescriptionContainer}>
                        <Text style={styles.storeDescription}>역삼에서 가장 맛있는 붕어빵 집!</Text>
                    </View>
                </View>

                {/* 추가 버튼 섹션 */}
                <View style={styles.section}>
                    <View style={styles.actionButtonContainer}>
                        <TouchableOpacity style={styles.actionButton}>
                            <MaterialIcons name="favorite" size={24} color={Colors.orange100} />
                            <Text style={styles.actionButtonText}>20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <MaterialIcons name="navigation" size={24} color={Colors.orange100} />
                            <Text style={styles.actionButtonText}>길찾기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <MaterialIcons name="rate-review" size={24} color={Colors.orange100} />
                            <Text style={styles.actionButtonText}>리뷰 쓰기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <MaterialIcons name="report" size={24} color={Colors.orange100} />
                            <Text style={styles.actionButtonText}>제보하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 지도 섹션 */}
                <View style={styles.section}>
                    <View style={styles.mapContainer}>
                        <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.map} />
                    </View>
                </View>



                {/* 가게 정보 추가 */}
                <View style={styles.section}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>가게 형태</Text>
                        <Text style={styles.infoValue}>매장</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>출몰 시기</Text>
                        <Text style={styles.infoValue}>월, 화, 수, 목, 금</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>출몰 시간대</Text>
                        <Text style={styles.infoValue}>10:00 - 18:00</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>결제 방식</Text>
                        <Text style={styles.infoValue}>현금, 카드</Text>
                    </View>
                </View>

                {/* 붕탐오더 주문하기 */}
                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.orderButton}
                        onPress={() => router.push('/boongtamMenuList')}
                    >
                        <Text style={styles.orderButtonText}>붕탐오더 주문하기</Text>
                    </TouchableOpacity>

                </View>

                {/* 탭 */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'menu' && styles.selectedTab]}
                        onPress={() => handleTabPress('menu', menuSectionRef)}
                    >
                        <Text style={styles.tabText}>메뉴</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'photo' && styles.selectedTab]}
                        onPress={() => handleTabPress('photo', photoSectionRef)}
                    >
                        <Text style={styles.tabText}>사진</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'review' && styles.selectedTab]}
                        onPress={() => handleTabPress('review', reviewSectionRef)}
                    >
                        <Text style={styles.tabText}>리뷰</Text>
                    </TouchableOpacity>
                </View>

                {/* 메뉴 섹션(임시데이터) */}
                <View style={styles.section} ref={menuSectionRef}>
                    <View style={styles.menuItem}>
                        <View>
                            <Text style={styles.menuName}>슈크림 붕어빵</Text>
                            <Text style={styles.menuPrice}>500원 / 1개</Text>
                        </View>
                        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.menuImage} />
                    </View>
                </View>
                <View style={styles.section} ref={menuSectionRef}>
                    <View style={styles.menuItem}>
                        <View>
                            <Text style={styles.menuName}>팥 붕어빵</Text>
                            <Text style={styles.menuPrice}>500원 / 1개</Text>
                        </View>
                        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.menuImage} />
                    </View>
                </View>

                {/* 사진 섹션 */}
                <View style={styles.section} ref={photoSectionRef}>
                    <Menu
                        visible={photoFilterMenuVisible}
                        anchor={
                            <TouchableOpacity style={styles.filterButton} onPress={showPhotoFilterMenu}>
                                <MaterialIcons name="menu" size={24} color={Colors.orange100} />
                                <Text style={styles.filterText}>필터</Text>
                            </TouchableOpacity>
                        }
                        onRequestClose={hidePhotoFilterMenu}
                    >
                        <MenuItem onPress={() => { hidePhotoFilterMenu(); console.log('음식 선택'); }}>음식</MenuItem>
                        <MenuItem onPress={() => { hidePhotoFilterMenu(); console.log('외부 선택'); }}>외부</MenuItem>
                        <MenuItem onPress={() => { hidePhotoFilterMenu(); console.log('내부 선택'); }}>내부</MenuItem>
                    </Menu>
                    <Image source={{ uri: 'https://via.placeholder.com/300x150' }} style={styles.photo} />
                </View>

                {/* 리뷰 섹션 (리뷰컴포넌트 제작시 수정예정)*/}
                <View style={styles.section} ref={reviewSectionRef}>
                    <Menu
                        visible={reviewFilterMenuVisible}
                        anchor={
                            <TouchableOpacity style={styles.filterButton} onPress={showReviewFilterMenu}>
                                <MaterialIcons name="menu" size={24} color={Colors.orange100} />
                                <Text style={styles.filterText}>필터</Text>
                            </TouchableOpacity>
                        }
                        onRequestClose={hideReviewFilterMenu}
                    >
                        <MenuItem onPress={() => { hideReviewFilterMenu(); console.log('좋아요순 선택'); }}>좋아요순</MenuItem>
                        <MenuItem onPress={() => { hideReviewFilterMenu(); console.log('최신순 선택'); }}>최신순</MenuItem>
                    </Menu>
                    <View style={styles.reviewItem}>
                        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.reviewerImage} />
                        <View>
                            <Text style={styles.reviewerName}>황일찬</Text>
                            <Text style={styles.reviewText}>제가 반죽이 부드러운 붕어빵을 좋아하는데...</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray100,
        // padding: 10 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray200,
        padding: 10
    },
    backbutton: { position: 'absolute', left: 5, padding: 5 },
    headerTitle: { ...Typography.heading.small_bold, textAlign: 'center' },
    section: { backgroundColor: Colors.white, padding: 15, marginBottom: 10, borderRadius: 5 },
    storeTitle: { ...Typography.heading.medium, marginBottom: 20, textAlign: 'center' },
    storeDetails: { flexDirection: 'row', justifyContent: 'flex-end' },
    detailText: { marginLeft: 20, ...Typography.label.large, marginBottom: 10 },
    storeDescriptionContainer: { alignItems: 'center', marginVertical: 10 },
    storeDescription: { ...Typography.body.large, textAlign: 'center', color: Colors.gray500 },
    mapContainer: { alignItems: 'center', justifyContent: 'center', marginVertical: 10 },
    map: { width: '100%', height: 200, borderRadius: 10 },
    tabContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.white },
    tab: { paddingVertical: 10, flex: 1, alignItems: 'center' },
    selectedTab: { borderBottomWidth: 3, borderBottomColor: Colors.orange100 },
    tabText: { ...Typography.body.large, color: Colors.orange100 },
    menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' },
    menuImage: { width: 80, height: 80, borderRadius: 10 },
    menuName: { ...Typography.body.medium_bold },
    menuPrice: { ...Typography.body.small },
    photo: { width: '100%', height: 150, borderRadius: 5 },
    filterButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, width: 100, borderWidth: 1, borderColor: Colors.orange100, backgroundColor: Colors.white, borderRadius: 5, marginBottom: 10 },
    filterText: { color: Colors.gray500, ...Typography.body.small, marginLeft: 5 },
    orderButton: { backgroundColor: Colors.orange100, borderRadius: 5, paddingVertical: 15, alignItems: 'center' },
    orderButtonText: { color: Colors.white, ...Typography.body.large_bold },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    infoLabel: { ...Typography.body.medium, color: Colors.gray500 },
    infoValue: { ...Typography.body.medium_bold, color: Colors.gray900 },
    reviewItem: { flexDirection: 'row', marginBottom: 10, alignItems: 'center', marginTop: 10 },
    reviewerImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    reviewerName: { ...Typography.body.medium_bold },
    reviewText: { ...Typography.body.small, color: Colors.gray500 },
    actionButtonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
    actionButton: { alignItems: 'center' },
    actionButtonText: { marginTop: 5, ...Typography.body.small, color: Colors.gray500 },
});

export default BoongtamDetail;
