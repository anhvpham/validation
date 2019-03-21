const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { struct } = require('superstruct');

const app = new Koa()
app.use(bodyParser())

const User = struct({
  id: 'number',
  name: 'string',
  email: 'string',
})

app.use(async ctx => {

	const data = await ctx.request.body
  
	const item = await show(data)
  
  ctx.body = item
})

async function show(data) {
  try {
		const user = User(data)
		
		const result = {message: "Data Is Valid", user}
		return(result)
		
	} catch (e) {
		const { message } = e
		return({ message })
	}

}

module.exports = app.callback()
