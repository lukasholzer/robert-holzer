<h1>Hello worlds</h1>
tests

<?php

  $url = 'http://localhost:4000'; // get_stylesheet_directory_uri() // production
  echo '<script type="text/javascript" src="' .$url. '/polyfills.bundle.js"></script>';
  echo '<script type="text/javascript" src="' .$url. '/vendor.bundle.js"></script>';
  echo '<script type="text/javascript" src="' .$url. '/app.bundle.js"></script>';
?>

<?php get_footer(); ?>

