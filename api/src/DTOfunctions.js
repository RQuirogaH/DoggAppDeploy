let dtoAPI = (data) => {
    let dataDTO = []
    data.forEach(b => {
        dataDTO.push({
            id: b.id,
            name: b.name,
            weight: b.weight.metric,
            height: b.height.metric,
            life_span: b.life_span,
            temperament: b.temperament?.split(', '),
            img: b.image.url,
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
            height: b.height,
            life_span: b.life_span,
            temperament: b.temperaments.map(e => e.name),
            img: b.img
        })
    })
    return dataDTO
}

module.exports= {
    dtoAPI,
    dtoDB
}
