import { Novu } from '@novu/node';

const novu = new Novu((process.env.NOVU_API_KEY) ? process.env.NOVU_API_KEY : '');

