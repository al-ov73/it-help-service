module.exports = {
  module:{
    rules:[   //загрузчик для jsx
      {
        test: /\.jsx?$|js$/, // определяем тип файлов
        exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
        loader: "babel-loader",   // определяем загрузчик
        options:{
            presets:[ "@babel/preset-react"]    // используемые плагины
        }
      },
      {
        test: /\.(sass|css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
}
};