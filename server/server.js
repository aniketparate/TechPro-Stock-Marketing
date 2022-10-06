import fetch from 'node-fetch'
import express, { json } from 'express'
import { fstat, readFile, readFileSync, writeFile } from 'fs'
const filePath = './text.json'

const app = express()

const obj = []

const getStock = async () => {

	await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/tatasteel.ns?interval=1d&range=1y`)
		.then((response) => response.json())
		.then((json) => {
			for (let i = 0; i < json.chart.result[0].timestamp.length; i++) {
				const unixTimestamp = json.chart.result[0].timestamp[i]
				const milliseconds = unixTimestamp * 1000
				const dateObject = new Date(milliseconds)
				const humanDateFormat = dateObject.toLocaleDateString()
				// console.log(humanDateFormat)
				// obj.date.push(humanDateFormat)
				const op = json.chart.result[0].indicators.quote[0].open[i]
				// console.log(op);
				// obj.open.push(op)
				const hi = json.chart.result[0].indicators.quote[0].high[i]
				// console.log(hi);
				// obj.high.push(hi)
				const lo = json.chart.result[0].indicators.quote[0].low[i]
				// console.log(lo);
				// obj.low.push(lo)
				const cl = json.chart.result[0].indicators.quote[0].close[i]
				// console.log(cl);
				// obj.close.push(cl)
				const vo = json.chart.result[0].indicators.quote[0].volume[i]
				// console.log(vo);
				// obj.volume.push(vo)
				obj.push({
					date: humanDateFormat,
					open: op,
					high: hi,
					low: lo,
					close: cl,
					volume: vo
				})
			}
		})
		.then(() => {
			// console.log(obj)
			const objString = JSON.stringify(obj);
			writeFile(filePath, objString, (err) => {
				if (err) throw err;
			})
		})
}

app.get("/api", async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	await getStock()
	res.json(obj)
})

app.listen(5000, () => { console.log("Server started on port 5000") })