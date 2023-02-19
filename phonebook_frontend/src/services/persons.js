import axios from 'axios'
const baseurl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request =  axios.get(baseurl)
    console.log(request)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseurl, newObject)
    return request.then(response => response.data)
}

const update  = (id,newObject) => {
    const request =  axios.put('${baseUrl}/${id}', newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    console.log(`beginning deletion process of ${id}`)
    axios.delete(`http://localhost:3001/persons/${id}`)
    .then(() => console.log(`delete of ${id} successfull`))
    .catch((error => console.error(`Error in deletion of ${id}`)))
}
export default {
    getAll,
    create,
    update,
    deletePerson
}
