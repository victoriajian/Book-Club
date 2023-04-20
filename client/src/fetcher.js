import config from './config.json'

const getExploreSearch = async (search) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/explore?title=${search}`, {
            method: 'GET',
    })
    return res.json()
}

export {
    getExploreSearch,
}