import 'dotenv/config'
import express from 'express'
import { sequelize } from './models'
import Dog from './models/dog'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome To The Dogs API')
})

app.get('/dogs', async (req, res) => {
  const dogs = await Dog.findAll()
  res.send(dogs)
})

app.post('/dogs', async (req, res) => {
  const dog = Dog.build(req.body)
  try {
    const savedDog = await dog.save()
    res.send({...savedDog.toJSON(), status: 200})
  } catch (err) {
    res.send(err)
  }
})

app.get('/dogs/:id', async (req, res) => {
  const dog = await Dog.findByPk(req.params.id)

  if (!dog) {
    return res.send({ status: 404, error: 'Resource Not Found' })
  }

  res.send(dog)
})

app.patch('/dogs/:id', async (req, res) => {
  const dog = await Dog.findByPk(req.params.id)

  if (!dog) {
    return res.send({ status: 404, error: 'Resource Not Found' })
  }

  try {
    const updatedDog = await dog.update(req.body)
    res.send({...updatedDog.toJSON(), status: 200})
  } catch (err) {
    res.send(err)
  }
})

app.delete('/dogs/:id', async (req, res) => {
  const dog = await Dog.findByPk(req.params.id)

  if (!dog) {
    return res.send({ status: 404, error: 'Resource Not Found' })
  }

  await dog.destroy()
  res.send({status: 204})
})

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Dog API listening on port:', process.env.PORT)
  })
})