const axios = require('axios');
const { Router } = require('express');
const { dtoAPI, dtoDB } = require('../DTOfunctions')
const { Dog, Temperament } = require('../db')
const router = Router();

router.get('/', async (req, res) => {

    const { name } = req.query

    try {
        const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
        let response = breeds.data;
        response = dtoAPI(response)

        let db_data = await Dog.findAll({
            include: Temperament,
        });

        if (db_data) {
            db_data = dtoDB(db_data)
            response = [...response, ...db_data]
        }

        if (name) {
            response = response.filter(b => b.name.toLowerCase().includes(name.toLowerCase()))
        }

        response.sort(function (a, b) {
            let aLowerCase = a.name.toLowerCase();
            let bLowerCase = b.name.toLowerCase();
            if (aLowerCase < bLowerCase) return -1
            if (aLowerCase > bLowerCase) return 1
            return 0
        });

        if (!response.length) {
            return res.json({ status: 'NO DATA', data: [] })
        }

        res.json({ status: 'OK', data: response })
    }
    catch (err) {
        res.json({ status: 'ERROR', data: [] })
    }
})

router.get('/:idRaza', async (req, res) => {
    const id = req.params.idRaza;
    try {
        if (isNaN(Number(id))) {
            let breed = await Dog.findByPk(id, {
                include: Temperament
            })
            if (!breed) {
                return res.json({ status: 'NO DATA', data: [] })
            }
            breed = dtoDB([breed.dataValues])

            return res.json({ status: 'OK', data: breed })
        }
        const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
        let response = breeds.data;
        response = response.filter(b => b.id === parseInt(id))

        if (!response.length) {
            return res.json({ status: 'NO DATA', data: [] })
        }

        response = dtoAPI(response)

        res.json({ status: 'OK', data: response })
    }
    catch (err) {
        res.json({ status: 'NO DATA', data: [] })
    }
})

router.post('/', async (req, res) => {
    const { name, height, weight, life_span, temperaments, img } = req.body;
    try {
        console.log(name, height, weight, life_span, temperaments, img)
        let [newBreed, created] = await Dog.findOrCreate({
            where: { name: name },
            defaults: {
                name,
                height,
                weight,
                life_span,
                img
            }
        })

        if (!created) {
            let newBreedId = newBreed.dataValues.id

            let breedCrated = await Dog.findByPk(newBreedId, {
                include: Temperament
            })
            breedCrated = dtoDB([breedCrated.dataValues])
            return res.json({ status: 'EXISTED', data: breedCrated })
        }

        if (temperaments) {
            let idTemp = await Temperament.findAll({
                where: {
                    name: temperaments
                }
            })
            idTemp = idTemp.map(t => t.dataValues.id);
            await newBreed.setTemperaments(idTemp)
        }

        let newBreedId = newBreed.dataValues.id

        let breedCrated = await Dog.findByPk(newBreedId, {
            include: Temperament
        })
        breedCrated = dtoDB([breedCrated.dataValues])
        res.json({ status: 'CREATED', data: breedCrated })
    }
    catch (err) {
        res.json({ status: 'ERROR', data: [] })
    }

})

module.exports = router;