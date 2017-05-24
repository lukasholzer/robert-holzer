import del from 'del';
import { base } from './config';

export const clean = () => del([base.dist]);

export default clean;
