// 疑似ログイン管理

const currentPage = window.location.pathname.split("/").pop();

// index.htmlを開いたとき
if (currentPage === "index.html" || currentPage === "") {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

    // ログインしていなければログイン画面へ
    if (!isLoggedIn) {
        window.location.href = "login.html";
    }
}
// ログインボタン
const loginButton =
    document.getElementById("login-button");

if (loginButton) {

    loginButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            // 疑似的にログイン状態を保存
            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            // ホーム画面へ
            window.location.href =
                "index.html";
        }
    );

}

// 新規登録
const newUserButton = document.getElementById("new-user-button");

if (newUserButton) {
    newUserButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "sigunupmail.html";
    });
}

// ログインへ戻る
const backLoginButton = document.getElementById("back-login-button");

if (backLoginButton) {
    backLoginButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "login.html";
    });
}
// 要素取得

const trophyCards = document.querySelectorAll(".trophy-card");
const trophyPopup = document.getElementById("trophy-popup");
const popupCloseButton = document.querySelector(".popup-close-button");
const popupImage = document.querySelector(".popup-trophy-image");
const popupCurrent = document.querySelector(".popup-current");
const popupTotal = document.querySelector(".popup-total");

const popupProgressFill =
    document.getElementById("popup-progress-fill");

const rarityData = {

    rainbow: {
        image: "image/icon/rainbow.webp",
        current: 2,
        total: 10
    },

    gold: {
        image: "image/icon/gold.webp",
        current: 15,
        total: 20
    },

    silver: {
        image: "image/icon/silver.webp",
        current: 30,
        total: 50
    },

    bronze: {
        image: "image/icon/bronze.webp",
        current: 70,
        total: 100
    }
};

// ========================================
// 初期カテゴリー
// ========================================
let categoryData = {
    1: {
        id: 1,
        name: "日本を制覇しよう",
        image: "image/japan/japan.webp",
        current: 0,
        total: 56,
        order: 0,

        isInitial: true
    },

    2: {
        id: 2,
        name: "旅行に行こう",
        image: "image/trophy/IMG_5258.webp",
        current: 0,
        total: 10,
        order: 1,

        isInitial: true
    },

    3: {
        id: 3,
        name: "お散歩しよう",
        image: "image/trophy/IMG_5268.webp",
        current: 0,
        total: 8,
        order: 2,
        isInitial: true
    },
};
// ========================================
// 初期トロフィー
// ========================================
let trophyData = {};
// ========================================
// 地方と都道府県
// ========================================
const regionPrefectures = {
    "北海道地方": [
        "北海道",
    ],
    "東北地方": [
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県"
    ],
    "関東地方": [
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県"
    ],
    "中部地方": [
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県"
    ],
    "近畿地方": [
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県"
    ],
    "中国地方": [
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県"
    ],
    "四国地方": [
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県"
    ],
    "九州・沖縄地方": [
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県"
    ]
};
const prefectureDescriptions = {
        "北海道": "北海道制覇",

        "青森県": "青森県制覇",
        "岩手県": "岩手県制覇",
        "宮城県": "宮城県制覇",
        "秋田県": "秋田県制覇",
        "山形県": "山形県制覇",
        "福島県": "福島県制覇",

        "茨城県": "茨城県制覇",
        "栃木県": "栃木県制覇",
        "群馬県": "群馬県制覇",
        "埼玉県": "埼玉県制覇",
        "千葉県": "千葉県制覇",
        "東京都": "東京都制覇",
        "神奈川県": "神奈川県制覇",

        "新潟県": "新潟県制覇",
        "富山県": "富山県制覇",
        "石川県": "石川県制覇",
        "福井県": "福井県制覇",
        "山梨県": "山梨県制覇",
        "長野県": "長野県制覇",
        "岐阜県": "岐阜県制覇",
        "静岡県": "静岡県制覇",
        "愛知県": "愛知県制覇",

        "三重県": "三重県制覇",
        "滋賀県": "滋賀県制覇",
        "京都府": "京都府制覇",
        "大阪府": "大阪府制覇",
        "兵庫県": "兵庫県制覇",
        "奈良県": "奈良県制覇",
        "和歌山県": "和歌山県制覇",

        "鳥取県": "鳥取県制覇",
        "島根県": "島根県制覇",
        "岡山県": "岡山県制覇",
        "広島県": "広島県制覇",
        "山口県": "山口県制覇",

        "徳島県": "徳島県制覇",
        "香川県": "香川県制覇",
        "愛媛県": "愛媛県制覇",
        "高知県": "高知県制覇",

        "福岡県": "福岡県制覇",
        "佐賀県": "佐賀県制覇",
        "長崎県": "長崎県制覇",
        "熊本県": "熊本県制覇",
        "大分県": "大分県制覇",
        "宮崎県": "宮崎県制覇",
        "鹿児島県": "鹿児島県制覇",
        "沖縄県": "沖縄県制覇",

};
const prefectureImages = {

    "北海道": "image/japan/hokkaidou.webp",

    "青森県": "image/japan/aomori.webp",
    "岩手県": "image/japan/iwate.webp",
    "宮城県": "image/japan/miyagi.webp",
    "秋田県": "image/japan/akita.webp",
    "山形県": "image/japan/yamagata.webp",
    "福島県": "image/japan/hukusima.webp",

    "茨城県": "image/japan/ibaraki.webp",
    "栃木県": "image/japan/totigi.webp",
    "群馬県": "image/japan/gunma.webp",
    "埼玉県": "image/japan/saitama.webp",
    "千葉県": "image/japan/tiba.webp",
    "東京都": "image/japan/toukyou.webp",
    "神奈川県": "image/japan/kanagawa.webp",

    "新潟県": "image/japan/niigata.webp",
    "富山県": "image/japan/toyama.webp",
    "石川県": "image/japan/isikawa.webp",
    "福井県": "image/japan/hukui.webp",
    "山梨県": "image/japan/yamanasi.webp",
    "長野県": "image/japan/nagano.webp",
    "岐阜県": "image/japan/gihu.webp",
    "静岡県": "image/japan/sizuoka.webp",
    "愛知県": "image/japan/aiti.webp",

    "三重県": "image/japan/mie.webp",
    "滋賀県": "image/japan/siga.webp",
    "京都府": "image/japan/kyouto.webp",
    "大阪府": "image/japan/oosaka.webp",
    "兵庫県": "image/japan/hyougo.webp",
    "奈良県": "image/japan/nara.webp",
    "和歌山県": "image/japan/wakayama.webp",

    "鳥取県": "image/japan/tottori.webp",
    "島根県": "image/japan/simane.webp",
    "岡山県": "image/japan/okayama.webp",
    "広島県": "image/japan/hirosima.webp",
    "山口県": "image/japan/yamaguti.webp",

    "徳島県": "image/japan/tokusima.webp",
    "香川県": "image/japan/kagawa.webp",
    "愛媛県": "image/japan/ehime.webp",
    "高知県": "image/japan/kouti.webp",

    "福岡県": "image/japan/hukuoka.webp",
    "佐賀県": "image/japan/saga.webp",
    "長崎県": "image/japan/nagasaki.webp",
    "熊本県": "image/japan/kumamoto.webp",
    "大分県": "image/japan/ooita.webp",
    "宮崎県": "image/japan/miyazaki.webp",
    "鹿児島県": "image/japan/kagosima.webp",
    "沖縄県": "image/japan/okinawa.webp"

};
const regionImages = {

    "北海道地方": "image/japan/hokkaidou.webp",
    "東北地方": "image/japan/touhoku.webp",
    "関東地方": "image/japan/kantou.webp",
    "中部地方": "image/japan/tyuubu.webp",
    "近畿地方": "image/japan/kinki.webp",
    "中国地方": "image/japan/tyuugoku.webp",
    "四国地方": "image/japan/sikoku.webp",
    "九州・沖縄地方": "image/japan/kyuusyuu.webp"
};
// ========================================
// 初期トロフィーを自動生成
// ========================================
let initialTrophyId = 1;
let initialTrophyOrder = 0;
// ========================================
// 日本全制覇
// 一番上
// ========================================
trophyData[initialTrophyId] = {

    id: initialTrophyId,
    name: "日本全制覇",
    subtitle: "47都道府県をすべて制覇",
    image: "image/japan/japan.webp",
    categoryId: 1,
    rarity: "rainbow",
    type: "japan",

    isInitial: true,

    completed: false,
    completedDate: null,
    order: initialTrophyOrder

};
initialTrophyId++;
initialTrophyOrder++;
// ========================================
// 地方制覇
// ↓
// その地方の都道府県
// ========================================
Object.entries(regionPrefectures).forEach(
    ([regionName, prefectures]) => {
        // ------------------------------
        // 地方制覇
        // ------------------------------
        trophyData[initialTrophyId] = {
            id: initialTrophyId,
            name:
                `${regionName}全制覇`,
            subtitle:
                `${regionName}の全都道府県を訪れる`,
            image:
                regionImages[regionName] ||
                "image/icon/default.webp",
            categoryId: 1,
            rarity: "gold",
            type: "region",
            region: regionName,
            completed: false,
            completedDate: null,
            order: initialTrophyOrder,

            isInitial: true,
        };
        initialTrophyId++;
        initialTrophyOrder++;
        // ------------------------------
        // 都道府県
        // ------------------------------
        prefectures.forEach(
            (prefecture) => {
                trophyData[
                    initialTrophyId
                ] = {
                    id:
                        initialTrophyId,
                    name:
                        prefectureDescriptions[prefecture],
                    description:
                        prefectureDescriptions[prefecture],
                    subtitle:
                        `${prefecture}を訪れる`,
                    image:
                        prefectureImages[prefecture] ||
                        "image/icon/default.webp",
                    categoryId: 1,
                    rarity:
                        "bronze",
                    type:
                        "prefecture",
                    region:
                        regionName,
                    completed:
                        false,
                    completedDate:
                        null,
                    order:
                        initialTrophyOrder,

                        isInitial: true,
                };
                initialTrophyId++;
                initialTrophyOrder++;
            }
        );
    }
);
// ========================================
// 旅行に行こう
// ========================================

const travelTrophies = [
    {
        name: "一日リフレッシュ計画",
        subtitle: "日帰り旅行に行く",
        rarity:"gold",
        image: "image/trophy/IMG_5255.webp",
    },
    {
        name: "1人だって怖くない",
        subtitle: "1人で旅行に行く",
        rarity:"silver",
        image: "image/trophy/IMG_5255.webp",
    },
    {
        name: "のんびり行こう",
        subtitle: "普通列車だけで旅行に行く",
        rarity:"silver",
        image: "image/trophy/IMG_5256.webp",
    },
    {
        name: "贅沢に行こう",
        subtitle: "新幹線に乗る",
        rarity:"silver",
        image: "image/trophy/IMG_5257.webp",
    },
    {
        name: "ひとっ飛び",
        subtitle: "飛行機に乗る",
        rarity:"silver",
        image: "image/trophy/IMG_5258.webp",
    },
    {
        name: "酔ってない？",
        subtitle: "フェリーに乗る",
        rarity:"silver",
        image: "image/trophy/IMG_5259.webp",
    },
    {
        name: "はいチーズ",
        subtitle: "旅行先で写真を撮る",
        rarity:"bronze",
        image: "image/trophy/IMG_5260.webp",
    },
    {
        name: "グルメ",
        subtitle: "旅行先の名物を食べる",
        rarity:"bronze",
        image: "image/trophy/IMG_5261.webp",
    },
        {
        name: "明日起きれる？",
        subtitle: "旅行先で夜に散歩する",
        rarity:"bronze",
        image: "image/trophy/IMG_5262.webp",
    },
    {
        name: "そんな日だってある",
        subtitle: "旅行先が雨",
        rarity:"bronze",
        image: "image/trophy/IMG_5263.webp",
    }
];
const walkTrophies = [
    {
        name: "どこから来たの？",
        subtitle: "猫を見つける",
        rarity: "gold",
        image: "image/trophy/IMG_5264.webp",
    },
    {
        name: "新天地",
        subtitle: "降りたことのない駅で降りる",
        rarity: "silver",
        image: "image/trophy/IMG_5266.webp",
    },
    {
        name: "コーヒーいかが？",
        subtitle: "喫茶店に入る",
        rarity: "silver",
        image: "image/trophy/IMG_5265.webp",
    },
    {
        name: "風邪引くなよ",
        subtitle: "雨の中傘を刺さずに歩く",
        rarity: "silver",
        image: "image/trophy/IMG_5263.webp",
    },
    {
        name: "お散歩日和",
        subtitle: "散歩に出かける",
        rarity: "bronze",
        image: "image/trophy/IMG_5274.webp",
    },
    {
        name: "大冒険",
        subtitle: "地図を見ずに散歩する",
        rarity: "bronze",
        image: "image/trophy/IMG_5266.webp",
    },
    {
        name: "小さな幸せ",
        subtitle: "お花を見つける",
        rarity: "bronze",
        image: "image/trophy/IMG_5267.webp",
    },
    {
        name: "ひと休みしてく？",
        subtitle: "公園を見つける",
        rarity: "bronze",
        image: "image/trophy/IMG_5268.webp",
    },
];


