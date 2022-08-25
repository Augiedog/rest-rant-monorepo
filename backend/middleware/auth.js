const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { User } = db

router.post('/', async (req, res) => {
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: `Could not find user with the provided creditals`
        })
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })
        res.json({ user: user, token: result.value })
    }
})

router.get('/profile', async (req, res) => {
    try {
        // Split the auth header
        const [authenticationMethod, token] = req.headers.authorization.split('')
        // handle Bearer
        if (authenticationMethod == 'Bearer') {
            // Decode JWT
            const result = await jwt.decode(process.env.JWT_SECRET, token)
            // Get the logged in user id
            const { id } = result.value
            // Find the user by id
            let user = await user.findOne({
                where: {
                    userId: id
                }
            })
            res.json(user)
        }        
    } catch {
        res.json(null)
    }
})

module.exports = router