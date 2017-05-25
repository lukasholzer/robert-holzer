import { imagesWatch } from './images';
import { fontsWatch } from './fonts';
import { stylesWatch } from './styles';

export default function watcher() {
  imagesWatch();
  fontsWatch();
  stylesWatch();
}
