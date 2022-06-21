const { Router } = require('express');
const axios = require('axios');
const { Op, Dog, Temperament } = require('../db') ;
const router = Router();

router.get('/', async (req,res) => {
    const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
    let data = breeds.data;

    let temperaments = [];
    data.forEach(breed => {
        tempBred = breed.temperament?.split(', ')
        if(tempBred){
            temperaments = [...temperaments, ...tempBred]
        }
    });
    let resTemperaments = new Set(temperaments)
    resTemperaments = [...resTemperaments].sort()

    let arrPromises = resTemperaments.map(t => {
        return Temperament.findOrCreate({
            where: {name: t},
            defaults: {
                name: t,
            }
        })
    })
    
    await Promise.all(arrPromises)
    res.send('Temperaments updated')
})


module.exports = router;