import axios from 'axios';
import { apiUrl } from './apiUrl';

// TODO: write types of input and output of the function
export type InputGetList = {};
export type OutputGetList = {
    name: string;
};
export async function getList(input: InputGetList): Promise<OutputGetList> {
    const response = await axios.get(apiUrl.getList);

    // TODO: filter data from response
    return {
        name: response.data?.name || '',
    };
}
