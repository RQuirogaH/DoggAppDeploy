const axios = require('axios');
const { Router } = require('express');
const { Op, Dog, Temperament } = require('../db') 
const router = Router();

router.get('/', async (req,res) => {

    const {name} = req.query
    if(name){
        const breeds = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        let response = breeds.data;

        const db_data  = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        if(db_data){
            response = [...response, ...db_data]
        }

        return res.json(response)
    }

    const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
    let response = breeds.data;

    const db_data  = await Dog.findAll();

    if(db_data){
        response = [...response, ...db_data]
    }
    

    res.json(response)
})

router.get('/:idRaza', async (req, res) => {
    const id = req.params.idRaza;
    
    if(id.slice(-2) === 'db'){
        idDB = parseInt(id.split('_')[0])

        const breed = await Dog.findByPk(idDB)

        if(!breed){
            return res.json({msg: 'No existe la raza que estás buscando'})
        }

        return res.json(breed)
    }

    const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
    let response = breeds.data;

    response = response.filter(b => b.id === parseInt(id))

    res.json(response)
})

router.post('/', async (req, res) => {
    const {name, height, weight, life_span, temperaments} = req.body;

    let newBreed = await Dog.create({
        name,
        height,
        weight,
        life_span
    })
    let idTemp = await Temperament.findAll({
        where: {
            name: temperaments
        }
    })

    idTemp = idTemp.map(t => t.dataValues.id);
    await newBreed.setTemperaments(idTemp)
    
    res.json(newBreed.dataValues)

})

module.exports = router;