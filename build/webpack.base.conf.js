
module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/main.js'
	},
	//添加
	externals: {
		"BMap": "BMap"
	},
}
