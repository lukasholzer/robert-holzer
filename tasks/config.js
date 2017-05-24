import path from 'path';

export const base = {
  dist: 'dist/',
  src: 'src/',
  root: 'theme/'
};

export const general = {
  wordpress: {
    address: 'localhost:8080'
  }
}

export const paths = {
  styles: {
    src: path.resolve(base.root, base.src, 'styles'),
    dist: path.resolve(base.root, base.dist, 'styles')
  },
  scripts: {
    src: path.resolve(base.root, base.src),
    dist: path.resolve(base.root, base.dist, 'scripts')
  },
  images: {
    src: path.resolve(base.root, base.src, 'images'),
    dist: path.resolve(base.root, base.dist, 'images')
  },
  fonts: {
    src: path.resolve(base.root, base.src, 'fonts')
  },
  icons: {
    src: path.resolve(base.root, base.src, 'icons')
  },
  views: path.resolve(base.root, 'views'),
}

export const pluginOptions = {
  posthtmlBem: {
    elemPrefix: '__',
    modPrefix: '--',
    modDlmtr: '-'
  }
}

export default { general, paths, pluginOptions };
