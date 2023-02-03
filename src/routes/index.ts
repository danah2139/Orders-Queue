import express from 'express';
import { providerRoute } from './provider.route';

export const routes = express.Router();

routes.use(providerRoute);
