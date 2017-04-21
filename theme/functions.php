<?php

require_once TEMPLATEPATH . '/core/classes/CustomPostTypes.class.php';

define('WP_ENV', 'development');

add_theme_support( 'post-formats' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'menus' );

add_theme_support('soil-clean-up');
add_theme_support('soil-disable-asset-versioning');
add_theme_support('soil-disable-trackbacks');
add_theme_support('soil-google-analytics', 'UA-XXXXX-Y');
add_theme_support('soil-jquery-cdn');
add_theme_support('soil-js-to-footer');
add_theme_support('soil-nav-walker');
add_theme_support('soil-nice-search');
add_theme_support('soil-relative-urls');

add_action( 'wp_enqueue_scripts', 'add_theme_scripts', 0);


function add_theme_scripts() {
  $version = wp_get_theme()->get( 'Version' );
  $url = (WP_ENV == 'development')? 'http://localhost:4000/': get_template_directory_uri() . '/dist/';

  if(WP_ENV !== 'development') {
    wp_enqueue_style( 'inline', $url . 'inline.css', array(), $version);
    wp_enqueue_style( 'main', $url . 'main.bundle.css', array(), $version);
  }

  wp_enqueue_script( 'polyfills', $url . 'polyfills.bundle.js', array(), $version, true );
  wp_enqueue_script( 'vendor', $url . 'vendor.bundle.js', array('polyfills'), $version, true );
  wp_enqueue_script( 'app', $url . 'app.bundle.js', array('vendor'), $version, true );
}