travelTrophies.forEach((travelTrophy) => {

    trophyData[initialTrophyId] = {

        id: initialTrophyId,

        name: travelTrophy.name,

        subtitle: travelTrophy.subtitle,

        image: 
            travelTrophy.image || 
            "image/icon/default.webp",

        categoryId: 2,

        rarity: travelTrophy.rarity,

        type: "normal",

        completed: false,

        completedDate: null,

        order: initialTrophyOrder,

        isInitial: true

    };

    initialTrophyId++;
    initialTrophyOrder++;

});

walkTrophies.forEach((walkTrophy) => {

    trophyData[initialTrophyId] = {

        id: initialTrophyId,

        name: walkTrophy.name,

        subtitle: walkTrophy.subtitle,

        image:
            walkTrophy.image ||
            "image/icon/default.webp",

        categoryId: 3,

        rarity: walkTrophy.rarity,

        type: "normal",

        completed: false,

        completedDate: null,

        order: initialTrophyOrder,

        isInitial: true

    };

    initialTrophyId++;
    initialTrophyOrder++;

});
// ========================================
// 日本全制覇カテゴリー
// 自動クリア判定
// ========================================

function updateJapanConquestTrophies() {

    const today =
        new Date().toLocaleDateString(
            "ja-JP"
        );


    // ====================================
    // 地方制覇を判定
    // ====================================

    Object.keys(
        regionPrefectures
    ).forEach((regionName) => {

        // この地方の県トロフィー
        const prefectureTrophies =
            Object.values(
                trophyData
            ).filter((trophy) => {

                return (
                    trophy.type ===
                        "prefecture" &&

                    trophy.region ===
                        regionName
                );

            });


        // 全県クリアしているか
        const allCompleted =
            prefectureTrophies.length > 0 &&

            prefectureTrophies.every(
                (trophy) =>
                    trophy.completed
            );


        // 地方制覇トロフィー
        const regionTrophy =
            Object.values(
                trophyData
            ).find((trophy) => {

                return (
                    trophy.type ===
                        "region" &&

                    trophy.region ===
                        regionName
                );

            });


        if (!regionTrophy) {
            return;
        }


        // ------------------------------
        // 地方制覇
        // ------------------------------

        if (allCompleted) {

            // 初めてクリアした場合だけ
            // 日付を保存
            if (
                !regionTrophy.completed
            ) {

                regionTrophy.completed =
                    true;

                regionTrophy.completedDate =
                    today;

                    showTrophyNotification(
                regionTrophy
                );
            }

        } else {

            // 県のクリアを解除した場合
            // 地方制覇も解除
            regionTrophy.completed =
                false;

            regionTrophy.completedDate =
                null;

        }

    });
    


    // ====================================
    // 日本全制覇を判定
    // ====================================

    const prefectureTrophies =
        Object.values(
            trophyData
        ).filter((trophy) => {

            return (
                trophy.type ===
                "prefecture"
            );

        });


    const allJapanCompleted =
        prefectureTrophies.length === 47 &&

        prefectureTrophies.every(
            (trophy) =>
                trophy.completed
        );


    const japanTrophy =
        Object.values(
            trophyData
        ).find((trophy) => {

            return (
                trophy.type ===
                "japan"
            );

        });


    if (!japanTrophy) {
        return;
    }


    if (allJapanCompleted) {

        if (
            !japanTrophy.completed
        ) {

            japanTrophy.completed =
                true;

            japanTrophy.completedDate =
                today;

                showTrophyNotification(
                japanTrophy
                );

        }

    } else {

        japanTrophy.completed =
            false;

        japanTrophy.completedDate =
            null;

    }
    saveAppData();
}

// ==============================
// LocalStorage 保存・読み込み
// ==============================

const STORAGE_KEY = "trophyAppData";

function saveAppData() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            categoryData: categoryData,
            trophyData: trophyData
        })
    );
}

function loadAppData() {
    const savedData = localStorage.getItem(STORAGE_KEY);

    // 保存データがなければ初期データをそのまま使う
    if (!savedData) {
        return;
    }

    try {
        const data = JSON.parse(savedData);

        if (data.categoryData) {
            categoryData = data.categoryData;
        }

        if (data.trophyData) {
            trophyData = data.trophyData;
        }

    } catch (error) {
        console.error("LocalStorageの読み込みに失敗しました:", error);
    }
}
loadAppData();
// ページに戻ってきたときにLocalStorageから最新データを読み込む
window.addEventListener("pageshow", () => {
    loadAppData();

    renderTrophyList();
    renderCategoryList();

    updateRarityPopupSummary();
});
//　設定ポップアップ用
// 要素取得
const trophyList =
    document.getElementById("trophy-list") ??
    document.getElementById("category-trophy-list-container");
const categoryMenu = document.getElementById("category-menu");
const categoryOverlay = document.getElementById("category-overlay");
const trophyMenu = document.getElementById("trophy-menu");
const trophyOverlay = document.getElementById("trophy-overlay");

const editNameModal = document.getElementById("edit-name-modal");
const editNameModalTitle = document.getElementById("edit-name-modal-title")
const editNameLabel = document.getElementById("edit-name-label");;
const editNameInput = document.getElementById("edit-name-input");
const editSubtitleField = document.getElementById("edit-subtitle-field");
const editSubtitleInput = document.getElementById("edit-subtitle-input");
const editNameCancelButton = document.getElementById("edit-name-cancel-button");
const editNameConfirmButton = document.getElementById("edit-name-confirm-button");
const renameCategoryButton = document.getElementById("rename-category");
const renameTrophyButton = document.getElementById("rename-trophy");

const editImageModal = document.getElementById("edit-image-modal");
const editImageModalTitle = document.getElementById("edit-image-modal-title");
const editImagePreview = document.getElementById("edit-image-preview");
const editImageInput = document.getElementById("edit-image-input");
const editImageSelectButton = document.getElementById("edit-image-select-button");
const editImageCancelButton = document.getElementById("edit-image-cancel-button");
const editImageConfirmButton = document.getElementById("edit-image-confirm-button");
const categoryImageButton = document.getElementById("category-image");
const trophyImageButton = document.getElementById("trophy-image");

const changeCategoryButton = document.getElementById("change-category");
const changeCategoryModal = document.getElementById("change-category-modal");
const changeCategoryList = document.getElementById("change-category-list");
const changeCategoryCancelButton = document.getElementById("change-category-cancel-button");
const changeCategoryConfirmButton = document.getElementById("change-category-confirm-button");

const changeRarityButton = document.getElementById("change-rarity");
const changeRarityModal = document.getElementById("change-rarity-modal");
const changeRarityList = document.getElementById("change-rarity-list");
const changeRarityCancelButton = document.getElementById("change-rarity-cancel-button");
const changeRarityConfirmButton = document.getElementById("change-rarity-confirm-button");

const changeCompleteDateModal = document.getElementById("change-complete-date-modal");
const changeCompleteDateInput = document.getElementById("change-complete-date-input");
const changeCompleteDateCancelButton = document.getElementById("change-complete-date-cancel-button");
const changeCompleteDateConfirmButton = document.getElementById("change-complete-date-confirm-button");

const toggleCompleteButton = document.getElementById("toggle-complete");
const changeCompleteDateButton = document.getElementById("change-complete-date");

const addButton = document.getElementById("category-add-button");
const modal = document.getElementById("category-modal");
const cancelButton = document.getElementById("cancel-button");
const createButton = document.getElementById("create-button");
const categoryCreateNameInput =
    document.getElementById("category-create-name");

const categoryCreateImageInput = document.getElementById("category-create-image");
const categoryCreateSelectImageButton = document.getElementById("category-create-select-image");
const categoryCreatePreview = document.getElementById("category-create-preview");

const deleteTrophyButton = document.getElementById("delete-trophy");
const deleteTrophyModal = document.getElementById("delete-trophy-modal");
const deleteTrophyCancelButton = document.getElementById("delete-trophy-cancel-button");
const deleteTrophyConfirmButton = document.getElementById("delete-trophy-confirm-button");

const deleteCategoryButton = document.getElementById("delete-category");
const deleteCategoryModal = document.getElementById("delete-category-modal");
const deleteCategoryCancelButton = document.getElementById("delete-category-cancel-button");
const deleteCategoryNextButton = document.getElementById("delete-category-next-button");
const deleteCategoryFinalModal = document.getElementById("delete-category-final-modal");
const deleteCategoryFinalCancelButton = document.getElementById("delete-category-final-cancel-button");
const deleteCategoryFinalConfirmButton = document.getElementById("delete-category-final-confirm-button");

const createTrophyModal = document.getElementById("create-trophy-modal");
const trophyAddButton = document.getElementById("trophy-add-button");
const createTrophyCancelButton = document.getElementById("create-trophy-cancel");
const createTrophyConfirmButton = document.getElementById("create-trophy-confirm");

const createTrophyRarityList = document.getElementById("create-trophy-rarity-list");
const createTrophyImageInput = document.getElementById("create-trophy-image");
const createTrophySelectImageButton = document.getElementById("create-trophy-select-image");
const createTrophyPreview = document.getElementById("create-trophy-preview");

const createTrophyNameInput = document.getElementById("create-trophy-name");
const createTrophySubtitleInput = document.getElementById("create-trophy-subtitle");

const pageParams = new URLSearchParams(window.location.search);
const categoryPageIdValue = pageParams.get("id");
const targetTrophyIdValue =
    pageParams.get("trophy");

const targetTrophyId =
    targetTrophyIdValue === null
        ? null
        : Number(targetTrophyIdValue);
const categoryPageId = categoryPageIdValue === null
        ? null
        : Number(categoryPageIdValue);
        const categoryPageSettingButton =
    document.getElementById(
        "category-page-setting"
    );
let hasJumpedToTargetTrophy = false;

if (
    categoryPageSettingButton &&
    categoryPageId !== null
) {
    categoryPageSettingButton.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();

            openCategoryMenu(
                categoryPageSettingButton,
                categoryPageId
            );
        }
    );
}
        function updateCategoryPageSummary() {

    if (categoryPageId === null) return;

    const category =
        categoryData[categoryPageId];

    if (!category) return;

    const categoryTrophies =
        Object.values(trophyData).filter((trophy) => {
            return Number(trophy.categoryId) ===
                Number(categoryPageId);
        });

    const totalCount =
        categoryTrophies.length;

    const completedCount =
        categoryTrophies.filter((trophy) => {
            return trophy.completed;
        }).length;

    const completePercent =
        totalCount === 0
            ? 0
            : Math.round(
                completedCount / totalCount * 100
            );

    const image =
        document.getElementById(
            "category-summary-image"
        );

    const current =
        document.getElementById(
            "category-summary-current"
        );

    const total =
        document.getElementById(
            "category-summary-total"
        );

    const progress =
        document.getElementById(
            "category-summary-progress"
        );

    const fill =
        document.getElementById(
            "category-summary-fill"
        );

    if (image) {
        // ユーザーがカテゴリーに設定した画像
        image.src =
            category.image ??
            "image/icon/default.webp";

        image.alt = category.name;
    }

    if (current) {
        current.textContent =
            completedCount;
    }

    if (total) {
        total.textContent =
            totalCount;
    }

    if (fill) {
        fill.style.width =
            `${completePercent}%`;
    }

    if (progress) {
        progress.setAttribute(
            "aria-valuenow",
            completePercent
        );

        progress.setAttribute(
            "aria-label",
            `${category.name}のクリア率 ${completePercent}%`
        );
    }

}
const categoryPageTitle =
    document.getElementById("category-page-title");
