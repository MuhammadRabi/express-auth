const express = require("express")
const bcrypt = require("bcrypt")

const app = express()
const port = 3000

app.use(express.json())
const users = []

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body
    // find user
    const findUser = users.find((data) => email === data.email)
    if (findUser) {
      res.status(400).json("wrong email or password!")
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, 10)
    if (!findUser) {
      users.push({ email, password: hashPassword })
      res.status(201).json("Registered successfully!")
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    // find user
    const findUser = users.find((data) => email === data.email)
    if (!findUser) {
      res.status(400).json("wrong email or password!")
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password)

    if (passwordMatch) {
      res.status(200).json("login success!")
    } else {
      res.status(500).json("wrong email or password!")
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log("server listening on port 3000!")
})
