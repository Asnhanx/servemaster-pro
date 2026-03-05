import type { Translations } from './zh-CN';
import { zhCN } from './zh-CN';

// Traditional Chinese — override simplified Chinese where different
const overrides: Partial<Record<string, any>> = {
    header: { features: '核心功能', appControl: 'App操控', specs: '技術規格', support: '客戶支援', login: '登入', buyNow: '立即購買', signOut: '登出', backToHome: '返回首頁', language: '語言' },
    footer: { ...zhCN.footer, app: '智慧 App', techSpecs: '技術規格', support: '支援', helpCenter: '幫助中心', manual: '使用手冊', warranty: '保固政策', contactUs: '聯絡我們', followUs: '關注我們', privacy: '隱私政策', terms: '服務條款', slogan: '重新定義網球訓練。\n智慧、精準、便攜。' },
};

function deepMerge(base: any, over: any): any {
    const result = { ...base };
    for (const key in over) {
        if (over[key] && typeof over[key] === 'object' && !Array.isArray(over[key])) {
            result[key] = deepMerge(base[key] || {}, over[key]);
        } else {
            result[key] = over[key];
        }
    }
    return result;
}

export const zhTW: Translations = deepMerge(zhCN, {
    header: overrides.header,
    footer: overrides.footer,
    home: {
        badge: '全新一代智慧發球機',
        heroTitle1: '精準餵球，',
        heroTitle2: '重塑你的擊球',
        heroDesc: 'ServeMaster Pro 結合航空級電機與 AI 演算法，提供毫米級落點控制。便攜設計，隨時隨地開啟專業訓練。',
        watchDemo: '觀看演示',
        featuresSubtitle: '每一處細節都為極致的訓練體驗而設計。',
        feature1Title: '140km/h 極速發球',
        feature1Desc: '搭載雙無刷電機，提供職業級球速與強勁上旋/下旋，真實模擬對手擊球。',
        feature2Title: 'AI 智慧落點控制',
        feature2Desc: '內建高精度感測器，支援 6 點隨機落點及自訂訓練路線，指哪打哪。',
        feature3Desc: '大容量鋰電池，支援快充技術。告別電源線束縛，隨時隨地暢快揮拍。',
        appTitle: '你的私人教練，\n就在口袋裡。',
        appDesc: '透過 ServeMaster App，你可以完全掌控發球機。一鍵切換訓練模式，即時分析擊球數據，甚至下載職業選手的經典訓練計畫。',
        appFeature1Title: '自訂訓練序列', appFeature1Desc: '自由組合球速、旋轉和落點，建立專屬訓練計畫。',
        appFeature2Title: '數據視覺化', appFeature2Desc: '記錄每次訓練的擊球數、消耗卡路里及進步曲線。',
        appFeature3Title: 'Apple Watch 聯動', appFeature3Desc: '抬腕即可控制發球機啟停，無需頻繁查看手機。',
        appLearnMore: '瞭解更多 App 功能',
        testimonialsTitle: '來自專業玩家的認可',
        testimonial1Name: '張偉', testimonial1Role: 'ITF 認證教練',
        testimonial1Text: '「ServeMaster Pro 的旋轉和球速非常接近真實比賽。它的便攜性讓我的教學工作輕鬆了許多，學生們也更喜歡這種高效的訓練方式。」',
        testimonial2Name: '李娜 (業餘)', testimonial2Role: '網球發燒友，NTRP 4.0',
        testimonial2Text: '「App 控制簡直是神作！我可以自己設定正反手交替的路線，一個人也能練出大汗淋漓的感覺。電池續航也很給力。」',
        ctaTitle: '準備好提升你的比賽了嗎？', ctaDesc: '現在訂購，享受 30 天無理由退換及 2 年官方保固。',
    },
    product: {
        badge: '技術規格', heroTitle1: '為性能而生，', heroTitle2: '為勝利而造。',
        heroDesc: '每一個參數，都為了讓你的訓練更真實、更高效。',
        explodedTitle: '精密機械，\n驅動澎湃動力。',
        comp1Title: '航空級無刷電機', comp1Desc: '雙 BLDC 電機協同驅動，精確控制球速和旋轉。最大轉速可達 12,000 RPM，輸出球速可達 140km/h。',
        comp2Title: '微電腦控制系統', comp2Desc: '搭載 32 位元 ARM Cortex 主控晶片，執行自研 AI 落點演算法。支援藍牙 5.0 低功耗，即時與 App 互動。',
        comp3Title: '高容量鋰電池組', comp3Desc: '36V 10Ah 鋰離子電池組，支援 2A 快充。提供長達 6 小時的不間斷發球（1500+ 球）。',
        specsTitle: '詳細參數一覽',
        specBallSpeed: '球速範圍', specSpin: '旋轉類型', specSpinVal: '上旋 / 下旋 / 側旋 / 平擊',
        specSpinSpeed: '旋轉速度', specFreq: '發球頻率', specFreqVal: '2 - 10 秒/球',
        specCapacity: '球容量', specCapacityVal: '150 顆標準網球',
        specBattery: '電池', specBatteryVal: '36V 10Ah 鋰電池, 6h 續航',
        specConnect: '連線', specWeight: '重量', specWeightVal: '21.5 kg (含電池)',
        ctaTitle: '準備好體驗專業級訓練了嗎？', ctaDesc: '加入全球數千名使用 ServeMaster Pro 的網球愛好者和教練。',
        ctaSecondary: '聯繫銷售',
    },
    app: {
        heroTitle: '指尖上的\n私人教練',
        heroDesc: '告別繁瑣的按鍵設定。透過藍牙 5.0 無縫連接，在手機上直覺地定製你的每一次擊球。',
        featuresTitle: '全方位掌控訓練', featuresSubtitle: '不僅僅是遙控器，更是你的數據分析中心和訓練計畫庫。',
        feat1Title: '即時遙控', feat1Desc: '在手機上直覺調節球速(30-140km/h)、旋轉類型(上旋/下旋/側旋)和發球頻率。',
        feat2Title: '深度數據洞察', feat2Desc: '自動記錄每次訓練的擊球數據，生成視覺化報告，追蹤你的進步曲線。',
        feat3Title: '訓練計畫庫', feat3Desc: '內建數十種預設訓練計畫，涵蓋正手、反手、截擊和綜合體能訓練。',
        feat4Title: '韌體線上升級', feat4Desc: '透過 App 直接升級發球機韌體，取得最新功能和效能最佳化。',
        feat5Title: '多人協作', feat5Desc: '支援多台裝置同時連線，教練可以在自己的手機上管理多台發球機。',
        feat6Title: '社群分享', feat6Desc: '將你建立的自訂訓練方案分享到社群，或下載其他使用者的熱門方案。',
        downloadTitle: '下載 ServeMaster App', downloadDesc: '掃描下方 QR Code 或在應用商店搜尋 "ServeMaster"。',
        scanQr: '掃碼下載', ctaTitle: '立即下載體驗', ctaDesc: '你的專屬網球訓練助手，就在指尖。',
        ctaIos: '下載 iOS 版', ctaAndroid: '下載 Android 版',
    },
    support: {
        badge: '幫助與支援', heroTitle: '有疑問？\n我們隨時為你解答。', heroDesc: '搜尋我們的知識庫，或直接聯繫技術支援團隊。',
        searchPlaceholder: '搜尋常見問題、使用手冊或故障排除...',
        manualDesc: '從開箱到進階', troubleshootingDesc: '常見問題解決方案', warrantyTitle: '保固與維修', warrantyDesc: '保固政策查詢',
        viewAllFaq: '查看所有常見問題',
        contactTitle: '沒有找到您需要的答案？', contactDesc: '我們的技術支援團隊隨時準備為您提供幫助。',
        ticketTitle: '提交支援工單', ticketDesc: '我們將在 24 小時內回覆。',
        ticketSubmitButton: '提交工單', ticketSubmitting: '提交中...',
        ticketError: '提交失敗，請稍後重試。', networkError: '網路錯誤，請檢查網路連線後重試。',
        liveChatTitle: '線上客服', liveChatButton: '開始對話',
        emailTitle: '傳送郵件',
        contactSubmit: '提交工單', contactSubmitting: '提交中...',
    },
    login: { title: '登入您的帳號', noAccount: '還沒有帳號？', register: '立即註冊', tabEmail: '電子郵件登入', tabPhone: '手機號登入', loginButton: '登入', loggingIn: '登入中...', socialTitle: '或透過以下方式登入' },
    register: { title: '建立新帳號', hasAccount: '已有帳號？', login: '立即登入', tabEmail: '電子郵件註冊', tabPhone: '手機號註冊', registerButton: '註冊', registering: '註冊中...', socialTitle: '或透過以下方式註冊' },
    aiChat: { title: 'ServeMaster AI 助手', statusOnline: '線上', disclaimer: 'AI 回覆僅供參考，如需更專業的幫助，請提交工單聯繫人工客服。', goToLogin: '去登錄' },
    checkout: { titleCart: '確認訂單', titlePayment: '選擇付款方式', titleSuccess: '付款成功', successTitle: '付款成功', loginRequired: '請先登入後再進行購買', goToLogin: '去登入', cancel: '取消', proceedToCheckout: '去結算', payAmount: '付款金額', processing: '處理中...', paySecurely: '安全付款 {amount}', orderFailed: '訂單建立失敗，請稍後重試。', done: '完成' },
    legal: { closeButton: '我已瞭解並關閉' },
    auth: {
        invalidCredentials: '信箱或密碼錯誤，請重試',
        loginFailed: '登入失敗，請稍後重試',
        phoneRequired: '請輸入手機號碼',
        otpSendFailed: '驗證碼發送失敗，請重試',
        otpSendError: '驗證碼發送失敗，請稍後重試',
        otpRequired: '請輸入驗證碼',
        otpInvalid: '驗證碼錯誤，請重試',
        passwordLength: '密碼長度至少為 6 位',
        passwordMismatch: '兩次輸入的密碼不一致',
        termsRequired: '請閱讀並同意服務條款和隱私政策',
        emailTaken: '該信箱已被註冊，請直接登入',
        registerFailed: '註冊失敗，請稍後重試',
        usernameRequired: '請輸入用戶名',
        welcomeBack: '歡迎回到',
        community: '社群',
        welcomeDesc: '登入以管理您的設備、查看訓練數據分析、下載最新職業訓練計畫，並與全球玩家分享您的進步。',
        cloudSync: '雲端數據同步',
        cloudSyncDesc: '您的所有訓練記錄安全存儲在雲端。',
        otaUpdate: '韌體線上升級',
        otaUpdateDesc: '獲取最新的發球演算法與功能最佳化。',
    },
}) as Translations;
