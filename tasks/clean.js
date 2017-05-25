import del from 'promised-del';
import path from 'path';
import { base } from './config';

const dist = path.resolve(__dirname, '..', 'theme', 'dist');

export default function clean() {
  return del([dist]);
}