if (
    categoryPageTitle &&
    categoryPageId !== null
) {
    const category =
        categoryData[categoryPageId];
    if (category) {
        categoryPageTitle.textContent =
            category.name;
    } else {
        categoryPageTitle.textContent =
            "カテゴリーが見つかりません";
    }
}

//　戻るボタン
const headerBackButtons =
    document.querySelectorAll(".header-back");

headerBackButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }

    });

});

//　検索ボタン
const headerSearchButtons =
    document.querySelectorAll(".header-search");

headerSearchButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // 新しく検索ページを開くときはリセット
        sessionStorage.removeItem(
            "trophySearchKeyword"
        );

        window.location.href = "search.html";

    });

});

//　設定ボタン
const settingsButton = document.querySelector(".header-setting");

if (settingsButton) {
    settingsButton.addEventListener("click", () => {
        window.location.href = "settings.html";
    });
}

//　レアリティごと表示
//　要素取得
let currentRarityFilter = null;
// 開く
trophyCards.forEach((card) => {

    card.addEventListener("click", () => {

        const rarity = card.dataset.rarity;
        const data = rarityData[rarity];

        currentRarityFilter = rarity;

        popupImage.src = data.image;

        const rarityTrophies =
            Object.values(trophyData).filter((trophy) => {

                return trophy.rarity === rarity;

            });

        const completedTrophies =
            rarityTrophies.filter((trophy) => {

                return trophy.completed;

            });

        const totalCount =
            rarityTrophies.length;

        const completedCount =
            completedTrophies.length;

        const completePercent =
            totalCount === 0
                ? 0
                : Math.round(
                    completedCount /
                    totalCount *
                    100
                );

        popupCurrent.textContent =
            completedCount;

        popupTotal.textContent =
            totalCount;

renderTrophyList();

trophyPopup.classList.add("show");

if (popupProgressFill) {

    popupProgressFill.style.width = "0%";

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {
            popupProgressFill.style.width =
                `${completePercent}%`;
        });

    });

}

        renderTrophyList();

        trophyPopup.classList.add("show");

    });

});


// 閉じる

if (popupCloseButton && trophyPopup) {

    popupCloseButton.addEventListener("click", () => {

        trophyPopup.classList.remove("show");

        currentRarityFilter = null;

    });

}

// カテゴリーボタン識別
document.querySelectorAll(".category-card").forEach(card => {

    if (card) {

        card.addEventListener("click", () => {

        window.location.href = "category.html";

        });

    }

});
// レアリティボタン表示
function updateRaritySummary() {

    trophyCards.forEach((card) => {

        const rarity = card.dataset.rarity;

        const rarityTrophies =
            Object.values(trophyData).filter(
                (trophy) => {
                    return trophy.rarity === rarity;
                }
            );

        const completedCount =
            rarityTrophies.filter(
                (trophy) => trophy.completed
            ).length;

        const totalCount =
            rarityTrophies.length;

        const completePercent =
            totalCount === 0
                ? 0
                : Math.round(
                    completedCount / totalCount * 100
                );

        const currentElement =
            card.querySelector(".current");

        const totalElement =
            card.querySelector(".total");

        const progressBar =
            card.querySelector(".rarity-progress-bar");

        const progressFill =
            card.querySelector(".rarity-progress-fill");

        if (currentElement) {
            currentElement.textContent =
                completedCount;
        }

        if (totalElement) {
            totalElement.textContent =
                totalCount;
        }

        if (progressFill) {
            progressFill.style.width =
                `${completePercent}%`;
        }

        if (progressBar) {
            progressBar.setAttribute(
                "aria-valuenow",
                completePercent
            );

            progressBar.setAttribute(
                "aria-label",
                `クリア率 ${completePercent}%`
            );
        }

    });

}
function renderTrophyList() {

    if (!trophyList) return;

    trophyList.innerHTML = "";

const displayedTrophies =
    Object.values(trophyData).filter((trophy) => {

        // category.htmlではカテゴリーで絞り込む
        if (
            categoryPageId !== null &&
            Number(trophy.categoryId) !== categoryPageId
        ) {
            return false;
        }

        // レアリティポップアップではレアリティで絞り込む
        if (
            currentRarityFilter !== null &&
            trophy.rarity !== currentRarityFilter
        ) {
            return false;
        }

        return true;

        }).sort((a, b) => {

    // 未クリアを先、クリア済みを後ろへまとめる
    if (a.completed !== b.completed) {

        return Number(a.completed) -
            Number(b.completed);

    }

    const categoryA =
        categoryData[a.categoryId];

    const categoryB =
        categoryData[b.categoryId];

    const categoryOrderA =
        categoryA?.order ?? categoryA?.id ?? 0;

    const categoryOrderB =
        categoryB?.order ?? categoryB?.id ?? 0;

    // 同じクリア状態ならカテゴリー順
    if (categoryOrderA !== categoryOrderB) {

        return categoryOrderA - categoryOrderB;

    }

    // 同じカテゴリーならトロフィー順
    return (
        (a.order ?? a.id) -
        (b.order ?? b.id)
    );

});

let completedStackHeaderAdded = false;
let completedStackCount = 0;

    displayedTrophies.forEach((trophy, index) => {
// 最初のクリア済みトロフィーの前に操作カードを作る
if (
    trophy.completed &&
    !completedStackHeaderAdded
) {

    completedStackHeaderAdded = true;

    const completedStackToggle =
        document.createElement("button");

    completedStackToggle.type = "button";

completedStackToggle.className =
    "trophy-item-card completed-stack-toggle";

completedStackToggle.innerHTML = `

    <div class="trophy-item-image">

        <img
            class="trophy-item-photo"
            src="image/icon/none.webp"
        >

    </div>

    <div class="trophy-item-info">

        <h3 class="trophy-item-title">

            <span>
                クリア済みトロフィー
            </span>

        </h3>
        <p class="trophy-item-subtitle"></p>

        <p class="trophy-item-complete hidden">

            クリア済み

            <span class="trophy-complete-date">
            </span>

        </p>

    </div>

`;

    completedStackToggle.addEventListener(
        "click",
        () => {

            trophyList.classList.toggle(
                "completed-stack-expanded"
            );

        }
    );

    trophyList.appendChild(
        completedStackToggle
    );

}
        const card = document.createElement("div");

if (trophy.completed) {

    completedStackCount++;

}

const hideInStack =
    trophy.completed &&
    completedStackCount > 3;

card.className = [
    "trophy-item",

    trophy.completed
        ? "trophy-item-completed"
        : "",

    hideInStack
        ? "trophy-item-stack-hidden"
        : ""

].filter(Boolean).join(" ");

        card.dataset.trophyId=trophy.id;

        card.innerHTML=`

            <button class="trophy-item-card">

                <div class="trophy-item-image">

                    <img
                        class="trophy-item-photo"
                        src="${trophy.image}"
                        alt="">

                </div>

                <div class="trophy-item-info">

                    <h3 class="trophy-item-title">
                        <img
                            class="trophy-rarity-icon"
                            src="${rarityData[trophy.rarity].image}"
                            alt=""
                        >

                        <span>${trophy.name}</span>

                    </h3>
                    <p class="trophy-item-subtitle">
                         ${trophy.subtitle ?? ""}
                    </p>
                    <p class="trophy-item-complete ${trophy.completed ? "" : "hidden"}">

                        ✓ クリア済み

                        <span class="trophy-complete-date">

                            ${trophy.completedDate ?? ""}

                        </span>

                    </p>

                </div>

            </button>

            <button class="trophy-item-setting">

                <img
                    class="setting-icon"
                    src="image/icon/settings.webp"
                    alt="設定">

            </button>

        `;

                const trophyCard =
            card.querySelector(".trophy-item-card");

        const settingButton =
            card.querySelector(".trophy-item-setting");


        if (trophyCard) {

            trophyCard.addEventListener("click", () => {

            console.log("選択したトロフィーID:", trophy.id);

            });

        }


        if (settingButton) {

            settingButton.addEventListener("click", (event) => {

            event.stopPropagation();

            openTrophyMenu(settingButton, trophy.id);

            });

        }
        // カテゴリーページでだけ並べ替え可能
if (categoryPageId !== null) {

    enableTrophyDrag(card);

}
trophyList.appendChild(card);

    });
updateRaritySummary();
updateCategoryPageSummary();

}

function updateRarityPopupSummary() {

    if (currentRarityFilter === null) {
        return;
    }

    const rarityTrophies =
        Object.values(trophyData).filter(
            (trophy) => {
                return trophy.rarity ===
                    currentRarityFilter;
            }
        );

    const totalCount =
        rarityTrophies.length;

    const completedCount =
        rarityTrophies.filter(
            (trophy) => trophy.completed
        ).length;

    const completePercent =
        totalCount === 0
            ? 0
            : Math.round(
                completedCount /
                totalCount *
                100
            );

    if (popupCurrent) {
        popupCurrent.textContent =
            completedCount;
    }

    if (popupTotal) {
        popupTotal.textContent =
            totalCount;
    }

    if (popupProgressFill) {
        popupProgressFill.style.width =
            `${completePercent}%`;
    }

}
function openCategoryMenu(button, categoryId) {

    // 同じボタンを押した場合は閉じる
    if (
        currentSettingButton === button &&
        categoryMenu.classList.contains("show")
    ) {

        closeCategoryMenu();

        return;
    }

    // 以前開いていたボタンの回転を戻す
    if (currentSettingButton) {

        currentSettingButton.classList.remove("open");

    }

    currentCategoryId = categoryId;
    currentSettingButton = button;

    const category =
    categoryData[currentCategoryId];


    const rect = button.getBoundingClientRect();

    categoryMenu.classList.add("show");
    categoryOverlay.classList.add("show");

    const menuRect =
        categoryMenu.getBoundingClientRect();

    const padding = 8;

    let left =
        rect.left - menuRect.width - 8;

    let top =
        rect.top +
        (rect.height - menuRect.height) / 2;

    left = Math.max(
        padding,
        Math.min(
            left,
            window.innerWidth - menuRect.width - padding
        )
    );

    top = Math.max(
        padding,
        Math.min(
            top,
            window.innerHeight - menuRect.height - padding
        )
    );

    categoryMenu.style.left = `${left}px`;
    categoryMenu.style.top = `${top}px`;

    button.classList.add("open");

}

function closeCategoryMenu() {

    if (categoryMenu) {
        categoryMenu.classList.remove("show");
    }

    if (categoryOverlay) {
        categoryOverlay.classList.remove("show");
    }

    if (currentSettingButton) {
        currentSettingButton.classList.remove("open");
    }

    currentCategoryId = null;
    currentSettingButton = null;

}

// 現在開いているカテゴリーID
let currentCategoryId = null;

// 現在開いている設定ボタン
let currentSettingButton = null;


// メニュー内を押しても閉じない
if (categoryMenu) {

    categoryMenu.addEventListener("click", (event) => {

        event.stopPropagation();

    });

}

// 外を押したら閉じる
if (categoryOverlay) {

    categoryOverlay.addEventListener(
        "click",
        closeCategoryMenu
    );

}

