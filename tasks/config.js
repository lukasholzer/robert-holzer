import path from 'path';

// PostCSS plugins
import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import reporter from 'postcss-reporter';
import bemLinter from 'postcss-bem-linter';
import orderedValues from 'postcss-ordered-values';
import precss from 'precss';


const isProduction = (process.env.NODE_ENV === 'production');

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
  imagemin: {
    optimizationLevel: 7,
    progressive: true,
    interlaced: true,
    multipass: true
  },
  base64: {
    extensions: ['woff'],
    maxImageSize: 8000 * 1024,
    debug: true
  },
  postcss: {
    pre: [
      stylelint(),
      bemLinter(),
      reporter({ clearMessages: true })
    ],
    after: [
      precss(),
      orderedValues(),
      autoprefixer({ browsers: ['last 3 versions'] })
    ]
  },
  sass: {
    errLogToConsole: true
  }
}

export default { general, paths, pluginOptions };
