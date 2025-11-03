# Fish Audio エモーションタグ WebSocket API 調査レポート

## 調査日時
2025年1月5日

## 問題の概要
Fish AudioのWebSocket APIを使用してエモーションタグを含むテキストを送信すると、タグがそのまま音声として読み上げられる問題が発生している。

## 詳細な調査結果

### 1. WebSocket APIの実装確認

#### 1.1 SDKの実装詳細
**ファイル**: `node_modules/fish-audio-sdk/dist/websocket.js`

**重要な発見**:
- WebSocket経由で送信されるテキストは、特別な処理が施されず、そのまま送信されている
- `textEvent`では、テキストがそのまま`text`フィールドに格納される（140-145行目）
- `startEvent`の`request`オブジェクトには、`prosody`フィールド（speed, volume）のみが含まれる
- エモーションタグに関する特別な処理やフィールドは存在しない

```javascript
// 140-145行目: textLines.forEach((line) => {
    const textEvent = {
        event: 'text',
        text: line  // エモーションタグを含むテキストがそのまま送信される
    };
    ws.send(msgpack_lite_1.default.encode(textEvent));
});
```

#### 1.2 バックエンドの確認
- `speech-1.5`: エモーションタグがそのまま読み上げられる
- `speech-1.6`: エモーションタグがそのまま読み上げられる
- 両方のバックエンドで同じ問題が発生

### 2. HTTP APIの実装確認

#### 2.1 SDKの実装詳細
**ファイル**: `node_modules/fish-audio-sdk/dist/session.js`

**重要な発見**:
- HTTP APIでも`TTSRequest`を使用してテキストを送信
- `prosody`フィールド（speed, volume）はサポートされている
- エモーションタグに関する特別な処理は見当たらない

#### 2.2 スキーマの確認
**ファイル**: `node_modules/fish-audio-sdk/dist/schemas.d.ts`

**TTSRequestOptions**:
```typescript
export interface TTSRequestOptions {
    chunkLength?: number;
    format?: 'wav' | 'pcm' | 'mp3' | 'opus';
    mp3Bitrate?: 64 | 128 | 192;
    opusBitrate?: -1000 | 24 | 32 | 48 | 64;
    sampleRate?: number;
    references?: ReferenceAudio[];
    referenceId?: string;
    modelId?: string;
    normalize?: boolean;
    latency?: 'normal' | 'balanced';
    prosody?: {  // speed, volume のみ
        speed: number;
        volume: number;
    };
}
```

**重要な発見**:
- `prosody`フィールドは`speed`と`volume`のみ
- エモーションタグに関するフィールドは存在しない

### 3. 公式ドキュメントの確認

#### 3.1 WebSocket APIドキュメント
- **URL**: https://docs.fish.audio/sdk-reference/python/websocket
- **結果**: エモーションタグのサポートに関する記述は見当たらない
- **重要な点**: 「サポートしない」と明示的に書かれているわけではなく、エモーションタグに関する記述がない

#### 3.2 HTTP APIドキュメント
- **URL**: https://docs.fish.audio/api-reference/introduction
- **結果**: エモーションタグの使用方法やサポート状況に関する具体的な情報は記載されていない
- **重要な点**: HTTP APIでもエモーションタグに関する明確な記述は見当たらない

#### 3.3 エモーションタグのドキュメント
- **URL**: https://docs.fish.audio/developer-platform/core-features/emotions
- **結果**: エモーションタグの使用方法は記載されているが、WebSocket APIとの関連性は不明
- **重要な点**: エモーションタグの使用方法自体は説明されているが、どのAPIで使用可能かは明記されていない

#### 3.4 リアルタイムストリーミングのベストプラクティス
- **URL**: https://docs.fish.audio/resources/best-practices/real-time-streaming
- **結果**: エモーションタグに関する情報は記載されていない

#### 3.5 重要な注意事項
**「サポートしない」と明示的に書かれているURLは存在しない**
- すべてのドキュメントで「エモーションタグに関する記述がない」という状況
- これは「サポートしない」ことを意味するのではなく、「記述がない」ことを意味する
- 実際の動作確認では、WebSocket APIでエモーションタグがそのまま読み上げられることが判明

