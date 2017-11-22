## nrwl example

### 導入


```sh
# 初期設定
git clone git@github.com:MSakamaki/nrwl-heros.git
cd nrwl-heros
npm install


# 資料を見る方法
npm run doc       # 資料ビルド
npm run doc.serve # 資料閲覧

# 開発準備(APIサーバーとかキャッシュの無いchromeを立ち上げる)
npm run mock.start

# 画面起動
npm start

```

 + [ハンズオンドキュメント](http://127.0.0.1:8080/)
 + [アプリ画面](http://localhost:4200)
 + [API開発画面](http://localhost:3030/debug.html)


```sh
###############
# その他
###############

# mock終了
npm run pm2.kill


```