// トロフィー設定メニュー管理

// 現在選択しているトロフィーID
let currentTrophyId = null;

// 現在開いている設定ボタン
let currentTrophySettingButton = null;


// トロフィー設定メニューを開く
function openTrophyMenu(button, trophyId) {
    function updateTrophyMenuVisibility(trophy) {

    if (!trophy) return;

    const isInitial =
        trophy.isInitial === true;

    const isAutomatic =
        trophy.type === "region" ||
        trophy.type === "japan";


    // 名前変更
    if (renameTrophyButton) {
        renameTrophyButton.hidden =
            isInitial;
    }


    // 画像変更
    if (trophyImageButton) {
        trophyImageButton.hidden =
            isInitial;
    }


    // カテゴリー変更
    if (changeCategoryButton) {
        changeCategoryButton.hidden =
            isInitial;
    }


    // レアリティ変更
    if (changeRarityButton) {
        changeRarityButton.hidden =
            isInitial;
    }


    // 削除
    if (deleteTrophyButton) {
        deleteTrophyButton.hidden =
            isInitial;
    }


    // クリア状態
    if (toggleCompleteButton) {

        /*
        初期の地方制覇・日本制覇は
        自動判定なので手動変更させない
        */
        toggleCompleteButton.hidden =
            isInitial && isAutomatic;

    }


    // 日付変更
    if (changeCompleteDateButton) {

        /*
        クリア済みのときだけ表示
        */
        changeCompleteDateButton.hidden =
            !trophy.completed;

    }

}   
    
    if (!trophyMenu || !trophyOverlay) return;

    // 同じ設定ボタンをもう一度押した場合は閉じる
    if (
        currentTrophySettingButton === button &&
        trophyMenu.classList.contains("show")
    ) {
        closeTrophyMenu();
        return;
    }

    // 以前開いていた設定ボタンの回転を解除
    if (currentTrophySettingButton) {
        currentTrophySettingButton.classList.remove("open");
    }

    // 現在選択中のトロフィーを保存
    currentTrophyId = String(trophyId);
    currentTrophySettingButton = button;

    const trophy =
    trophyData[currentTrophyId];

updateTrophyMenuVisibility(trophy);
const visibleMenuItems =
    trophyMenu.querySelectorAll(
        "button:not([hidden])"
    );


// 表示できる項目が何もない場合
if (visibleMenuItems.length === 0) {

    trophyMenu.classList.remove("show");
    trophyOverlay.classList.remove("show");

    button.classList.remove("open");

    return;
}
    // メニューとオーバーレイを表示
    trophyMenu.classList.add("show");
    trophyOverlay.classList.add("show");

    // 表示後にメニューサイズを取得
    const buttonRect = button.getBoundingClientRect();
    const menuRect = trophyMenu.getBoundingClientRect();

    const padding = 8;
    const gap = 8;

    // 設定ボタンの左側に配置
    let left =
        buttonRect.left -
        menuRect.width -
        gap;

    // 設定ボタンとメニューの縦中央を合わせる
    let top =
        buttonRect.top +
        (buttonRect.height - menuRect.height) / 2;

    // 画面外にはみ出さないように調整
    left = Math.max(
        padding,
        Math.min(
            left,
            window.innerWidth - menuRect.width - padding
        )
    );

    top = Math.max(
        padding,
        Math.min(
            top,
            window.innerHeight - menuRect.height - padding
        )
    );

    trophyMenu.style.left = `${left}px`;
    trophyMenu.style.top = `${top}px`;

    // 設定アイコンを回転
    button.classList.add("open");

    // クリア状態に合わせて文字を更新
    updateToggleCompleteButton();

}

function updateToggleCompleteButton() {

    if (currentTrophyId === null) return;

    const trophy = trophyData[currentTrophyId];

    toggleCompleteButton.textContent =
        trophy.completed
            ? "クリア済みを解除"
            : "クリア済みにする";
if (trophy.completed) {

    changeCompleteDateButton.classList.remove("hidden");

} else {

    changeCompleteDateButton.classList.add("hidden");

}
}
//名前変更
let editNameTargetType = null;

//名前変更ポップアップを開く
function openEditNameModal(type, id, currentName,currentSubtitle = "") {

    editNameTargetType = type;
    editNameTargetId = id;

    editNameInput.value = currentName;

    if (editSubtitleField) {

    editSubtitleField.hidden =
        type !== "trophy";

}

if (editSubtitleInput) {

    editSubtitleInput.value =
        type === "trophy"
            ? currentSubtitle
            : "";

}

if (type === "category") {

    editNameModalTitle.textContent =
        "カテゴリー名を変更";

    // カテゴリーでは入力欄のラベルを非表示
    if (editNameLabel) {
        editNameLabel.hidden = true;
    }

} else if (type === "trophy") {

    editNameModalTitle.textContent =
        "トロフィーを編集";

    // トロフィーでは「タイトル」を表示
    if (editNameLabel) {
        editNameLabel.hidden = false;
        editNameLabel.textContent =
            "タイトル";
    }

}

    editNameModal.classList.add("show");

    editNameInput.focus();
    editNameInput.select();

}

// カテゴリー名変更
if (renameCategoryButton) {

    renameCategoryButton.addEventListener("click", () => {

        if (currentCategoryId === null) return;

        const category = categoryData[currentCategoryId];

        openEditNameModal(
            "category",
            currentCategoryId,
            category.name
        );

    });

}

// トロフィーの名前変更
if (renameTrophyButton) {

    renameTrophyButton.addEventListener("click", () => {

        if (currentTrophyId === null) return;

        const trophy = trophyData[currentTrophyId];

        openEditNameModal(
             "trophy",
            currentTrophyId,
            trophy.name,
            trophy.subtitle ?? ""
        );

    });

}
//　名前変更を閉じる
if (editNameConfirmButton) {

    editNameConfirmButton.addEventListener("click", () => {

        const newName = editNameInput.value.trim();

        if (newName === "") return;

        if (editNameTargetType === "category") {

categoryData[editNameTargetId].name = newName;

renderCategoryList();
updateCategoryPageSummary();

saveAppData();

if (categoryPageTitle) {
    categoryPageTitle.textContent = newName;
}
} else if (
    editNameTargetType === "trophy"
) {

    const trophy =
        trophyData[editNameTargetId];

    if (!trophy) return;

    trophy.name = newName;

    saveAppData();

    trophy.subtitle =
        editSubtitleInput
            ? editSubtitleInput.value.trim()
            : "";
    saveAppData();
    renderTrophyList();

}

        closeEditNameModal();

    });

}

//　名前変更内部
function closeEditNameModal() {

    editNameModal.classList.remove("show");

    editNameTargetType = null;
    editNameTargetId = null;

    editNameInput.value = "";

    if (editSubtitleInput) {
        editSubtitleInput.value = "";
    }

    if (editSubtitleField) {
        editSubtitleField.hidden = true;
    }

}
//　キャンセルボタン
if (editNameCancelButton) {

    editNameCancelButton.addEventListener(
        "click",
        closeEditNameModal
    );

}

// 画像変更
//　要素取得
let editImageTargetType = null;

let editImageTargetId = null;

let selectedImage = null;

let selectedImageData = null;

//　画像変更ポップアップを開く
function openEditImageModal(type, id, currentImage) {

    editImageTargetType = type;
    editImageTargetId = id;

    selectedImage = null;
    selectedImageData = null;

    editImageInput.value = "";
    editImagePreview.src = currentImage;

    if (type === "category") {

        editImageModalTitle.textContent =
            "カテゴリー画像を変更";

    } else {

        editImageModalTitle.textContent =
            "トロフィー画像を変更";

    }

    editImageModal.classList.add("show");

}
function closeEditImageModal() {

    editImageModal.classList.remove("show");

    editImageTargetType = null;
    editImageTargetId = null;

    selectedImage = null;
    selectedImageData = null;

    editImageInput.value = "";

}

//　画像変更ポップアップを開く閉じる
function closeEditImageModal() {

    editImageModal.classList.remove("show");

    editImageTargetType = null;
    editImageTargetId = null;
    selectedImage = null;

    editImageInput.value = "";

}
if (editImageCancelButton) {

    editImageCancelButton.addEventListener(
        "click",
        closeEditImageModal
    );

}

//　ファイルを開く
if (
    editImagePreview &&
    editImageInput
) {

    editImagePreview.addEventListener(
        "click",
        () => {
            editImageInput.click();
        }
    );

}
if (
    createTrophyPreview &&
    createTrophyImageInput
) {

    createTrophyPreview.addEventListener(
        "click",
        () => {
            createTrophyImageInput.click();
        }
    );

}
if (editImageSelectButton) {

    editImageSelectButton.addEventListener("click", () => {

    editImageInput.click();

    });

}

if (editImageInput) {

    editImageInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    selectedImage = file;

    const reader = new FileReader();

    reader.onload = () => {

        selectedImageData = reader.result;

        editImagePreview.src = selectedImageData;

    };

    reader.readAsDataURL(file);

    });

}


//　画像変更を保存する
if (editImageConfirmButton) {

    editImageConfirmButton.addEventListener("click", () => {

    if (!selectedImageData) {
        return;
    }

    if (editImageTargetType === "category") {

        const category = categoryData[editImageTargetId];

        if (!category) return;

category.image = selectedImageData;

saveAppData();

renderCategoryList();
updateCategoryPageSummary();

    } else if (editImageTargetType === "trophy") {

        const trophy = trophyData[editImageTargetId];

        if (!trophy) return;

        trophy.image = selectedImageData;

        saveAppData();

        renderTrophyList();

    }

    closeEditImageModal();

    });

}


// 開く　トロフィー
if (trophyImageButton) {

    trophyImageButton.addEventListener("click", () => {

    if (currentTrophyId === null) return;

    const trophy = trophyData[currentTrophyId];

    openEditImageModal(
        "trophy",
        currentTrophyId,
        trophy.image
    );

    closeTrophyMenu();

    });

}
// 開く　カテゴリー
if (categoryImageButton) {

    categoryImageButton.addEventListener("click", () => {

    if (currentCategoryId === null) return;

    const category = categoryData[currentCategoryId];

    openEditImageModal(
        "category",
        currentCategoryId,
        category.image
    );

    closeCategoryMenu();

    });

}

// ドラッグ中の画面端自動スクロール
let autoScrollY = 0;
let autoScrollAnimation = null;

function updateAutoScroll(pointerY) {
    autoScrollY = pointerY;
    if (autoScrollAnimation !== null) {
        return;
    }
    function scroll() {
        const edgeSize = 100;
        const maxSpeed = 10;
        let speed = 0;
        if (autoScrollY < edgeSize) {
            speed =
                -maxSpeed *
                (1 - autoScrollY / edgeSize);

        } else if (
            autoScrollY >
            window.innerHeight - edgeSize
        ) {
            const distance =
                window.innerHeight - autoScrollY;
            speed =
                maxSpeed *
                (1 - distance / edgeSize);
        }
        if (speed !== 0) {
            window.scrollBy(0, speed);
            autoScrollAnimation =
                requestAnimationFrame(scroll);
        } else {

            autoScrollAnimation = null;
        }
    }
    autoScrollAnimation =
        requestAnimationFrame(scroll);
}


