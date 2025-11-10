// Gemini API設定
const GEMINI_API_KEY = 'AIzaSyDPTbRIHmhumwKNT27nDQoC1d1TzWGa77k';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

// 知識ベース - パソコン太郎の情報
const knowledgeBase = {
    // 会社概要
    '会社概要': {
        keywords: ['会社', '概要', '事業内容', '何をしている', '業務', 'ビジネス'],
        answer: `🏢 <strong>パソコン太郎について</strong><br><br>
        パソコン太郎は以下の事業を展開しています:<br><br>
        <strong>主な事業:</strong><br>
        ・📢 講演会・イベント企画運営<br>
        ・📚 児童向け絵本の制作・販売<br>
        ・🎓 IT教育・職業教育コンテンツ提供<br>
        ・🤝 地域・行政との連携事業<br>
        ・❤️ 社会貢献活動（絵本売上の寄贈）<br><br>
        <strong>拠点:</strong> 栃木県を中心に活動<br>
        公式サイト: <a href="https://pasotaro.com" target="_blank">https://pasotaro.com</a>`
    },
    
    // 講演会・イベント
    '講演会': {
        keywords: ['講演会', 'イベント', '堀江', '茂木', 'セミナー', '登壇'],
        answer: `🎤 <strong>講演会・イベントについて</strong><br><br>
        <strong>過去の主な開催実績:</strong><br>
        ・2020年11月: 堀江貴文×パソコン太郎 講演会（鹿沼市民文化センター）<br>
        ・2021年12月: 茂木健一郎×パソコン太郎 講演会（古峯神社）<br>
        ・2022年3月: 堀江貴文特別講演会（栃木県総合文化センター）<br><br>
        <strong>イベント企画の流れ:</strong><br>
        1. 企画立案・講師選定<br>
        2. 会場手配・準備<br>
        3. 集客・PR活動（SNS活用）<br>
        4. 当日運営・記録<br>
        5. 振り返り・報告<br><br>
        著名人の方々との講演会企画が当社の強みです！`
    },
    
    // 絵本事業
    '絵本': {
        keywords: ['絵本', '夢絵本', '職育', '出版', '本', '書籍', 'amazon'],
        answer: `📖 <strong>絵本事業について</strong><br><br>
        <strong>絵本シリーズ:</strong><br>
        ・📘 夢絵本シリーズ: ITの楽しさと危険性を伝える<br>
        ・👔 職育シリーズ: 職業教育をテーマにした絵本<br>
        ・🌍 番外編シリーズ: 環境省・鹿沼市と連携した作品<br><br>
        <strong>販売について:</strong><br>
        ・Amazonで販売中<br>
        ・購入利益は寄贈資金として活用<br>
        ・子どもたちへの教育と社会貢献の両立<br><br>
        <strong>対象:</strong> 児童・保護者・教育機関<br>
        絵本を通じて未来を担う子どもたちを応援！`
    },
    
    // IT教育・職業教育
    '教育': {
        keywords: ['教育', 'IT教育', '職業教育', '職育', '学習', 'リテラシー'],
        answer: `🎓 <strong>教育事業について</strong><br><br>
        <strong>IT教育:</strong><br>
        ・ITの楽しさを伝える活動<br>
        ・デジタル時代のリスク啓発<br>
        ・子どもたちの情報リテラシー向上<br><br>
        <strong>職業教育（職育）:</strong><br>
        ・様々な職業を絵本で紹介<br>
        ・キャリア教育のサポート<br>
        ・夢を持つことの大切さを伝える<br><br>
        <strong>特徴:</strong><br>
        楽しく学べるコンテンツ作りを重視し、<br>
        子どもたちの未来を応援します！`
    },
    
    // 地域連携・社会貢献
    '地域連携': {
        keywords: ['地域', '連携', '栃木', '鹿沼', '環境省', '行政', '自治体', '協働'],
        answer: `🤝 <strong>地域連携・社会貢献</strong><br><br>
        <strong>連携実績:</strong><br>
        ・環境省との協働プロジェクト<br>
        ・栃木県鹿沼市との連携事業<br>
        ・クールチョイス事業への参画<br><br>
        <strong>社会貢献活動:</strong><br>
        ・絵本販売利益の寄贈<br>
        ・地域イベントの企画・運営<br>
        ・教育機関へのサポート<br><br>
        <strong>拠点:</strong> 栃木県を中心に展開<br>
        地域に根差した活動を大切にしています！`
    },
    
    // イベント運営業務
    'イベント運営': {
        keywords: ['運営', '当日', 'オペレーション', '準備', '設営', '受付'],
        answer: `🎪 <strong>イベント運営業務について</strong><br><br>
        <strong>主な業務内容:</strong><br>
        ・会場設営・受付対応<br>
        ・音響・映像機材の準備<br>
        ・講師アテンド・進行サポート<br>
        ・来場者対応・誘導<br>
        ・SNS発信（当日レポート）<br>
        ・物販対応（絵本販売など）<br><br>
        <strong>チームワーク:</strong><br>
        イベント成功のため、全員で協力します！<br>
        経験を積みながらスキルアップできます。`
    },
    
    // 絵本販売・物流
    '絵本販売': {
        keywords: ['販売', '購入', '買う', '価格', '在庫', '配送', '物流'],
        answer: `🛒 <strong>絵本販売について</strong><br><br>
        <strong>販売チャネル:</strong><br>
        ・Amazon での販売（メインチャネル）<br>
        ・イベント会場での直接販売<br><br>
        <strong>購入方法:</strong><br>
        公式サイトから各絵本のAmazonページへ<br>
        アクセスできます。<br><br>
        <strong>重要:</strong><br>
        ご購入いただいた絵本の利益は、<br>
        寄贈資金として活用されます。<br><br>
        詳細は経理担当者にお問い合わせください。`
    },
    
    // SNS・広報
    'SNS': {
        keywords: ['sns', '広報', 'pr', '発信', 'ソーシャル', 'ツイッター', 'フェイスブック'],
        answer: `📱 <strong>SNS・広報活動について</strong><br><br>
        <strong>主な発信内容:</strong><br>
        ・イベント情報の告知<br>
        ・絵本の新刊情報<br>
        ・講演会レポート<br>
        ・社会貢献活動の報告<br><br>
        <strong>SNS運用のポイント:</strong><br>
        ・タイムリーな情報発信<br>
        ・写真・動画を活用した魅力的な投稿<br>
        ・フォロワーとのコミュニケーション<br><br>
        公式サイトにSNSリンク一覧があります。<br>
        投稿内容は必ず責任者の承認を得てください。`
    },
    
    // 業務の流れ
    '業務の流れ': {
        keywords: ['業務', '仕事', '流れ', 'タスク', '作業', '手順'],
        answer: `📋 <strong>主な業務の流れ</strong><br><br>
        <strong>イベント企画:</strong><br>
        企画→講師交渉→会場手配→集客→運営→報告<br><br>
        <strong>絵本制作:</strong><br>
        企画→執筆・イラスト→編集→印刷→販売→寄贈<br><br>
        <strong>日常業務:</strong><br>
        ・SNS運用・更新<br>
        ・問い合わせ対応<br>
        ・在庫管理<br>
        ・経費処理<br>
        ・報告書作成<br><br>
        詳細は各担当者から引き継ぎを受けてください。`
    },
    
    // 連絡先・問い合わせ
    '連絡先': {
        keywords: ['連絡先', '問い合わせ', '電話', 'メール', '担当', '相談'],
        answer: `📞 <strong>連絡先・問い合わせ</strong><br><br>
        <strong>各種お問い合わせ:</strong><br>
        ・イベント関連: イベント担当者へ<br>
        ・絵本・販売関連: 出版担当者へ<br>
        ・経理・会計: 経理担当者へ<br>
        ・広報・SNS: 広報担当者へ<br><br>
        <strong>公式情報:</strong><br>
        公式サイト: <a href="https://pasotaro.com" target="_blank">https://pasotaro.com</a><br><br>
        詳細な連絡先は入社時に案内されます。<br>
        不明点は直属の上司にご相談ください。`
    },
    
    // ビジョン・ミッション
    'ビジョン': {
        keywords: ['ビジョン', 'ミッション', '理念', '目標', '価値観', '方針'],
        answer: `🌟 <strong>パソコン太郎のビジョン</strong><br><br>
        <strong>私たちが目指すこと:</strong><br>
        ・子どもたちの未来を応援<br>
        ・IT教育・職業教育の推進<br>
        ・地域社会への貢献<br>
        ・有意義なイベントの提供<br><br>
        <strong>大切にしている価値観:</strong><br>
        ・教育を通じた社会貢献<br>
        ・地域との協働<br>
        ・継続的な学びと成長<br>
        ・楽しく・わかりやすく伝える<br><br>
        一緒に社会に貢献していきましょう！`
    }
};

