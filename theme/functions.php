<?php

require_once TEMPLATEPATH . '/core/classes/CustomPostTypes.class.php';

define('WP_ENV', 'development');

add_theme_support( 'post-formats' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'menus' );

// add_action('wp_enqueue_scripts', 'add_theme_scripts');
add_action( 'wp_enqueue_scripts', 'add_theme_scripts', 0);



function add_theme_scripts() {
  $version = wp_get_theme()->get( 'Version' );
  $url = (WP_ENV == 'development')? 'http://localhost:4000/': get_template_directory_uri() . '/dist/';

  wp_enqueue_script( 'polyfills', $url . 'polyfills.bundle.js', array(), $version, true );
  wp_enqueue_script( 'vendor', $url . 'vendor.bundle.js', array('polyfills'), $version, true );
  wp_enqueue_script( 'app', $url . 'app.bundle.js', array('vendor'), $version, true );
}