function stopAutoScroll() {

    if (autoScrollAnimation !== null) {

        cancelAnimationFrame(
            autoScrollAnimation
        );

        autoScrollAnimation = null;
    }
}
//　===カテゴリー変更
//　要素取得
let selectedCategoryId = null;
//　一覧を描画
function enableCategoryDrag(wrapper) {

    let pressTimer = null;
    let isDragging = false;
    let activePointerId = null;

    let dragPreview = null;
    let dropIndicator = null;

    let pointerOffsetX = 0;
    let pointerOffsetY = 0;

    let moveFrame = null;
    let latestPointerX = 0;
    let latestPointerY = 0;
    let lastTouchY = 0;
    let dragPreviewHeight = 0;


    wrapper.addEventListener("pointerdown", (event) => {

        if (
            event.target.closest(".category-setting")
        ) {
            return;
        }

        if (!event.isPrimary) return;

        activePointerId = event.pointerId;

        lastTouchY = event.clientY;

        const originalRect =
            wrapper.getBoundingClientRect();

        pointerOffsetX =
            event.clientX - originalRect.left;

        pointerOffsetY =
            event.clientY - originalRect.top;

pressTimer = setTimeout(() => {

    isDragging = true;

    wrapper.classList.add("dragging");

    document.body.classList.add(
        "category-dragging"
    );

                document.body.classList.add(
                    "category-dragging"
                );

            // 指についてくる複製を作成
            dragPreview =
                wrapper.cloneNode(true);

            dragPreview.classList.add(
                "category-drag-preview"
            );

            dragPreview.style.width =
                `${originalRect.width}px`;

            dragPreview.style.height =
                `${originalRect.height}px`;

            dragPreviewHeight = originalRect.height;

            dragPreview.style.left =
                `${event.clientX - pointerOffsetX}px`;

            dragPreview.style.top =
                `${event.clientY - pointerOffsetY}px`;

            document.body.appendChild(
                dragPreview
            );
            dropIndicator =
                document.createElement("div");

            dropIndicator.className =
                "category-drop-indicator";

            wrapper.setPointerCapture(
                activePointerId
            );

        }, 500);

    });


wrapper.addEventListener("pointermove", (event) => {

    latestPointerX = event.clientX;
    latestPointerY = event.clientY;

    // =========================
    // まだドラッグしていない
    // =========================
    if (
    !isDragging &&
    !dragPreview &&
    event.pointerType === "touch"
) {

        const deltaY =
            lastTouchY - event.clientY;

        // 少しでも上下に動いたら
        // 長押しをキャンセル
        if (Math.abs(deltaY) > 5) {

            clearTimeout(pressTimer);
            pressTimer = null;
        }

        // 通常のページスクロール
        window.scrollBy(0, deltaY);

        lastTouchY = event.clientY;

        return;
    }

    // =========================
    // ドラッグ中
    // =========================

    event.preventDefault();

    updateAutoScroll(latestPointerY);

    // 前回の画面更新が終わっていなければ追加実行しない
    if (moveFrame !== null) {
        return;
    }

    moveFrame = requestAnimationFrame(() => {

        moveFrame = null;

        // 指についてくる複製だけを移動
        dragPreview.style.left =
            `${latestPointerX - pointerOffsetX}px`;

        dragPreview.style.top =
            `${latestPointerY - pointerOffsetY}px`;

        const container =
            document.getElementById(
                "category-list-container"
            );

        if (!container) return;

        const insertPositionY = latestPointerY;

        const otherWrappers = [
            ...container.querySelectorAll(
                ".category-wrapper"
            )
        ].filter((item) => item !== wrapper);

        const insertBeforeItem =
            otherWrappers.find((item) => {

                const rect =
                    item.getBoundingClientRect();

               return (
                insertPositionY <
                rect.top + rect.height / 2
            );

            });

if (insertBeforeItem) {

    container.insertBefore(
        dropIndicator,
        insertBeforeItem
    );

} else {

    container.appendChild(
        dropIndicator
    );

}

    });

});

    function finishDrag() {
        
        stopAutoScroll();
        if (
    dropIndicator &&
    dropIndicator.parentElement
) {

    dropIndicator.parentElement.insertBefore(
        wrapper,
        dropIndicator
    );

    dropIndicator.remove();
    dropIndicator = null;

}

        clearTimeout(pressTimer);

        if (moveFrame !== null) {
        cancelAnimationFrame(moveFrame);
        moveFrame = null;
        }

        if (!isDragging) return;

        isDragging = false;

        wrapper.classList.remove("dragging");

        document.body.classList.remove(
            "category-dragging"
        );

        if (dragPreview) {

            dragPreview.remove();
            dragPreview = null;

        }

        const wrappers =
            document.querySelectorAll(
                "#category-list-container " +
                ".category-wrapper"
            );

        wrappers.forEach((item, index) => {

            const id =
                Number(item.dataset.categoryId);

            if (categoryData[id]) {

                categoryData[id].order =
                    index;

            }

        });

        saveAppData();

        // ドラッグ終了直後のページ移動を防ぐ
        wrapper.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopImmediatePropagation();

            },
            {
                capture: true,
                once: true
            }
        );

    }


    wrapper.addEventListener(
        "pointerup",
        finishDrag
    );

    wrapper.addEventListener(
        "pointercancel",
        finishDrag
    );

}

//　トロフィー並び替え
function enableTrophyDrag(wrapper) {

    let pressTimer = null;
    let isDragging = false;
    let activePointerId = null;

    let dragPreview = null;
    let dropIndicator = null;

    let pointerOffsetX = 0;
    let pointerOffsetY = 0;

    let moveFrame = null;
    let latestPointerX = 0;
    let latestPointerY = 0;
    let lastTouchY = 0;
    let dragPreviewHeight = 0;


    wrapper.addEventListener("pointerdown", (event) => {

        if (
            event.target.closest(".trophy-item-setting")
        ) {
            return;
        }

        if (!event.isPrimary) return;

        activePointerId = event.pointerId;

        lastTouchY = event.clientY;

        const originalRect =
            wrapper.getBoundingClientRect();

        pointerOffsetX =
            event.clientX - originalRect.left;

        pointerOffsetY =
            event.clientY - originalRect.top;

pressTimer = setTimeout(() => {

    isDragging = true;

    wrapper.classList.add("dragging");

    document.body.classList.add(
        "trophy-dragging"
    );

                document.body.classList.add(
                    "trophy-dragging"
                );

            // 指についてくる複製を作成
            dragPreview =
                wrapper.cloneNode(true);

            dragPreview.classList.add(
                "trophy-drag-preview"
            );

            dragPreview.style.width =
                `${originalRect.width}px`;

            dragPreview.style.height =
                `${originalRect.height}px`;

            dragPreviewHeight = originalRect.height;

            dragPreview.style.left =
                `${event.clientX - pointerOffsetX}px`;

            dragPreview.style.top =
                `${event.clientY - pointerOffsetY}px`;

            document.body.appendChild(
                dragPreview
            );
            dropIndicator =
                document.createElement("div");

            dropIndicator.className =
                "trophy-drop-indicator";

            wrapper.setPointerCapture(
                activePointerId
            );

        }, 500);

    });


wrapper.addEventListener("pointermove", (event) => {

    latestPointerX = event.clientX;
    latestPointerY = event.clientY;

    // =========================
    // まだドラッグしていない
    // =========================
    if (
    !isDragging &&
    !dragPreview &&
    event.pointerType === "touch"
) {

        const deltaY =
            lastTouchY - event.clientY;

        // 少しでも上下に動いたら
        // 長押しをキャンセル
        if (Math.abs(deltaY) > 5) {

            clearTimeout(pressTimer);
            pressTimer = null;
        }

        // 通常のページスクロール
        window.scrollBy(0, deltaY);

        lastTouchY = event.clientY;

        return;
    }

    // =========================
    // ドラッグ中
    // =========================

    event.preventDefault();

    updateAutoScroll(latestPointerY);

    // 前回の画面更新が終わっていなければ追加実行しない
    if (moveFrame !== null) {
        return;
    }

    moveFrame = requestAnimationFrame(() => {

        moveFrame = null;

        // 指についてくる複製だけを移動
        dragPreview.style.left =
            `${latestPointerX - pointerOffsetX}px`;

        dragPreview.style.top =
            `${latestPointerY - pointerOffsetY}px`;

        const container =
            document.getElementById(
                "category-trophy-list-container"
            );

        if (!container) return;

        const insertPositionY = latestPointerY;

// 持っているトロフィーがクリア済みか
const draggingCompleted =
    wrapper.classList.contains(
        "trophy-item-completed"
    );

// 同じクリア状態のカードだけを対象にする
const otherWrappers = [
    ...container.querySelectorAll(
        ".trophy-item"
    )
].filter((item) => {

    if (item === wrapper) {
        return false;
    }

    const itemCompleted =
        item.classList.contains(
            "trophy-item-completed"
        );

    return itemCompleted === draggingCompleted;

});

const insertBeforeItem =
    otherWrappers.find((item) => {

        const rect =
            item.getBoundingClientRect();

        return (
            insertPositionY <
            rect.top + rect.height / 2
        );

    });

if (insertBeforeItem) {

    container.insertBefore(
        dropIndicator,
        insertBeforeItem
    );

} else if (!draggingCompleted) {

    /*
    未クリアの最後へ移動する場合でも、
    クリア済みの見出しより前に置く
    */
    const completedStackToggle =
        container.querySelector(
            ".completed-stack-toggle"
        );

    if (completedStackToggle) {

        container.insertBefore(
            dropIndicator,
            completedStackToggle
        );

    } else {

        container.appendChild(
            dropIndicator
        );

    }

} else {

    // クリア済みならクリア済みグループの最後へ
    container.appendChild(
        dropIndicator
    );

}

    });

});

    function finishDrag() {
        stopAutoScroll();
        if (
    dropIndicator &&
    dropIndicator.parentElement
) {

    dropIndicator.parentElement.insertBefore(
        wrapper,
        dropIndicator
    );

    dropIndicator.remove();
    dropIndicator = null;

}

        clearTimeout(pressTimer);

        if (moveFrame !== null) {
        cancelAnimationFrame(moveFrame);
        moveFrame = null;
        }

        if (!isDragging) return;

        isDragging = false;

        wrapper.classList.remove("dragging");

        document.body.classList.remove(
            "trophy-dragging"
        );

        if (dragPreview) {

            dragPreview.remove();
            dragPreview = null;

        }

        const wrappers =
            document.querySelectorAll(
                "#category-trophy-list-container " +
                ".trophy-item"
            );

        wrappers.forEach((item, index) => {

            const id =
                Number(item.dataset.trophyId);

            if (trophyData[id]) {

                trophyData[id].order =
                    index;

            }

        });

        saveAppData();

        // ドラッグ終了直後のページ移動を防ぐ
        wrapper.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopImmediatePropagation();

            },
            {
                capture: true,
                once: true
            }
        );

    }


    wrapper.addEventListener(
        "pointerup",
        finishDrag
    );

    wrapper.addEventListener(
        "pointercancel",
        finishDrag
    );

}


function renderChangeCategoryList(currentCategoryId) {

    changeCategoryList.innerHTML = "";

    Object.values(categoryData)
    .sort((a, b) => {

        const orderA = a.order ?? a.id;
        const orderB = b.order ?? b.id;

        return orderA - orderB;

    })
    .forEach((category) => {

        const label = document.createElement("label");

        label.className = "change-category-item";

        label.innerHTML = `
            <input
                type="radio"
                name="change-category"
                value="${category.id}"
                ${category.id == currentCategoryId ? "checked" : ""}
            >

            <span>${category.name}</span>
        `;

        const radio =
            label.querySelector('input[type="radio"]');

        if (radio) {

            radio.addEventListener("change", () => {

                selectedCategoryId = Number(radio.value);

            });

        }

        changeCategoryList.appendChild(label);

    });

}
//　カテゴリー変更を開く
function openChangeCategoryModal() {

    if (currentTrophyId === null) return;

    const trophy = trophyData[currentTrophyId];

    selectedCategoryId = trophy.categoryId;

    renderChangeCategoryList(trophy.categoryId);

    changeCategoryModal.classList.add("show");

}
//　キャンセルボタン
function closeChangeCategoryModal() {

    changeCategoryModal.classList.remove("show");

    selectedCategoryId = null;

}
if (changeCategoryCancelButton) {

    changeCategoryCancelButton.addEventListener(
        "click",
        closeChangeCategoryModal
    );

}
//　カテゴリー変更をひらく
if (changeCategoryButton) {

    changeCategoryButton.addEventListener("click", () => {

    openChangeCategoryModal();

    trophyMenu.classList.remove("show");
    trophyOverlay.classList.remove("show");

    if (currentTrophySettingButton) {
        currentTrophySettingButton.classList.remove("open");
    }

    });

}

