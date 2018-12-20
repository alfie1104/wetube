const path = require("path"); //import path from "path"와 같음. webpack config파일은 es6 인식안되서 이렇게 함
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV; //프로그램 실행시 인자로 입력한 WEBPACK_ENV의 값을 가져와서 MODE에 입력
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); //문자열로 된 경로들을 하나로 합침. dirname은 현재 디렉토리 이름
const OUTPUT_DIR = path.join(__dirname, "static");

// path.join('/a', '/b') // Outputs '/a/b'
// path.resolve('/a', '/b') // Outputs '/b'

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: ExtractCSS.extract([
                    {
                        loader: "css-loader"
                    }
                    ,
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins() {
                                return [autoprefixer({ browsers: "cover 99.5%" })];
                            }
                        }
                    }
                    ,
                    {
                        loader: "sass-loader"
                    }
                ])
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;