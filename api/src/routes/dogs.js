const axios = require('axios');
const { Router } = require('express');
const {dtoAPI, dtoDB} = require('../DTOfunctions')
const { Op, Dog, Temperament } = require('../db') 
const router = Router();

router.get('/', async (req,res) => {

    const {name} = req.query

    try {
/*         if(name){
            const breeds = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
            let response = breeds.data;
            
            response = fDTO(response)
            const db_data  = await Dog.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: Temperament
            });
    
            if(db_data){
                response = [...response, ...db_data]
            }

            if(!response.length){
                return res.json({msg: 'No hay razas con el nombre indicado'})
            }

            return res.json(response)
        } */
        const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
        let response = breeds.data;
        response = dtoAPI(response)

        let db_data  = await Dog.findAll({
            include: Temperament,
        });

        if(db_data){
            db_data = dtoDB(db_data)
            response = [...response, ...db_data]
        }

        if(name) {
            response = response.filter(b => b.name.toLowerCase().includes(name.toLowerCase()))
        }

        res.json(response)
    }
    catch(err) {
        res.json({msg: 'Ocurrió un error con los datos ingresados', err: err.message})
    }
})

router.get('/:idRaza', async (req, res) => {
    const id = req.params.idRaza;
    
    try {
        if(id.includes('-')){
            const breed = await Dog.findByPk(id)
    
            if(!breed){
                return res.json({msg: 'No existe la raza que estás buscando'})
            }
    
            return res.json(breed)
        }
    
        const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
        let response = breeds.data;
    
        response = response.filter(b => b.id === parseInt(id))
    
        if(!response.length){
            return res.json({msg: 'No existe la raza que estás buscando'})
        }
    
        res.json(response)
    }    
    catch(err) {
        res.json({msg: 'Ocurrió un error con los datos ingresados', err: err.message})
    }
})

router.post('/', async (req, res) => {
    const {name, height, weight, life_span, temperaments} = req.body;
    try {

        let [newBreed,created] = await Dog.findOrCreate({
            where: {name: name},
            defaults: {
                name,
                height,
                weight,
                life_span
            }
        })

        if(!created) {
            let newBreedId =  newBreed.dataValues.id

            let breedCrated = await Dog.findByPk(newBreedId,{
                include: Temperament
            })
            breedCrated = dtoDB([breedCrated.dataValues])
            return res.json({msg: 'La raza ya existe', breed: breedCrated})
        }

        if(temperaments){
            let idTemp = await Temperament.findAll({
                where: {
                    name: temperaments
                }
            })  
            idTemp = idTemp.map(t => t.dataValues.id);
            await newBreed.setTemperaments(idTemp)
        }

        let newBreedId =  newBreed.dataValues.id

        let breedCrated = await Dog.findByPk(newBreedId,{
            include: Temperament
        })
        breedCrated = dtoDB([breedCrated.dataValues])
        res.json(breedCrated)
    }
    catch(err) {
        res.json({msg: 'Ocurrió un error con los datos ingresados', err: err.message})
    }

})

module.exports = router;