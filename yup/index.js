const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const yup = require('yup');

const app = new Koa()
app.use(bodyParser())

const User = yup.object().shape ({
  id: yup.number().required(),
  name: yup.string().required(),
  email: yup.string().email(),
})

app.use(async ctx => {

	const data = await ctx.request.body
  
	const item = await validate(data)
  
  ctx.body = item
})

async function validate(data) {
  try {
		const user = User.validateSync(data)
		
		const result = {message: "Data Is Valid", user}
		return(result)
		
	} catch (e) {
		const { name, errors} = e
		return({ "message" : name, errors })
	}

}

module.exports = app.callback()