export const languages = {
  ja: '日本語',
  yue: '繁體中文',
};

export const defaultLang = 'ja';

// 翻訳辞書
export const ui = {
  ja: {
    'index.description': '柚月のウェブサイトです。本人のビジュアルイメージや、四季の写真、活動情報などを発信しています。',
    'index.hero': 'おはよう、最高の私',
    'index.certification.beauty': 'ビューティー・コーディネーター',
    'index.profile.specialty': '美容、メイク、ヘアメイク',
    'member.description': '柚月のウェブサイトの会員ページです。連絡先の登録ができます。',
  },
  yue: {
    'index.description': '這是柚月的官方網站。這裡分享她的個人視覺形象，四季寫真以及最新活動動態等資訊。',
    'index.hero': '早晨，最完美嘅我',
    'index.certification.beauty': '美容協調師（Beauty Coordinator）',
    'index.profile.specialty': '美容、化妝、髮型設計',
    'member.description': '這是柚月網站的會員專區。您可以在此登記聯絡資料。',
  },
} as const;

// 型定義ヘルパー
export type UiKey = keyof typeof ui.ja;
