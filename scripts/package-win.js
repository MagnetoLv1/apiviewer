
const packager = require("electron-packager");
const fs = require('fs-extra');
const path = require('path');
var os = require('os');
// 毎回オプションを書き直すのは面倒くさいのでpackage.jsonから引っ張ってくる
const package = require("../package.json");
const packageLock = require("../package-lock.json");


packager({
    name: package["name"],
    dir: ".",// ソースフォルダのパス
    out: "./release",// 出力先フォルダのパス
    icon: "./src/favicon.ico",// アイコンのパス
    platform:   os.platform(), //"win32",
    arch: os.arch(),  //"x64",
    overwrite: true,// 上書き
    asar: false,// asarパッケージ化
    ignore:"src|.gitignore",
    //prune:true,
    electronVersion : packageLock["dependencies"]["electron"]["version"], // Electronのバージョン
    appVersion: package["version"],// アプリバージョン
    appCopyright: "Copyright (C) 2016 "+package["author"]+".",// コピーライト
    
    "version-string": {// Windowsのみのオプション
        CompanyName: "totoraj.net",
        FileDescription: package["name"],
        OriginalFilename: package["name"]+".exe",
        ProductName: package["name"],
        InternalName: package["name"]
    }
    
}, function (err, appPaths) {// 完了時のコールバック
    if (err) console.log(err);
    //console.log("Done: " + path.resolve(__dirname,'./../.env.release'),path.resolve(appPaths,'./.env'));
    //fs.copySync( path.resolve('./.env.release'), path.resolve(appPaths,'./.env'));
});