// メッセージ送信処理
async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // ユーザーメッセージを表示
    addMessage(message, 'user');
    
    // 入力欄をクリア
    input.value = '';
    
    // ローディング表示
    const loadingId = addMessage('考え中...💭', 'bot');
    
    // BOTの応答を生成
    try {
        const response = await generateResponse(message);
        removeMessage(loadingId);
        addMessage(response, 'bot');
    } catch (error) {
        removeMessage(loadingId);
        addMessage('申し訳ございません。エラーが発生しました。もう一度お試しください。', 'bot');
        console.error('Error:', error);
    }
}

// メッセージを画面に追加
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // ユニークIDを付与
    const messageId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    messageDiv.id = messageId;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (sender === 'user') {
        contentDiv.innerHTML = `<strong>あなた:</strong> ${escapeHtml(text)}`;
    } else {
        contentDiv.innerHTML = `<strong>BOT:</strong> ${text}`;
    }
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // 最新メッセージまでスクロール
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageId;
}

// メッセージを削除
function removeMessage(messageId) {
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
        messageElement.remove();
    }
}

// BOTの応答を生成（完全Gemini AIモード）
async function generateResponse(userMessage) {
    // すべての質問をGemini APIで回答（挨拶も含む）
    try {
        const geminiResponse = await callGeminiAPI(userMessage);
        return geminiResponse;
    } catch (error) {
        console.error('Gemini API Error:', error);
        console.error('Error details:', error.message);
        // デバッグ用：エラーをアラート表示（開発時のみ）
        // alert('API Error: ' + error.message);
        // Gemini APIエラー時のみ知識ベースにフォールバック
        return getFallbackResponse(userMessage);
    }
}

