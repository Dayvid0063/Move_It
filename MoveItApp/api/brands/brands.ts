import client from '../client';

const endpoint = '/brands';

const getBrands = () => client.get(`${endpoint}`);

export {
    getBrands,
}