//　変更ボタンのイベント
if (changeCategoryConfirmButton) {

    changeCategoryConfirmButton.addEventListener("click", () => {

    if (currentTrophyId === null) return;
    if (selectedCategoryId === null) return;

    const trophy = trophyData[currentTrophyId];

    if (!trophy) return;

    trophy.categoryId = selectedCategoryId;
    
    saveAppData();

    closeChangeCategoryModal();

    });

}

//　===レアリティ変更
//　要素取得
let selectedRarity = null;

//　一覧を描画
function renderChangeRarityList(
    currentRarity
) {

    if (!changeRarityList) return;

    changeRarityList.innerHTML = "";

    const rarityNames = {
        rainbow: "レインボー",
        gold: "ゴールド",
        silver: "シルバー",
        bronze: "ブロンズ"
    };

    Object.keys(rarityData).forEach(
        (rarity) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "change-rarity-item";

            if (
                rarity === currentRarity
            ) {
                button.classList.add(
                    "selected"
                );
            }

            button.setAttribute(
                "aria-label",
                rarityNames[rarity]
            );

            button.title =
                rarityNames[rarity];

            button.innerHTML = `
                <img
                    src="${
                        rarityData[rarity].image
                    }"
                    alt=""
                >
            `;

            button.addEventListener(
                "click",
                () => {

                    selectedRarity =
                        rarity;

                    // 選択状態を再描画
                    renderChangeRarityList(
                        rarity
                    );

                }
            );

            changeRarityList
                .appendChild(button);

        }
    );

}
// レアリティ変更を開く
function openChangeRarityModal() {


    if (currentTrophyId === null) {

        alert("2：トロフィーIDがありません");

        return;
    }

    const trophy = trophyData[currentTrophyId];

    if (!trophy) {

        alert("4：トロフィーデータがありません");

        return;
    }

    selectedRarity = trophy.rarity;

    renderChangeRarityList(trophy.rarity);

    changeRarityModal.classList.add("show");

}
//　閉じる
function closeChangeRarityModal() {

    changeRarityModal.classList.remove("show");

    selectedRarity = null;

}

// キャンセルボタン
if (changeRarityCancelButton) {

    changeRarityCancelButton.addEventListener(
        "click",
        closeChangeRarityModal
    );

}

// レアリティ変更を押したとき
if (changeRarityButton) {

    changeRarityButton.addEventListener("click", () => {

        openChangeRarityModal();

        trophyMenu.classList.remove("show");
        trophyOverlay.classList.remove("show");

        if (currentTrophySettingButton) {

            currentTrophySettingButton.classList.remove("open");

        }

    });

}

if (changeRarityConfirmButton) {

    changeRarityConfirmButton.addEventListener("click", () => {

    if (currentTrophyId === null) return;
    if (selectedRarity === null) return;

    const trophy = trophyData[currentTrophyId];

    if (!trophy) return;

    trophy.rarity = selectedRarity;

    saveAppData();

    renderTrophyList();

    closeChangeRarityModal();

    });

}

//　===日付変更