// エラー時のフォールバック応答（知識ベースを使用）
function getFallbackResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // 知識ベースから検索
    for (const [key, data] of Object.entries(knowledgeBase)) {
        for (const keyword of data.keywords) {
            if (lowerMessage.includes(keyword.toLowerCase())) {
                return data.answer;
            }
        }
    }
    
    // デフォルトの応答
    return `申し訳ございません。現在接続に問題があるようです。🙏<br><br>
    以下のトピックについてお答えできます:<br>
    ・会社概要・事業内容<br>
    ・講演会・イベント企画<br>
    ・絵本事業（販売・制作）<br>
    ・IT教育・職業教育<br>
    ・地域連携・社会貢献<br>
    ・イベント運営業務<br><br>
    または、直属の上司にお問い合わせください。`;
}

// Gemini APIを呼び出す（詳細な会社情報付き）
async function callGeminiAPI(userMessage) {
    // パソコン太郎の詳細な会社情報をコンテキストとして提供
    const companyContext = `
あなたはパソコン太郎の新入社員サポートBOTです。質問に対して、詳しく、丁寧に、わかりやすく回答してください。

【パソコン太郎について】

■ 会社概要
- 講演会・イベント企画運営（堀江貴文氏、茂木健一郎氏などの著名人講演会を主催）
- 児童向け絵本の制作・販売
- IT教育・職業教育コンテンツの提供
- 地域・行政との連携事業
- 社会貢献活動（絵本販売利益の寄贈）
- 拠点：栃木県を中心に活動
- 公式サイト：https://pasotaro.com

■ 講演会・イベント実績
- 2020年11月：堀江貴文×パソコン太郎 講演会（鹿沼市民文化センター）
- 2021年12月：茂木健一郎×パソコン太郎 講演会（古峯神社、主催：ほわっと自然村）
- 2022年3月：堀江貴文特別講演会（栃木県総合文化センター メインホール）
イベント企画の流れ：企画立案→講師交渉→会場手配→集客（SNS活用）→当日運営→報告

■ 絵本事業
- 夢絵本シリーズ：ITの楽しさと危険性を伝える教育絵本
- 職育シリーズ（外伝）：様々な職業を紹介し、キャリア教育をサポート（第1巻〜第6巻）
- 番外編シリーズ：環境省・栃木県鹿沼市と連携したクールチョイス事業
- 販売：Amazonで販売、購入利益は寄贈資金として活用
- 対象：児童・保護者・教育機関

■ IT教育・職業教育
- ITの楽しさを伝える活動
- デジタル時代のリスク啓発（情報リテラシー向上）
- 子どもたちの未来を応援する職業教育
- 楽しく学べるコンテンツ作り

■ 地域連携・社会貢献
- 環境省との協働プロジェクト
- 栃木県鹿沼市との連携事業
- クールチョイス事業への参画
- 地域イベントの企画・運営
- 教育機関へのサポート

■ イベント運営業務
新入社員が担当する可能性がある業務：
- 会場設営・受付対応
- 音響・映像機材の準備
- 講師アテンド・進行サポート
- 来場者対応・誘導
- SNS発信（当日レポート）
- 物販対応（絵本販売など）

■ 会社のビジョン
- 子どもたちの未来を応援
- IT教育・職業教育の推進
- 地域社会への貢献
- 有意義なイベントの提供
- 教育を通じた社会貢献
- 楽しく・わかりやすく伝える

【回答時の注意事項】
1. 新入社員向けに優しく、具体的に説明してください
2. 適切に絵文字を使って親しみやすく回答してください
3. 必要に応じて箇条書きや段落を使って読みやすく構成してください
4. 会社の情報に関係ない質問の場合は、丁寧に会社業務に関する質問をお願いする旨を伝えてください
5. わからないことは「詳細は直属の上司や担当者にご確認ください」と案内してください

質問：${userMessage}
`;

    const requestBody = {
        contents: [{
            parts: [{
                text: companyContext
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
        }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Response Error:', errorData);
        throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        // 改行を<br>に変換、マークダウンの太字を<strong>に変換
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    } else {
        console.error('Invalid API response structure:', data);
        throw new Error('Invalid response from Gemini API');
    }
}

// クイックボタンからの質問
function askQuestion(question) {
    document.getElementById('userInput').value = question;
    sendMessage();
}

// Enterキーで送信
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// HTMLエスケープ
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userInput').focus();
});