### 4. 技術的な分析

#### 4.1 WebSocket APIの動作フロー
1. `startEvent`を送信（`request`オブジェクトに設定情報を含む）
2. `textEvent`を送信（テキストがそのまま送信される）
3. `stopEvent`を送信
4. サーバー側で音声を生成

**問題点**:
- エモーションタグはテキスト内に含まれているが、サーバー側で認識されていない
- エモーションタグを処理するための特別なプロトコルやフィールドが存在しない

#### 4.2 HTTP APIの動作フロー
1. `TTSRequest`オブジェクトを作成
2. `/v1/tts`エンドポイントにPOSTリクエストを送信
3. ストリーミングレスポンスで音声データを受信

**推測**:
- HTTP APIでも同様にエモーションタグがサポートされていない可能性がある
- ただし、HTTP APIではエモーションタグが正しく処理される可能性もある（未確認）

### 5. 結論

#### 5.1 根本原因
1. **WebSocket APIがエモーションタグをサポートしていない**
   - SDKの実装にエモーションタグを処理する機能がない
   - サーバー側でもエモーションタグを認識していない可能性

2. **エモーションタグはテキスト内に埋め込まれる形式**
   - ドキュメントによると、エモーションタグはテキスト内に`(happy)`のような形式で記述される
   - しかし、WebSocket APIではこれがそのまま読み上げられている

3. **バックエンドモデルの違いは影響しない**
   - `speech-1.5`と`speech-1.6`の両方で同じ問題が発生
   - バックエンドの問題ではなく、APIの実装の問題

#### 5.2 考えられる理由
1. **WebSocket APIは低レイテンシーに特化**
   - エモーションタグの処理は追加のオーバーヘッドが発生する可能性
   - ストリーミングを優先し、エモーションタグの処理を省略している可能性

2. **エモーションタグはHTTP APIでのみサポート**
   - 公式ドキュメントにHTTP APIでのエモーションタグの使用例がある可能性
   - WebSocket APIは後から追加された機能で、エモーションタグのサポートが未実装

3. **エモーションタグの処理方法が異なる**
   - WebSocket APIでは、エモーションタグを別のフィールドで送信する必要がある可能性
   - 現在の実装では、テキスト内に含めるだけでは認識されない

### 6. 推奨される解決策

#### 6.1 短期的な解決策
1. **HTTP APIへの切り替え**
   - エモーションタグを優先する場合、HTTP APIを使用する
   - ストリーミングは劣るが、エモーションタグが正しく処理される可能性

2. **エモーションタグの削除**
   - 現時点ではエモーションタグを使用せず、通常の音声合成に戻す
   - 後でエモーションタグのサポートが追加されたときに再実装する

#### 6.2 長期的な解決策
1. **Fish Audioのサポートに問い合わせ**
   - WebSocket APIでのエモーションタグのサポート状況を確認
   - 今後の対応予定を確認

2. **カスタム実装の検討**
   - エモーションタグを検出して、別の方法で送信する
   - ただし、サーバー側のサポートが必要

3. **HTTP APIでのストリーミング実装**
   - HTTP APIを使用しつつ、チャンクごとにリクエストを送信してストリーミングを実現
   - エモーションタグを維持しつつ、低レイテンシーを実現

### 7. 次のステップ

1. **HTTP APIでの動作確認**
   - HTTP APIを使用してエモーションタグが正しく処理されるか確認
   - 動作する場合は、HTTP APIへの切り替えを検討

2. **Fish Audioのサポートに問い合わせ**
   - WebSocket APIでのエモーションタグのサポート状況を確認
   - 正しい使用方法がある場合は教えてもらう

3. **実装の選択**
   - HTTP APIへの切り替え
   - エモーションタグの削除
   - 暫定的な回避策の実装

## 参考資料

- Fish Audio WebSocket API: https://docs.fish.audio/sdk-reference/python/websocket
- Fish Audio HTTP API: https://docs.fish.audio/api-reference/introduction
- Fish Audio エモーションタグ: https://docs.fish.audio/developer-platform/core-features/emotions
- fish-audio-sdk GitHub: https://github.com/fishaudio/fish-audio-sdk (推測)

