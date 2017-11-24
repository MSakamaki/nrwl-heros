## nrwl example

### 導入

### VS Codeのインストール

https://code.visualstudio.com/

### VSコードのプラグイン

https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2
https://marketplace.visualstudio.com/items?itemName=Angular.ng-template
https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode


### コマンド

```sh
# 初期設定
git clone git@github.com:MSakamaki/nrwl-heros.git
cd nrwl-heros
npm install

# 開発準備(APIサーバーとかキャッシュの無いchromeを立ち上げる)
npm run dev.start
# windowsで動かない人は以下のコマンドを個別のプロンプトで実行する
npm run pm2.kill
npm run doc && npm run doc.start
npm run mock.start
start chrome --user-data-dir=c:/tmp/nrwl-sample --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:4200 "http://127.0.0.1:8080/"

# 資料を見る方法(資料更新)
npm run doc


# 画面起動
npm start

```

 + [ハンズオンドキュメント](http://127.0.0.1:8080/)
 + [アプリ画面](http://localhost:4200)
 + [API開発画面](http://localhost:3030/debug.html)


```sh
##############################
#   開発が終わったら
##############################

# mock終了
npm run pm2.kill

```

