import client from '../client';

const endpoint = '/cars';

const getCars = () => client.get(`${endpoint}`);
const getCar = (id: string) => client.get(`${endpoint}/${id}`);

export {
    getCars,
    getCar,
}
