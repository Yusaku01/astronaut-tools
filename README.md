# Astronaut Tools

Astro専用の最小依存・ゼロJavaScript UIコンポーネントライブラリ

## プロジェクト概要

**Astronaut Tools**は、Astroプロジェクト向けに設計されたUIコンポーネントライブラリです。shadcn/uiと同様のレジストリベース配布モデルを採用しており、必要なコンポーネントを個別にプロジェクトへコピーして使用できます。

### 特徴

- **ゼロJavaScript**: クライアントサイドJavaScriptを使用せず、純粋なAstroコンポーネントとCSSで実装
- **最小依存**: npmパッケージとしてインストールするのではなく、コンポーネントファイルを直接コピー
- **アクセシビリティ優先**: セマンティックHTMLとARIA属性による適切なアクセシビリティ実装
- **デザイントークン**: OKLCH色空間を使用した現代的なカラーシステムと自動ダークモード対応
- **型安全**: TypeScriptによる厳格な型チェック

## 利用方法

### 開発サーバーの起動

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

開発サーバーは `http://localhost:4321` で起動します。

### コンポーネントの利用

Astronaut Toolsのコンポーネントは、レジストリから直接プロジェクトにコピーして使用します。各コンポーネントのドキュメントページで、以下の情報が提供されます:

- コンポーネントファイル（`.astro`）
- スタイルファイル（`.css`）
- 使用例とプロパティの説明

詳細な使い方は、開発サーバー起動後のドキュメントサイトをご覧ください。

## 技術スタック

### コアフレームワーク

- **[Astro](https://astro.build/) 5.15.4**: 静的サイト生成とコンポーネントアイランドアーキテクチャ
- **[TypeScript](https://www.typescriptlang.org/) 5.9.3**: 厳格モード有効化

### ドキュメント

- **[Astro Starlight](https://starlight.astro.build/)**: ドキュメントサイト構築

### 開発ツール

- **[Biome](https://biomejs.dev/) 2.3.4**: リンティングとフォーマッティング（ESLint/Prettierの代替）
- **[Vitest](https://vitest.dev/) 4.0.8**: ユニットテスト（jsdom環境）
- **[Playwright](https://playwright.dev/) 1.56.1**: E2Eテスト（Chromium、Firefox、WebKit対応）
- **[Lefthook](https://github.com/evilmartians/lefthook) 2.0.2**: Gitフック管理

### 実行環境

- **pnpm 9**: パッケージマネージャー
- **Node.js 22.20.0**: ランタイムバージョン（Voltaで管理）

## 開発コマンド

### 開発

```bash
pnpm dev              # 開発サーバーを起動 (http://localhost:4321)
pnpm build            # 型チェック + 本番ビルド
pnpm preview          # 本番ビルドのプレビュー
```

### コード品質

```bash
pnpm lint             # Biomeリントチェックを実行
pnpm format           # Biomeでコードをフォーマット（--writeで変更を適用）
pnpm check:types      # Astro型チェックを実行
```

### テスト

```bash
pnpm test             # Vitestユニットテストを実行
pnpm test:e2e         # Playwright E2Eテストを実行
```

### Gitフック

```bash
pnpm hooks:install    # Lefthookフックを手動インストール
pnpm prepare          # フックを自動インストール（pnpm install時に実行）
```

## コントリビュート

### 開発環境のセットアップ

1. リポジトリをクローン
2. `pnpm install` で依存関係をインストール（Gitフックも自動的にインストールされます）
3. `pnpm dev` で開発サーバーを起動

### Gitフック

Lefthookによる自動チェックが設定されています:

**Pre-commit**:
- Biomeによる自動フォーマット（ステージングされたファイル）
- Biomeチェック（ステージングされたファイル）

**Pre-push**:
- 型チェック（`pnpm check:types`）
- ユニットテスト（`pnpm test`）
- リント（`pnpm lint`）

### コンポーネント作成フロー

新しいUIコンポーネントを作成する場合:

1. **コンポーネントファイル**: `src/components/ui/` に `.astro` ファイルを作成
2. **スタイル**: `styles/` にCSSファイルを作成（`@layer components` を使用）
3. **レジストリエントリ**: `registry/items/` にJSON定義を作成
4. **メインレジストリ更新**: `registry/registry.json` にエントリを追加
5. **ドキュメント**: `src/content/docs/` にMDXファイルを作成

詳細は `.claude/CLAUDE.md` を参照してください。

## ライセンス

TBD（後で追加予定）
