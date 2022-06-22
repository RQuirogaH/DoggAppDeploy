let dtoAPI = (data) => {
    let dataDTO = []
    data.forEach(b => {
        dataDTO.push({
            id: b.id,
            name: b.name,
            weight: b.weight.metric,
            height: b.weight.metric,
            life_span: b.life_span,
            temperament: b.temperament,
            img: b.reference_image_id,
        })
    })
    return dataDTO
}

let dtoDB = (data) => {
    let dataDTO = []
    data.forEach(b => {
        dataDTO.push({
            id: b.id,
            name: b.name,
            weight: b.weight,
            height: b.weight,
            life_span: b.life_span,
            temperament: b.temperaments.map(e => e.name).join(', '),
        })
    })
    return dataDTO
}

module.exports= {
    dtoAPI,
    dtoDB
}
