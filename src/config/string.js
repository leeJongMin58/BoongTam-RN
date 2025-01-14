export const STRINGS = {
	APP_NAME: 'BonngTam',
	ON_BOARDING: {
		
		PASS : '건너뛰기',
		SLIDE1: {
			TITLE: '겨울 간식의 왕,\n붕어빵을 찾아드립니다!',
			DESCRIPTION: '당신이 좋아하는 붕어빵 가게를 한눈에 확인하고\n나만 아는 가게도 등록해보세요.',
		},
		SLIDE2: {
			TITLE: '붕어빵 리뷰 평점 확인!\n 지금 바로!',
			DESCRIPTION: '사람들이 작성한 리뷰를 살펴보고\n최고의 붕어빵 가게를 찾아보세요.',
		},
		SLIDE3: {
			TITLE: '붕어빵 매장\n 직접 등록하세요!',
			DESCRIPTION: '내가 찾은 정말 맛있는 붕어빵 가게를 등록하고,\n다른 사람들과 공유해보세요.',
		},
		SLIDE4: {
			TITLE: '붕어빵 찾기\n지금 시작해볼까요?',
			DESCRIPTION: '로그인하고 주변의 붕어빵 매장을\n한눈에 찾아보세요!',
		},
	},	
	LOGIN: {
		LOGIN : '로그인',
		SIGNUP : '회원가입',
		ID : '아이디',
		PW : '비밀번호',
		INPUT: {
			SUB_TITLE : '회원 로그인',
			FIND_ID : '아이디 찾기',
			FIND_PW : '비밀번호 찾기',
			WARNING_ID : '아이디는 4~10글자로 입력해 주세요',
			WARNING_PW : '비밀번호는 4~10글자로 입력해 주세요',
			WARNING_NO_ID : '등록되지 않은 아이디 입니다.',
			WARNING_NO_MATCH : '아이디와 비밀번호가 일치하지 않습니다.',
		}
	},
	BOONG_TAM: {
		TITLE: '붕탐 오더',
		FILTER: '필터',
		STORE: {
			STORE_INFO: '매장 정보',
			STORE_FORM: '가게 형태',
			STORE_APPEARANCE: '출몰 시기',
			STORE_TIME: '출몰 시간'
		},
		INFO: {
			FIND_LOAD: '길찾기',
			REPORTING: '제보하기',
			MENU: '메뉴',
			PHOTO: '사진',
			FOOD: '음식',
			OUTSIDE: '외부',
			INSIDE: '내부',
			LIKE: '좋아요순',
			LATEST: '최신순',
			ADD_MENU: '메뉴 더 담기',
			PICKUP: '이 때 받으러 갈게요~',
			POINT: '포인트',
			BOONG_POINT: '붕 포인트',
			APPLICATION: '적용',
			GO_BOONGTEM: '붕템샵으로 이동하기'
		},
		REVIEW: {
			WRITE_REVIEW: '리뷰 쓰기',
			REVIEW: '리뷰'
		},
		PAY: {
			TOTAL_PAYMENT: '총 주문 금액',
			PAYMENT_METHOD: '결제 수단',
			WON: '원',
			PAYMENT_AMOUNT: '결제 금액',
			ORDER_AMOUNT: '주문 금액',
			USE_POINT: '포인트 사용',
			FINAL_AMOUNT: '최종 결제 금액',
			PAY: '결제하기',
			SUCCESS_PAY: '결제 완료!',
			SUCCESS_PAY_DISCRIPTION: '열심히 배송 중 이에요!',
			PAY_DAY: '주문 일시'
		},
		ORDER: {
			ORDER: '주문하기',
			BOONG_TAM_ORDER: '붕탐오더 주문하기',
			BOONG_TAM_ORDER_CURRENT: '붕탐 오더 주문현황',
			BOONG_TEM_ORDER_CURRENT: '붕템샵 주문현황',
			BOONG_TAM_ORDER_PRODUCT: '주문 상품 정보',
			BOONG_TAM_ORDER_VIEW: '주문 현황 보기',
			BOONG_TAM_ORDER_RECEIPT: '주문 접수 확인',
			CHECK_ORDER: '가게에서 주문을 확인 중 이에요!',
			AFTER_TIME: '이만큼 남았어요~',
			CANCEL_ORDER: '주문 취소',
			ADDRESS_PRODUCT : '배송지 정보',
			INQUIRY: '배송 조회',
			CANCEL_MESSAGE1: '주문이 취소되었습니다',
			CANCEL_MESSAGE2: '이용해주셔서 감사합니다'
		}
	},
	COMMYNUITY: {
		TITLE: 'Community',
	},
	MY: {
		TITLE: 'My',
		info: {
			nickname: '닉네임',
			info_edit: '내 정보 수정',
			point: '보유 포인트',
			review_manage: '리뷰 관리',
			suttle_check: '배송 조회',
			bill_paper: '결제 내역 보기',
			logout: '로그아웃',
			logoutTitle: '로그아웃',
			logoutMessage: '로그아웃이 완료되었습니다.',
			confirm: '확인',
			withdrawal: '회원 탈퇴',
			email: '이메일',
			address: '주소',
			phone: '전화번호',
			socialAccount: '연결된 소셜 계정',
			userId: '아이디',
			edit: '수정',
			userDetails: [
				{ label: '이메일', value: 'bung-aaa@bung.com', icon: 'email' },
				{ label: '주소', value: '서울특별시 봉어동', icon: 'location-on' },
				{ label: '전화번호', value: '010-1111-1111', icon: 'phone' },
				{ label: '연결된 소셜 계정', value: 'KAKAO', icon: 'link' },
			  ],
			policy: { 
				name: '공지사항',
				description: '다양한 공지'
			},
			service: { 
				name: '고객 센터',
				description: '문제가  있을 시 문의 주세요'
			},
			notice: { 
				name: '약관 및 정책',
				description: '변경 사항에 대한 알림'
			},
			version: '현재 버전: 1.1.1'
		},
		bill: {
			TABS: {
				STORE: '매장·포장',
				GOODS: '굿즈',
			},
			DETAIL_LINK: '주문 상세보기 >',
			ACTION_BUTTONS: {
				ADD_AGAIN: '배송 조회',
				VIEW_REVIEW: '리뷰 보기',
			},
			allData: [
				{
					id: "1",
					category: "매장·포장",
					date: "12.13 (월)",
					status: "주문 완료",
					place: "서울 역삼점",
					items: "슈붕 2개",
					price: "3,800원",
				},
				{
					id: "2",
					category: "매장·포장",
					date: "12.14 (화)",
					status: "주문 완료",
					place: "서울 역삼점",
					items: "팥붕 외 3개",
					price: "7,800원",
				},
				{
					id: "3",
					category: "매장·포장",
					date: "12.14 (화)",
					status: "주문 완료",
					place: "서울 역삼점",
					items: "팥붕 12개",
					price: "51,800원",
				},
				{
					id: "4",
					category: "매장·포장",
					date: "12.15 (수)",
					status: "주문 완료",
					place: "서울 영등포점",
					items: "슈붕 외 22개",
					price: "32,800원",
				},
				{
					id: "5",
					category: "매장·포장",
					date: "12.17 (금)",
					status: "주문 완료",
					place: "서울 강남점",
					items: "팥붕 외 12개",
					price: "50,800원",
				},
				{
					id: "6",
					category: "굿즈",
					date: "12.15 (수)",
					status: "배송 완료",
					place: "굿즈 배송",
					items: "텀블러 외 1개",
					price: "12,000원",
				},
				{
					id: "7",
					category: "굿즈",
					date: "12.18 (금)",
					status: "배송 완료",
					place: "굿즈 배송",
					items: "종이 외 3개",
					price: "19,000원",
				},
				{
					id: "8",
					category: "굿즈",
					date: "12.17 (목)",
					status: "배송 완료",
					place: "굿즈 배송",
					items: "장난감",
					price: "90,000원",
				},
				{
					id: "9",
					category: "굿즈",
					date: "12.19 (토)",
					status: "배송 완료",
					place: "굿즈 배송",
					items: "보틀",
					price: "30,000원",
				},
				{
					id: "10",
					category: "굿즈",
					date: "12.16 (목)",
					status: "배송 완료",
					place: "굿즈 배송",
					items: "스티커 외 5개",
					price: "18,000원",
				},
			],
		},
		EDIT_PROFILE: {
			TITLE: '수정',
			DESCRIPTION: '현재 {label}: {value}',
			PLACEHOLDER: '{label}을(를) 입력해주세요.',
			BUTTON_SAVE: '저장하기',
			ALERT_SUCCESS: '{label}이(가) "{value}"로 변경되었습니다.',
			ALERT_ERROR: '값을 입력해주세요.',
		},
		SETTINGS: {
			TITLE: '설정',
			SECTIONS: {
				NOTIFICATIONS: '알림',
				FEATURES: '기능',
			},
			LABELS: {
				COMMENT_NOTIFICATION: '댓글 알림',
				LIKE_NOTIFICATION: '좋아요 알림',
				MARKETING_NOTIFICATION: '마케팅 푸시 알림',
				COOKING_NOTIFICATION: '조리시간 알림',
				STORE_OPEN_NOTIFICATION: '가게 오픈 알림',
				USE_SAFE_NUMBER: '안심번호 사용',
				AUTO_UPDATE: '자동 업데이트',
				LANGUAGE: '언어',
			},
			BUTTONS: {
				SAVE: '저장',
			},
		},
		TERMS_POLICY: {
			POLICIES: [
				{ TITLE: '사업자 정보 확인', DATE: '2022-11-29' },
				{ TITLE: '이용약관', DATE: '2023-06-25' },
				{ TITLE: '전자금융거래 이용약관', DATE: '2023-5-13' },
				{ TITLE: '개인정보 처리방침', DATE: '2024-01-03' },
				{ TITLE: '리뷰 운영 정책', DATE: '2024-03-20' },
				{ TITLE: '데이터 제공 정책', DATE: '2024-11-05' },
				{ TITLE: '소비자 분쟁 해결 기준', DATE: '2024-12-30' },
			],
			BUTTONS: {
				REFRESH: '⟳',
			},
		},
		CUSTOMER_SERVICE_SCREEN: {
			OPTIONS: [
				{ title: '자주 묻는 질문', description: '궁금한 사항에 대해 적어주세요', icon: 'question-answer' },
				{ title: '전화 연결', description: '상담사와 연결하세요', icon: 'phone' },
				{ title: '이메일 문의', description: '이메일로 문의해 주세요', icon: 'email' },
				{ title: '고객안심센터 상담', description: '가입자의 정보 보호 불편, 불리한 처리, 대리…', icon: 'home' },
				{ title: '안전거래센터 신고', description: '법 또는 정책을 위반한 거래를 신고하세요.', icon: 'lock' },
			],
		},	
		WITHDRAWAL_SCREEN: {
			NOTICE: {
				TITLE: '회원탈퇴 유의사항',
				BADGE: '주의!',
				DESCRIPTION: '회원 탈퇴 전에 꼭 확인하세요',
				EXPANDED_TEXT: '회원 탈퇴를 진행하시면 사용 중인 쿠폰, 포인트, 상품권 등이 모두 소멸되며 복구할 수 없습니다. 이 점 유의하시기 바랍니다.',
			},
			CONFIRMATION: '유의사항을 모두 확인하였으며, 회원 탈퇴 시 쿠폰, 포인트, 상품권, 소멸에 동의합니다',
			BUTTON: '회원 탈퇴',
			ALERTS: {
				WARNING_TITLE: '주의',
				WARNING_MESSAGE: '유의사항에 동의해야 회원 탈퇴가 가능합니다.',
				SUCCESS_TITLE: '회원 탈퇴',
				SUCCESS_MESSAGE: '회원 탈퇴가 완료되었습니다.',
			},
		},		
	},
	PAY: {
		TITLE: 'Pay',
	},
	SHOP: {
		TITLE: 'SHOP',
		REVIEW_COUNT: '리뷰: 23', // {count}를 넣어 개수를 센다.
		MAIN: {
			TODAY_HOT: '오늘의 핫 붕템',
			CATEGORY_NAME: {
				ACCESSORY: '악세서리',
				DOLL: '인형',
				HOME_PRODUCTS: '생활용품',
			},
			SUB_CATEGORIES: {
				ACCESSORY: {
					KEYLING: '키링', 
					GRIPTOK: '그립톡', 
					PHONECASE: '폰케이스',
				},
				DOLL: {
					FULL_DOLL: '전신인형', 
					MINI_DOLL: '미니인형', 
					BONGSOON: '붕순이',
				},
				HOME_PRODUCTS: {
					OVEN: '오븐', 
					SHAKER: '쉐이커', 
					TOWEL: '타월', 
					PLATE: '그릇',
				},
			},
		},
		ADDRESS: {
			SUTTLE_TEXT: '배송지를 정확히 입력해 주세요. 잘못된 주소로 인해 발생한 문제는 교환/반품이 어렵습니다.',
			SUTTLE_INPUT_TEXT: '예) 서울특별시 강남구 테헤란로 235',
			SUTTLE_SAVE_TEXT: '저장',
		},
		APPLICATION: {
			APPLY_CHANGE_ALERT: '교환하기 버튼이 클릭되었습니다.',
			APPLY_RETURN_ALERT: '반품하기 버튼이 클릭되었습니다.',
			APLLY_HEADER_TITLE: '붕템샵',
			APPLY_CHANGE_BUTTON: '교환 반품 신청',
			APPLY_ORDER_VIEW: '주문 상세보기',
			APPLY_CHANGE_TEXT: '교환하기',
			APPLY_RETURN_TEXT: '반품하기',

		},
		CHANGE_COMPLETE: {
			CHANGE_COMPLTETE: '교환 신청완료',
			CHANGE_COMPLTETE_TEXT1: '교환 신청이 완료되었습니다',
			CHANGE_COMPLTETE_TEXT2: '이용해주셔서 감사합니다.',
			CHANGE_INFO_CAUSE: '교환 사유: ',
			CHANGE_INFO_METHOD: '회수 방법: ',
			CHANGE_INFO_ADDRESS: '주소: ',
			CHANGE_ORDER_VIEW: '주문 현황보기',
			CHANGE_SHOPPING_CONTINUE: '쇼핑 계속하기',
		},
		CHANGE_SCREEN: {
			CHANGE_NOW_ADDRESS: '서울시 역삼역 붕어빵빌딩',
			CHANGE_NOW_REASON: {
				REASON1: '상품 내용이 상세 정보와 달라요',
			    REASON2: '상품이 불량이에요',
			 	REASON3: '상품이 파손되었어요',
				REASON4: '다른 상품이 왔어요',
			 	REASON5: '기타 사유',
			},
			CHANGE_HEADER_TEXT: '교환하기',
			CHANGE_ORDER_VIEW: '주문 상세보기',
			CHANGE_COUNT: {
				COUNT: '수량: ',
				TYPE: '개',
			},
			CHANGE_CHANGE_WHY: '교환 사유',
			CHANGE_CHANGE_WHY_TEXT: '교환 사유를 입력하세요',
			SUTTLE_METHOD_TEXT: '회수 방법 선택',
			SUTTLLE_CHOOSE: {
				CHOOSE1: '직접 보낼게요',
				CHOOSE2: '회수해 주세요',
			},
			NOW_ADDRESS: '현재 주소지',
			NOW_ADDRESS_CHANGE: '변경하기',
			SUTTLE_INFO: {
				FEE_TITLE: '배송비',
				FEE_CHANGE: '교환 배송비',
				FEE_COMPANY: 'CJ 대한통운',
			},
			CHANGE_APPLY: '교환 신청하기',
			CHANGE_CHOOSE: '교환 사유 선택',
			CLOSE: '닫기',
		},
		RETURN_COMPLETE: {
			RETURN_COMPLTETE: '반품 신청완료',
			RETURN_COMPLTETE_TEXT1: '반품 신청이 완료되었습니다',
			RETURN_COMPLTETE_TEXT2: '이용해주셔서 감사합니다.',
			RETURN_INFO_CAUSE: '반품 사유: ',
			RETURN_INFO_METHOD: '회수 방법: ',
			RETURN_INFO_ADDRESS: '주소: ',
			RETURN_ORDER_VIEW: '주문 현황보기',
			RETURN_SHOPPING_CONTINUE: '쇼핑 계속하기',
		},
		RETURN_SCREEN: {
			RETURN_NOW_ADDRESS: '서울시 역삼역 붕어빵빌딩',
			RETURN_NOW_REASON: {
				REASON1: '상품 내용이 상세 정보와 달라요',
			    REASON2: '상품이 불량이에요',
			 	REASON3: '상품이 파손되었어요',
				REASON4: '다른 상품이 왔어요',
			 	REASON5: '기타 사유',
			},
			RETURN_HEADER_TEXT: '교환하기',
			RETURN_ORDER_VIEW: '주문 상세보기',
			RETURN_COUNT: {
				COUNT: '수량: ',
				TYPE: '개',
			},
			RETURN_CHANGE_WHY: '교환 사유',
			RETURN_CHANGE_WHY_TEXT: '교환 사유를 입력하세요',
			SUTTLE_METHOD_TEXT: '회수 방법 선택',
			SUTTLE_CHOOSE: {
				CHOOSE1: '직접 보낼게요',
				CHOOSE2: '회수해 주세요',
			},
			NOW_ADDRESS: '현재 주소지',
			NOW_ADDRESS_CHANGE: '변경하기',
			SUTTLE_INFO: {
				FEE_TITLE: '배송비',
				FEE_RETURN: '교환 배송비',
				FEE_COMPANY: 'CJ 대한통운',
			},
			RETURN_APPLY: '교환 신청하기',
			RETURN_CHOOSE: '교환 사유 선택',
			CLOSE: '닫기',
		},
		PRODUCT_CART: {
			TOTAL_CALCUL: {
				TOTAL: '총 결제 금액: ',
				COUNT: '원',
			},
			CHECKOUT_TEXT: '결제하기',
		},
		PRODUCT_LIST: {

		},
		PRODUCT_DETAIL: {
			ERROR: {
				FETCH_FAILED: '상품 정보를 불러올 수 없습니다.',
			},
			TABS: {
				DESCRIPTION: '상품 설명',
				REVIEWS: '리뷰',
			},
			BUTTONS: {
				ADD_TO_CART: '장바구니 담기',
				BUY_NOW: '결제하기',
			},
			POCKET: '장바구니',
			ALERTS: {
				ADD_TO_CART_SUCCESS: '상품이 장바구니에 추가되었습니다.',
			},
			DESCRIPTION: {
				DEFAULT: '은(는) 매우 유용하고 귀여운 상품입니다! 다양한 용도로 사용할 수 있으며 품질이 뛰어납니다.',
			},
			REVIEWS: {
				RATING_TEXT: '평점: ',
			},
		},
	},
	SIGNUP: {
		TITLE: '회원가입',
		INFO: {
			ADDRESS: '주소',
			FIND_ADDRESS: '주소 찾기',
			ADDRESS_DISCRIPTION: '주소에 이모티콘은 사용할 수 없습니다.',
			CLOSE: '닫기'
		}
	}
};