//　日付変更を開く
function openChangeCompleteDateModal() {

    if (currentTrophyId === null) return;

    const trophy = trophyData[currentTrophyId];

    if (!trophy) return;

    // 保存されている日付が
    // YYYY/M/D または YYYY-MM-DD のどちらでも対応
    if (trophy.completedDate) {

        const parts =
            trophy.completedDate.split(/[\/-]/);

        const year = parts[0];
        const month = parts[1];
        const day = parts[2];

        changeCompleteDateInput.value =
            `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    } else {

        changeCompleteDateInput.value = "";

    }

    changeCompleteDateModal.classList.add("show");

}


// 日付変更ボタン
if (changeCompleteDateButton) {

    changeCompleteDateButton.addEventListener(
        "click",
        () => {

            openChangeCompleteDateModal();

            trophyMenu.classList.remove("show");
            trophyOverlay.classList.remove("show");

            if (currentTrophySettingButton) {

                currentTrophySettingButton.classList.remove(
                    "open"
                );

            }

        }
    );

}


//　日付変更閉じる
function closeChangeCompleteDateModal() {

    changeCompleteDateModal.classList.remove("show");

}


//　キャンセルボタン
if (changeCompleteDateCancelButton) {

    changeCompleteDateCancelButton.addEventListener(
        "click",
        closeChangeCompleteDateModal
    );

}


//　日付変更を保存する
if (changeCompleteDateConfirmButton) {

    changeCompleteDateConfirmButton.addEventListener(
        "click",
        () => {

            if (currentTrophyId === null) return;

            const trophy =
                trophyData[currentTrophyId];

            if (!trophy) return;

            const selectedDate =
                changeCompleteDateInput.value;

            if (!selectedDate) return;

            // YYYY-MM-DD
            // ↓
            // YYYY/M/D
            const parts =
                selectedDate.split("-");

            const year = parts[0];
            const month = Number(parts[1]);
            const day = Number(parts[2]);

            trophy.completedDate =
                `${year}/${month}/${day}`;

            saveAppData();

            renderTrophyList();

            closeChangeCompleteDateModal();

            currentTrophyId = null;
            currentTrophySettingButton = null;

        }
    );

}
//　===== トロフィー削除
//　要素取得
let deleteTargetTrophyId = null;
let deleteTargetCategoryId = null;
// トロフィー削除確認を開く
if (deleteTrophyButton) {

    deleteTrophyButton.addEventListener("click", () => {

        if (currentTrophyId === null) return;

        // メニューを閉じても消えない変数へIDを保存
        deleteTargetTrophyId = String(currentTrophyId);

        if (deleteTrophyModal) {
            deleteTrophyModal.classList.add("show");
        }

        // 設定メニューだけ閉じる
        if (trophyMenu) {
            trophyMenu.classList.remove("show");
        }

        if (trophyOverlay) {
            trophyOverlay.classList.remove("show");
        }

        if (currentTrophySettingButton) {
            currentTrophySettingButton.classList.remove("open");
        }

    });

}

//　キャンセル
function closeDeleteTrophyModal() {

    if (deleteTrophyModal) {
        deleteTrophyModal.classList.remove("show");
    }

    deleteTargetTrophyId = null;

}

if (deleteTrophyCancelButton) {

    deleteTrophyCancelButton.addEventListener(
        "click",
        closeDeleteTrophyModal
    );

}

// トロフィー削除を確定
if (deleteTrophyConfirmButton) {

    deleteTrophyConfirmButton.addEventListener("click", () => {

        if (deleteTargetTrophyId === null) return;

        delete trophyData[deleteTargetTrophyId];

        renderTrophyList();

        saveAppData();

        if (deleteTrophyModal) {
            deleteTrophyModal.classList.remove("show");
        }

        deleteTargetTrophyId = null;
        currentTrophyId = null;
        currentTrophySettingButton = null;

    });

}


// トロフィー設定メニューを閉じる
function closeTrophyMenu() {

    if (trophyMenu) {
        trophyMenu.classList.remove("show");
    }

    if (trophyOverlay) {
        trophyOverlay.classList.remove("show");
    }

    if (currentTrophySettingButton) {
        currentTrophySettingButton.classList.remove("open");
    }

    currentTrophyId = null;
    currentTrophySettingButton = null;

}


// メニュー内の操作では閉じない
if (trophyMenu) {

    trophyMenu.addEventListener("click", (event) => {
        event.stopPropagation();
    });

}


// メニュー外を押したら閉じる
if (trophyOverlay) {

    trophyOverlay.addEventListener("click", () => {
        closeTrophyMenu();
    });

}

// ========================================
// トロフィーのクリア・解除
// ========================================

if (toggleCompleteButton) {
    toggleCompleteButton.addEventListener(
        "click",
        () => {
            if (
                currentTrophyId === null
            ) {
                return;
            }
            const trophy =
                trophyData[
                    currentTrophyId
                ];
            if (!trophy) {
                return;
            }
            // =================================
            // 日本全制覇カテゴリーの
            // 地方・日本トロフィーは
            // 手動クリア不可
            // =================================
            if (
                trophy.type === "region" ||
                trophy.type === "japan"
            ) {
                closeTrophyMenu();

                return;
            }
            // =================================
            // 通常トロフィー・県トロフィー
            // =================================
            trophy.completed =
                !trophy.completed;
            if (trophy.completed) {
                trophy.completedDate =
                    new Date()
                        .toLocaleDateString(
                            "ja-JP"
                        );
                            showTrophyNotification(
                            trophy
                        );
            } else {
                trophy.completedDate =
                    null;
            }
            saveAppData();
            // =================================
            // 地方・日本制覇を自動判定
            // =================================
            updateJapanConquestTrophies();
            // =================================
            // 再描画
            // =================================
            renderTrophyList();
            renderCategoryList();
            updateRarityPopupSummary();
            closeTrophyMenu();
        }
    );
}
//　===カテゴリー削除
// カテゴリー削除・1段階目を開く
if (deleteCategoryButton) {

    deleteCategoryButton.addEventListener("click", () => {

        if (currentCategoryId === null) return;

        // メニューを閉じても消えない変数へ保存
        deleteTargetCategoryId = Number(currentCategoryId);

        if (deleteCategoryModal) {
            deleteCategoryModal.classList.add("show");
        }

        // closeCategoryMenu()は使わず、表示だけ閉じる
        if (categoryMenu) {
            categoryMenu.classList.remove("show");
        }

        if (categoryOverlay) {
            categoryOverlay.classList.remove("show");
        }

        if (currentSettingButton) {
            currentSettingButton.classList.remove("open");
        }

    });

}
//　一段階目キャンセル
function closeDeleteCategoryModal() {

    if (deleteCategoryModal) {
        deleteCategoryModal.classList.remove("show");
    }

    deleteTargetCategoryId = null;

}

if (deleteCategoryCancelButton) {

    deleteCategoryCancelButton.addEventListener(
        "click",
        closeDeleteCategoryModal
    );

}
//　確認
if (deleteCategoryNextButton) {

    deleteCategoryNextButton.addEventListener("click", () => {

        if (deleteCategoryModal) {
            deleteCategoryModal.classList.remove("show");
        }

        if (deleteCategoryFinalModal) {
            deleteCategoryFinalModal.classList.add("show");
        }

    });

}
//　戻る
if (deleteCategoryFinalCancelButton) {

    deleteCategoryFinalCancelButton.addEventListener("click", () => {

        if (deleteCategoryFinalModal) {
            deleteCategoryFinalModal.classList.remove("show");
        }

        if (deleteCategoryModal) {
            deleteCategoryModal.classList.add("show");
        }

    });

}
// カテゴリーと所属トロフィーを削除
if (deleteCategoryFinalConfirmButton) {

    deleteCategoryFinalConfirmButton.addEventListener("click", () => {

        if (deleteTargetCategoryId === null) return;

        const targetCategoryId = Number(deleteTargetCategoryId);

        // 対象カテゴリーに所属するトロフィーをすべて削除
        Object.keys(trophyData).forEach((trophyId) => {

            const trophy = trophyData[trophyId];

            if (
                Number(trophy.categoryId) === targetCategoryId
            ) {
                delete trophyData[trophyId];
            }

        });

        // カテゴリー本体を削除
        delete categoryData[targetCategoryId];
        saveAppData();
        if (
    categoryPageId !== null &&
    Number(categoryPageId) === targetCategoryId
) {
    window.location.href = "index.html";
    return;
}

        renderCategoryList();
        renderTrophyList();

        if (deleteCategoryFinalModal) {
            deleteCategoryFinalModal.classList.remove("show");
        }

        deleteTargetCategoryId = null;
        currentCategoryId = null;
        currentSettingButton = null;

    });

}
//　===トロフィーリスト呼び出し

renderTrophyList();

function renderCategoryList() {

    const container =
        document.getElementById("category-list-container");

    if (!container) return;

    container.innerHTML = "";

    Object.values(categoryData)
    .sort((a, b) => {

        return (
            (a.order ?? a.id) -
            (b.order ?? b.id)
        );

    })
.forEach((category) => {

    // このカテゴリーに所属するトロフィー
    const categoryTrophies =
        Object.values(trophyData).filter((trophy) => {
            return Number(trophy.categoryId) ===
                Number(category.id);
        });

    // トロフィー総数
    const totalCount =
        categoryTrophies.length;

    // クリア済みトロフィー数
    const completedCount =
        categoryTrophies.filter((trophy) => {
            return trophy.completed;
        }).length;

    // クリア率
    const completePercent =
        totalCount === 0
            ? 0
            : Math.round(
                completedCount / totalCount * 100
            );

    const wrapper = document.createElement("div");

        wrapper.className = "category-wrapper";

        wrapper.dataset.categoryId = category.id;
        const categoryCard = document.createElement("button");

categoryCard.className = "category-card";

categoryCard.type = "button";

categoryCard.innerHTML = `
    <div class="category-image">
        <img
            class="category-photo"
            src="${category.image}"
            alt=""
        >
    </div>

    <div class="category-info">

        <h3 class="category-title">
            ${category.name}
        </h3>

<p class="category-progress">
    <span class="current">
        ${completedCount}
    </span>
    /
    <span class="total">
        ${totalCount}
    </span>
</p>

<div
    class="progress-bar"
    role="progressbar"
    aria-label="${category.name}のクリア率"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="${completePercent}"
>
<div
    class="progress-fill"
    data-progress="${completePercent}"
    style="width: 0%;"
></div>
</div>

    </div>
`;        
categoryCard.addEventListener("click", () => {

    window.location.href =
        `category.html?id=${category.id}`;

});

// 設定ボタン
if (category.isInitial !== true) {

    const settingButton =
        document.createElement("button");

    settingButton.className =
        "category-setting";

    settingButton.type =
        "button";

    settingButton.innerHTML = `
        <img
            class="setting-icon"
            src="image/icon/settings.webp"
            alt="設定"
        >
    `;


    settingButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            openCategoryMenu(
                settingButton,
                category.id
            );

        }
    );


    wrapper.append(
        categoryCard,
        settingButton
    );

} else {

    // 初期カテゴリーはカードだけ追加
    wrapper.append(
        categoryCard
    );

}

enableCategoryDrag(wrapper);

container.appendChild(wrapper);
const progressFill =
    wrapper.querySelector(".progress-fill");

if (progressFill) {

    const targetPercent =
        progressFill.dataset.progress;

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {
            progressFill.style.width =
                `${targetPercent}%`;
        });

    });

}
    });

}
renderTrophyList();
renderCategoryList();

closeTrophyMenu();
// ========================================
// 検索結果から来たとき
// 対象トロフィーへ1回だけ移動
// ========================================

function jumpToSearchedTrophy() {

    if (
        targetTrophyId === null ||
        hasJumpedToTargetTrophy
    ) {
        return;
    }


    const targetTrophy =
        document.querySelector(
            `[data-trophy-id="${targetTrophyId}"]`
        );


    if (!targetTrophy) {
        return;
    }


    const targetData =
        trophyData[targetTrophyId];


    // クリア済みなら展開
    if (
        targetData &&
        targetData.completed &&
        trophyList
    ) {

        trophyList.classList.add(
            "completed-stack-expanded"
        );

    }


    // 1回だけにする
    hasJumpedToTargetTrophy = true;


    // レイアウト確定後に移動
    setTimeout(() => {

        targetTrophy.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 300);

}


// 検索から来ている場合だけ実行
if (targetTrophyId !== null) {

    setTimeout(() => {

        jumpToSearchedTrophy();

    }, 300);

}
// 変更ボタンの関数
let editNameTargetId = null;

// ===カテゴリー作成確認ポップアップ
//　===要素取得
let categoryCreateImageData = null;
// ===カテゴリー新規作成
// 空欄時の自動命名
function createUniqueName(baseName, existingNames) {
    let number = 1;

    while (
        existingNames.includes(
            `${baseName}(${number})`
        )
    ) {
        number++;
    }

    return `${baseName}(${number})`;
}

function openCreateCategoryModal() {

    if (!modal) return;

    categoryCreateImageData = null;

    if (categoryCreateNameInput) {
        categoryCreateNameInput.value = "";
    }

    if (categoryCreateImageInput) {
        categoryCreateImageInput.value = "";
    }

    if (categoryCreatePreview) {
        categoryCreatePreview.src =
            "image/icon/default.webp";
    }

    modal.classList.add("show");

}


function closeCreateCategoryModal() {

    if (!modal) return;

    modal.classList.remove("show");

    categoryCreateImageData = null;

    if (categoryCreateNameInput) {
        categoryCreateNameInput.value = "";
    }

    if (categoryCreateImageInput) {
        categoryCreateImageInput.value = "";
    }

}


// 「カテゴリーを追加」
if (addButton) {

    addButton.addEventListener(
        "click",
        openCreateCategoryModal
    );

}


// キャンセル
if (cancelButton) {

    cancelButton.addEventListener(
        "click",
        closeCreateCategoryModal
    );

}


// 「画像を選択」
if (
    categoryCreateSelectImageButton &&
    categoryCreateImageInput
) {

    categoryCreateSelectImageButton.addEventListener(
        "click",
        () => {

            categoryCreateImageInput.click();

        }
    );

}
// 画像プレビューを押して画像を選択
if (
    categoryCreatePreview &&
    categoryCreateImageInput
) {

    categoryCreatePreview.addEventListener(
        "click",
        () => {
            categoryCreateImageInput.click();
        }
    );

}


// 選択した画像をプレビュー
if (
    categoryCreateImageInput &&
    categoryCreatePreview
) {

    categoryCreateImageInput.addEventListener(
        "change",
        (event) => {

            const file = event.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = () => {

                categoryCreateImageData =
                    reader.result;

                categoryCreatePreview.src =
                    categoryCreateImageData;

            };

            reader.readAsDataURL(file);

        }
    );

}


// カテゴリーを作成
if (createButton) {
    createButton.addEventListener(
        "click",
        () => {
            const enteredName =
                categoryCreateNameInput
                    ? categoryCreateNameInput.value.trim()
                    : "";

            const existingCategoryNames =
                Object.values(categoryData).map(
                    (category) => category.name.trim()
                );

            const categoryName =
                enteredName ||
                createUniqueName(
                    "新規カテゴリー",
                    existingCategoryNames
                );

            const newId =
                Math.max(
                    0,
                    ...Object.keys(categoryData).map(Number)
                ) + 1;

            const newOrder =
                Math.max(
                    -1,
                    ...Object.values(categoryData).map(
                        (category) =>
                            category.order ?? category.id
                    )
                ) + 1;

            categoryData[newId] = {
                id: newId,
                name: categoryName,
                image:
                    categoryCreateImageData ??
                    "image/icon/default.webp",
                current: 0,
                total: 0,
                order: newOrder
            };

            saveAppData();

            renderCategoryList();
            closeCreateCategoryModal();
        }
    );
}

//　===トロフィー新規作成
function openCreateTrophyModal() {

    if (!createTrophyModal) return;

    createTrophyRarity = "bronze";

    renderCreateTrophyRarityList();

    createTrophyModal.classList.add("show");

}


function closeCreateTrophyModal() {

    if (!createTrophyModal) return;

    createTrophyModal.classList.remove("show");

}
//　開く
if (trophyAddButton) {

    trophyAddButton.addEventListener("click", () => {

        openCreateTrophyModal();

    });

}

//　キャンセル
if (createTrophyCancelButton) {

    createTrophyCancelButton.addEventListener(
        "click",
        closeCreateTrophyModal
    );

}

//　要素取得
let createTrophyRarity = "bronze";
//　一覧作成
function renderCreateTrophyRarityList() {

    if (!createTrophyRarityList) return;

    createTrophyRarityList.innerHTML = "";

    const rarityNames = {
        rainbow: "レインボー",
        gold: "ゴールド",
        silver: "シルバー",
        bronze: "ブロンズ"
    };

    Object.keys(rarityData).forEach(
        (rarity) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "change-rarity-item";

            if (
                rarity === createTrophyRarity
            ) {
                button.classList.add(
                    "selected"
                );
            }

            button.setAttribute(
                "aria-label",
                rarityNames[rarity]
            );

            button.title =
                rarityNames[rarity];

            button.innerHTML = `
                <img
                    src="${
                        rarityData[rarity].image
                    }"
                    alt=""
                >
            `;

            button.addEventListener(
                "click",
                () => {

                    createTrophyRarity =
                        rarity;

                    // 選択状態を再描画
                    renderCreateTrophyRarityList();

                }
            );

            createTrophyRarityList
                .appendChild(button);

        }
    );

}
//　要素取得
let createTrophyImageData = null;

//　画像選択ボタンを押したとき
if (
    createTrophySelectImageButton &&
    createTrophyImageInput
) {

    createTrophySelectImageButton.addEventListener(
        "click",
        () => {

            createTrophyImageInput.click();

        }
    );

}

//　プレビュー更新
if (
    createTrophyImageInput &&
    createTrophyPreview
) {

    createTrophyImageInput.addEventListener(
        "change",
        (event) => {

            const file = event.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = () => {

                createTrophyImageData = reader.result;

                createTrophyPreview.src =
                    createTrophyImageData;

            };

            reader.readAsDataURL(file);

        }
    );

}

//　初期化
function openCreateTrophyModal() {

    if (!createTrophyModal) return;

    createTrophyRarity = "bronze";
    createTrophyImageData = null;

    if (createTrophyImageInput) {
        createTrophyImageInput.value = "";
    }

    if (createTrophyPreview) {
        createTrophyPreview.src =
            "image/icon/default.webp";
    }

    renderCreateTrophyRarityList();

    createTrophyModal.classList.add("show");

    if (createTrophyNameInput) {
    createTrophyNameInput.value = "";
}
if (createTrophySubtitleInput) {
    createTrophySubtitleInput.value = "";
}

}

// トロフィー作成ボタン
if (createTrophyConfirmButton) {
    createTrophyConfirmButton.addEventListener(
        "click",
        () => {
            const enteredName =
                createTrophyNameInput
                    ? createTrophyNameInput.value.trim()
                    : "";

            const existingTrophyNames =
                Object.values(trophyData).map(
                    (trophy) => trophy.name.trim()
                );

            const trophyName =
                enteredName ||
                createUniqueName(
                    "新規トロフィー",
                    existingTrophyNames
                );

            const trophySubtitle =
                createTrophySubtitleInput
                    ? createTrophySubtitleInput.value.trim()
                    : "";

            const newId =
                Math.max(
                    0,
                    ...Object.keys(trophyData).map(Number)
                ) + 1;

            const sameCategoryTrophies =
                Object.values(trophyData).filter(
                    (trophy) => {
                        return (
                            Number(trophy.categoryId) ===
                            Number(categoryPageId)
                        );
                    }
                );

            const newOrder =
                Math.max(
                    -1,
                    ...sameCategoryTrophies.map(
                        (trophy) =>
                            trophy.order ?? trophy.id
                    )
                ) + 1;

            trophyData[newId] = {
                id: newId,
                name: trophyName,
                subtitle: trophySubtitle,
                image:
                    createTrophyImageData ??
                    "image/icon/default.webp",
                categoryId: categoryPageId,
                rarity: createTrophyRarity,
                completed: false,
                completedDate: null,
                order: newOrder
            };

            saveAppData();

            renderTrophyList();
            renderCategoryList();
            closeCreateTrophyModal();
        }
    );
}
//　検索処理
const searchInput =
    document.getElementById("search-input");

const searchForm =
    document.getElementById("search-form");

const searchGuide =
    document.getElementById("search-guide");

const searchEmpty =
    document.getElementById("search-empty");

const searchCategorySection =
    document.getElementById(
        "search-category-section"
    );

const searchTrophySection =
    document.getElementById(
        "search-trophy-section"
    );

const searchCategoryResults =
    document.getElementById(
        "search-category-results"
    );

const searchTrophyResults =
    document.getElementById(
        "search-trophy-results"
    );

    function normalizeSearchText(text) {

    return String(text ?? "")
        .normalize("NFKC")
        .toLocaleLowerCase("ja-JP")
        .trim();

}

function renderSearchResults() {

    if (
        !searchInput ||
        !searchCategoryResults ||
        !searchTrophyResults
    ) {
        return;
    }

    const keyword =
        normalizeSearchText(searchInput.value);

    searchCategoryResults.innerHTML = "";
    searchTrophyResults.innerHTML = "";

    // 未入力時
    if (keyword === "") {

    if (searchGuide) {
        searchGuide.hidden = false;
    }

    if (searchEmpty) {
        searchEmpty.hidden = true;
    }

    if (searchCategorySection) {
        searchCategorySection.hidden = true;
    }

    if (searchTrophySection) {
        searchTrophySection.hidden = true;
    }

    return;

}
const matchedCategories =
    Object.values(categoryData).filter(
        (category) => {
            return normalizeSearchText(
                category.name
            ).includes(keyword);
        }
    );

const matchedTrophies =
    Object.values(trophyData).filter(
        (trophy) => {

            const name =
                normalizeSearchText(
                    trophy.name
                );

            const subtitle =
                normalizeSearchText(
                    trophy.subtitle ?? ""
                );

            return (
                name.includes(keyword) ||
                subtitle.includes(keyword)
            );

        }
    );

    if (searchGuide) {
        searchGuide.hidden = true;
    }

    if (searchEmpty) {
        searchEmpty.hidden =
            matchedCategories.length > 0 ||
            matchedTrophies.length > 0;
    }

    renderSearchCategories(
        matchedCategories
    );

    renderSearchTrophies(
        matchedTrophies
    );

}

function renderSearchCategories(categories) {

    if (
        !searchCategoryResults ||
        !searchCategorySection
    ) {
        return;
    }

    searchCategorySection.hidden =
        categories.length === 0;

    categories.forEach((category) => {

        const categoryTrophies =
            Object.values(trophyData).filter(
                (trophy) => {
                    return Number(trophy.categoryId) ===
                        Number(category.id);
                }
            );

        const totalCount =
            categoryTrophies.length;

        const completedCount =
            categoryTrophies.filter(
                (trophy) => trophy.completed
            ).length;

        const completePercent =
            totalCount === 0
                ? 0
                : Math.round(
                    completedCount /
                    totalCount *
                    100
                );

        const card =
            document.createElement("button");

        card.type = "button";

        // ホームと同じクラスを使用
        card.className = "category-card";

        card.innerHTML = `
            <div class="category-image">
                <img
                    class="category-photo"
                    src="${category.image}"
                    alt=""
                >
            </div>

            <div class="category-info">

                <h3 class="category-title">
                    ${category.name}
                </h3>

                <p class="category-progress">
                    <span class="current">
                        ${completedCount}
                    </span>
                    /
                    <span class="total">
                        ${totalCount}
                    </span>
                </p>

                <div
                    class="progress-bar"
                    role="progressbar"
                    aria-label="${category.name}のクリア率"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${completePercent}"
                >
                    <div
                        class="progress-fill"
                        style="width: ${completePercent}%;"
                    ></div>
                </div>

            </div>
        `;

card.addEventListener("click", () => {

    window.location.href =
        `category.html?id=${category.id}`;

});

        searchCategoryResults.appendChild(card);

    });

}

function renderSearchTrophies(trophies) {

    if (
        !searchTrophyResults ||
        !searchTrophySection
    ) {
        return;
    }

    searchTrophySection.hidden =
        trophies.length === 0;

    trophies.forEach((trophy) => {

        const category =
            categoryData[trophy.categoryId];

        const rarity =
            rarityData[trophy.rarity];

        const card =
            document.createElement("button");

        card.type = "button";

        // カテゴリーカードと同じ大きさ
        card.className =
            "category-card search-trophy-card";

        card.innerHTML = `
            <div class="category-image">
                <img
                    class="category-photo"
                    src="${trophy.image}"
                    alt=""
                >
            </div>

            <div class="category-info">

                <h3 class="category-title">
                    ${
                        rarity
                            ? `
                                <img
                                    class="search-result-rarity"
                                    src="${rarity.image}"
                                    alt=""
                                >
                            `
                            : ""
                    }

                    <span>${trophy.name}</span>
                </h3>

                <p class="search-result-detail">
                    ${trophy.subtitle || ""}
                </p>

                <p class="search-trophy-category">
                    カテゴリー：
                    ${
                        category
                            ? category.name
                            : "カテゴリーなし"
                    }
                </p>

            </div>
        `;

card.addEventListener("click", () => {

    if (category) {

        window.location.href =
            `category.html?id=${category.id}&trophy=${trophy.id}`;

    }

});

        searchTrophyResults.appendChild(card);

    });

}
if (searchInput) {

    // 前回の検索文字を復元
    const savedSearchKeyword =
        sessionStorage.getItem(
            "trophySearchKeyword"
        );

    if (savedSearchKeyword !== null) {
        searchInput.value =
            savedSearchKeyword;
    }

    // 入力するたびに保存して検索
    searchInput.addEventListener(
        "input",
        () => {
            sessionStorage.setItem(
                "trophySearchKeyword",
                searchInput.value
            );

            renderSearchResults();
        }
    );

    // 復元した文字で検索結果を再表示
    renderSearchResults();

    searchInput.focus();

}

if (searchForm) {

    searchForm.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();
            renderSearchResults();
        }
    );

}

// トロフィー獲得通知
const trophyNotification =
    document.getElementById(
        "trophy-notification"
    );

const trophyNotificationImage =
    document.getElementById(
        "trophy-notification-image"
    );

const trophyNotificationTitle =
    document.getElementById(
        "trophy-notification-title"
    );

const trophyNotificationSubtitle =
    document.getElementById(
        "trophy-notification-subtitle"
    );

let trophyNotificationTimer = null;
// 通知待ち
const trophyNotificationQueue = [];

let isShowingTrophyNotification =
    false;


// 効果音
const trophyUnlockSound =
    new Audio(
        "clear.mp3"
    );

trophyUnlockSound.volume = 0.6;

//　通知を表示
function showTrophyNotification(trophy) {

    if (!trophy) return;


    trophyNotificationQueue.push(
        trophy
    );


    if (
        !isShowingTrophyNotification
    ) {
        showNextTrophyNotification();
    }

}


function showNextTrophyNotification() {

    if (
        trophyNotificationQueue.length === 0
    ) {

        isShowingTrophyNotification =
            false;

        return;
    }


    isShowingTrophyNotification =
        true;


    const trophy =
        trophyNotificationQueue.shift();


    // ------------------------------
    // 内容を反映
    // ------------------------------

    if (trophyNotificationImage) {

        trophyNotificationImage.src =
        trophy.image;

    }


    if (trophyNotificationTitle) {

        trophyNotificationTitle.textContent =
            trophy.name;

    }


    if (trophyNotificationSubtitle) {

        trophyNotificationSubtitle.textContent =
            trophy.subtitle ?? "";

    }


    // ------------------------------
    // 効果音
    // ------------------------------

    trophyUnlockSound.currentTime = 0;

    trophyUnlockSound
        .play()
        .catch(() => {
            // ブラウザが再生を拒否した場合は
            // 何もしない
        });


    // ------------------------------
    // 表示
    // ------------------------------

    trophyNotification
        ?.classList.add("show");


    // ------------------------------
    // 2秒後に閉じる
    // ------------------------------

setTimeout(() => {

    closeTrophyNotification();

}, 2000);

}

// トロフィー通知をスワイプで閉じる
let trophyNotificationTouchStartX = 0;
let trophyNotificationTouchStartY = 0;

let trophyNotificationTouchEndX = 0;
let trophyNotificationTouchEndY = 0;
// タッチ開始
trophyNotification?.addEventListener(
    "touchstart",
    (event) => {

        trophyNotificationTouchStartX =
            event.changedTouches[0].clientX;

        trophyNotificationTouchEndX =
            trophyNotificationTouchStartX;

    },
    { passive: true }
);


// スワイプ中
trophyNotification?.addEventListener(
    "touchmove",
    (event) => {

        trophyNotificationTouchEndX =
            event.changedTouches[0].clientX;

    },
    { passive: true }
);


// タッチ終了
trophyNotification?.addEventListener(
    "touchend",
    () => {

        const differenceX =
            trophyNotificationTouchEndX -
            trophyNotificationTouchStartX;


        // 50px以上横に動かしたら閉じる
        if (
            Math.abs(differenceX) < 50
        ) {
            return;
        }


        closeTrophyNotification();

    }
);

function closeTrophyNotification() {

    if (!trophyNotification) {
        return;
    }


    // 自動終了タイマーを止める
    if (trophyNotificationTimer) {

        clearTimeout(
            trophyNotificationTimer
        );

        trophyNotificationTimer = null;

    }


    trophyNotification.classList.remove(
        "show"
    );


    setTimeout(() => {

        showNextTrophyNotification();

    }, 450);

}

// トロフィー通知をスワイプで閉じる
// タッチ開始
trophyNotification?.addEventListener(
    "touchstart",
    (event) => {

        const touch =
            event.changedTouches[0];

        trophyNotificationTouchStartX =
            touch.clientX;

        trophyNotificationTouchStartY =
            touch.clientY;

        trophyNotificationTouchEndX =
            touch.clientX;

        trophyNotificationTouchEndY =
            touch.clientY;

    },
    {
        passive: true
    }
);


// タッチ中
trophyNotification?.addEventListener(
    "touchmove",
    (event) => {

        const touch =
            event.changedTouches[0];

        trophyNotificationTouchEndX =
            touch.clientX;

        trophyNotificationTouchEndY =
            touch.clientY;

    },
    {
        passive: true
    }
);


// タッチ終了
trophyNotification?.addEventListener(
    "touchend",
    () => {

        const differenceY =
            trophyNotificationTouchEndY -
            trophyNotificationTouchStartY;


        // 上方向に50px以上スワイプしたら閉じる
        if (differenceY > -50) {
            return;
        }


        trophyNotification
            ?.classList.remove("show");

    }
);
// ===== ログアウト =====

const logoutButton = document.getElementById("logout-button");
const logoutModal = document.getElementById("logout-modal");
const logoutYes = document.getElementById("logout-yes");
const logoutNo = document.getElementById("logout-no");

if (logoutButton && logoutModal) {

    // ログアウトを押す
    logoutButton.addEventListener("click", () => {
        logoutModal.classList.add("show");
    });

    // いいえ
    logoutNo.addEventListener("click", () => {
        logoutModal.classList.remove("show");
    });

    // はい
logoutYes.addEventListener("click", () => {

    // ログイン状態を削除
    localStorage.removeItem(
        "isLoggedIn"
    );

    // ログイン画面へ
    window.location.href =
        "login.html";

});
}

// 初回チュートリアル

const tutorialModal =
    document.getElementById("tutorial-modal");

const tutorialOkButton =
    document.getElementById("tutorial-ok-button");

if (
    tutorialModal &&
    tutorialOkButton
) {

    // まだチュートリアルを見ていない場合だけ表示
    const tutorialCompleted =
        localStorage.getItem(
            "tutorialCompleted"
        );

    if (tutorialCompleted !== "true") {

        tutorialModal.classList.add("show");

    }

    // OKを押したら閉じて、表示済みにする
    tutorialOkButton.addEventListener(
        "click",
        () => {

            tutorialModal.classList.remove(
                "show"
            );

            localStorage.setItem(
                "tutorialCompleted",
                "true"
            );

        }
    );

}