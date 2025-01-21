const PRODUCTS = [

    // 악세서리
    { id: '1', category: '악세서리', name: '붕어빵 키링', price: '4,500원', image: require('../../../assets/product/accessroy/keyring/keyring1.png') },
    { id: '2', category: '악세서리', name: '붕어빵 키링', price: '3,500원', image: require('../../../assets/product/accessroy/keyring/keyring2.png') },
    { id: '3', category: '악세서리', name: '붕어빵 키링', price: '5,500원', image: require('../../../assets/product/accessroy/keyring/keyring3.png') },
    { id: '4', category: '악세서리', name: '붕어빵 키링', price: '5,500원', image: require('../../../assets/product/accessroy/keyring/keyring4.png') },
    { id: '5', category: '악세서리', name: '붕어빵 키링', price: '6,500원', image: require('../../../assets/product/accessroy/keyring/keyring5.png') },

    { id: '6', category: '악세서리', name: '붕어빵 폰케이스', price: '10,000원', image: require('../../../assets/product/accessroy/phonecase/phonecase1.png') },
    { id: '7', category: '악세서리', name: '붕어빵 폰케이스', price: '13,000원', image: require('../../../assets/product/accessroy/phonecase/phonecase2.png') },
    { id: '8', category: '악세서리', name: '붕어빵 폰케이스', price: '12,000원', image: require('../../../assets/product/accessroy/phonecase/phonecase3.png') },
    { id: '9', category: '악세서리', name: '붕어빵 폰케이스', price: '12,500원', image: require('../../../assets/product/accessroy/phonecase/phonecase4.png') },
    { id: '10', category: '악세서리', name: '붕어빵 폰케이스', price: '10,500원', image: require('../../../assets/product/accessroy/phonecase/phonecase5.png') },

    { id: '11', category: '악세서리', name: '붕어빵 그립톡', price: '17,000원', image: require('../../../assets/product/accessroy/griptok/griptok1.png') },
    { id: '12', category: '악세서리', name: '붕어빵 그립톡', price: '23,000원', image: require('../../../assets/product/accessroy/griptok/griptok2.png') },
    { id: '13', category: '악세서리', name: '붕어빵 그립톡', price: '32,000원', image: require('../../../assets/product/accessroy/griptok/griptok3.png') },
    { id: '14', category: '악세서리', name: '붕어빵 그립톡', price: '18,000원', image: require('../../../assets/product/accessroy/griptok/griptok4.png') },
    { id: '15', category: '악세서리', name: '붕어빵 그립톡', price: '30,000원', image: require('../../../assets/product/accessroy/griptok/griptok5.png') },

    // 인형
    { id: '16', category: '인형', name: '붕어빵 전신인형', price: '122,000원', image: require('../../../assets/product/doll/full_doll/fulldoll1.png') },
    { id: '17', category: '인형', name: '붕어빵 전신인형', price: '203,000원', image: require('../../../assets/product/doll/full_doll/fulldoll2.png') },
    { id: '18', category: '인형', name: '붕어빵 전신인형', price: '90,000원', image: require('../../../assets/product/doll/full_doll/fulldoll3.png') },
    { id: '19', category: '인형', name: '붕어빵 전신인형', price: '100,000원', image: require('../../../assets/product/doll/full_doll/fulldoll4.png') },
    { id: '20', category: '인형', name: '붕어빵 전신인형', price: '230,000원', image: require('../../../assets/product/doll/full_doll/fulldoll5.png') },

    { id: '21', category: '인형', name: '붕어빵 미니인형', price: '10,000원', image: require('../../../assets/product/doll/mini_doll/minidoll1.png') },
    { id: '22', category: '인형', name: '붕어빵 미니인형', price: '13,000원', image: require('../../../assets/product/doll/mini_doll/minidoll2.png') },
    { id: '23', category: '인형', name: '붕어빵 미니인형', price: '6,000원', image: require('../../../assets/product/doll/mini_doll/minidoll3.png') },
    { id: '24', category: '인형', name: '붕어빵 미니인형', price: '20,000원', image: require('../../../assets/product/doll/mini_doll/minidoll4.png') },
    { id: '25', category: '인형', name: '붕어빵 미니인형', price: '18,000원', image: require('../../../assets/product/doll/mini_doll/minidoll5.png') },

    { id: '26', category: '인형', name: '붕어빵 붕순이', price: '25,000원', image: require('../../../assets/product/doll/star_doll/stardoll1.png') },
    { id: '27', category: '인형', name: '붕어빵 붕순이', price: '35,000원', image: require('../../../assets/product/doll/star_doll/stardoll2.png') },
    { id: '28', category: '인형', name: '붕어빵 붕순이', price: '20,000원', image: require('../../../assets/product/doll/star_doll/stardoll3.png') },
    { id: '29', category: '인형', name: '붕어빵 붕순이', price: '25,000원', image: require('../../../assets/product/doll/star_doll/stardoll4.png') },
    { id: '30', category: '인형', name: '붕어빵 붕순이', price: '35,000원', image: require('../../../assets/product/doll/star_doll/stardoll5.png') },

    // 생활용품
    { id: '31', category: '생활용품', name: '붕어빵 오븐', price: '130,000원', image: require('../../../assets/product/lifetool/oven/oven1.png') },
    { id: '32', category: '생활용품', name: '붕어빵 오븐', price: '120,000원', image: require('../../../assets/product/lifetool/oven/oven2.png') },
    { id: '33', category: '생활용품', name: '붕어빵 오븐', price: '210,000원', image: require('../../../assets/product/lifetool/oven/oven3.png') },
    { id: '34', category: '생활용품', name: '붕어빵 오븐', price: '180,000원', image: require('../../../assets/product/lifetool/oven/oven4.png') },
    { id: '35', category: '생활용품', name: '붕어빵 오븐', price: '150,000원', image: require('../../../assets/product/lifetool/oven/oven5.png') },

    { id: '36', category: '생활용품', name: '붕어빵 그릇', price: '105,000원', image: require('../../../assets/product/lifetool/plate/plate1.png') },
    { id: '37', category: '생활용품', name: '붕어빵 그릇', price: '65,000원', image: require('../../../assets/product/lifetool/plate/plate2.png') },
    { id: '38', category: '생활용품', name: '붕어빵 그릇', price: '70,000원', image: require('../../../assets/product/lifetool/plate/plate3.png') },
    { id: '39', category: '생활용품', name: '붕어빵 그릇', price: '99,000원', image: require('../../../assets/product/lifetool/plate/plate4.png') },
    { id: '40', category: '생활용품', name: '붕어빵 그릇', price: '67,000원', image: require('../../../assets/product/lifetool/plate/plate5.png') },

    { id: '41', category: '생활용품', name: '붕어빵 쉐이커', price: '21,000원', image: require('../../../assets/product/lifetool/shaker/shaker1.png') },
    { id: '42', category: '생활용품', name: '붕어빵 쉐이커', price: '10,000원', image: require('../../../assets/product/lifetool/shaker/shaker2.png') },
    { id: '43', category: '생활용품', name: '붕어빵 쉐이커', price: '6,000원', image: require('../../../assets/product/lifetool/shaker/shaker3.png') },
    { id: '44', category: '생활용품', name: '붕어빵 쉐이커', price: '10,000원', image: require('../../../assets/product/lifetool/shaker/shaker4.png') },
    { id: '45', category: '생활용품', name: '붕어빵 쉐이커', price: '13,000원', image: require('../../../assets/product/lifetool/shaker/shaker5.png') },

    { id: '46', category: '생활용품', name: '붕어빵 타월', price: '101,000원', image: require('../../../assets/product/lifetool/towel/towel1.png') },
    { id: '47', category: '생활용품', name: '붕어빵 타월', price: '79,000원', image: require('../../../assets/product/lifetool/towel/towel2.png') },
    { id: '48', category: '생활용품', name: '붕어빵 타월', price: '10,000원', image: require('../../../assets/product/lifetool/towel/towel3.png') },
    { id: '49', category: '생활용품', name: '붕어빵 타월', price: '15,000원', image: require('../../../assets/product/lifetool/towel/towel4.png') },
    { id: '50', category: '생활용품', name: '붕어빵 타월', price: '30,000원', image: require('../../../assets/product/lifetool/towel/towel5.png') },
  ];

  export default PRODUCTS;