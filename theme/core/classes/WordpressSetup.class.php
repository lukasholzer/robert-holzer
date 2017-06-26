<?php

class WordpressSetup {
  protected $version;
  protected $assets_path;
  protected $theme_path;
  protected $theme_uri;

  private static $ACF_PATH = '/core/acf';

  function __construct() {
    $this->theme_path = get_template_directory() . '/dist/';
    $this->theme_uri = get_template_directory_uri() . '/dist/';

    $this->version = wp_get_theme()->get( 'Version' );
    $this->assets_path = (WP_ENV == 'development')? 'http://localhost:4000/': $this->theme_uri;

		add_theme_support( 'post-formats' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );

    add_action( 'after_setup_theme', array($this, 'robertholzer_custom_header_setup'));

    // clean up wordpress
    add_theme_support('soil-clean-up');
    add_theme_support('soil-disable-asset-versioning');
    add_theme_support('soil-disable-trackbacks');
    add_theme_support('soil-google-analytics', 'UA-XXXXX-Y');
    add_theme_support('soil-jquery-cdn');
    add_theme_support('soil-js-to-footer');
    add_theme_support('soil-nav-walker');
    add_theme_support('soil-nice-search');
    add_theme_support('soil-relative-urls');


    add_filter('acf/settings/save_json', array($this, 'change_acf_path'));
    add_filter('acf/settings/load_json',  array($this, 'sync_acf_settings'));

		add_action('init', array($this, 'register_custom_post_types'));
		add_action('init', array($this, 'register_custom_taxonomies'));
		add_action('init', array($this, 'register_menus'));

    add_action('wp_enqueue_scripts',  array($this, 'add_theme_scripts_and_styles'));

    // $options = new OptionsPage('Allgemeine Theme Konfiguration', 'Theme Konfiguration', 'theme-options');
    // $function = $options->addOptionsPage();
    // var_dump($options);
  }

  public function get_version() {
    return $this->version;
  }

  public function register_menus() {
    register_nav_menus(
      array(
        'page-menu'     => __( 'Seiten Men&uuml;', 'robertholzer-theme' ),
        'category-menu'    => __( 'Kategorie Men&uuml;', 'robertholzer-theme' ),
        'gallery-menu'    => __( 'Gallerie Men&uuml;', 'robertholzer-theme' ),
        'teaching-menu'    => __( 'Uni Men&uuml;', 'robertholzer-theme' )
      )
    );
  }

  public function register_custom_post_types() {
    $repertoire = new CustomPostTypes('repertoire', 'Repertoire', 'Repertoire', 'dashicons-playlist-audio');
    $press = new CustomPostTypes('press', 'Presse Artikel', 'Presse Artikeln', 'dashicons-testimonial');
    $gallery = new CustomPostTypes('gallery', 'Gallerie', 'Gallerien', 'dashicons-format-gallery');
    $music = new CustomPostTypes('music', 'Album', 'Alben', 'dashicons-format-audio');
    $track = new CustomPostTypes('song', 'Track', 'Tracks', 'dashicons-controls-volumeon');
  }

  public function register_custom_taxonomies() {
    // $slug, $name, $namePlural, $hirarchy, $registerFor = array('post'), $i18nDomain = 'robertholzer-theme'
    $composer = new CustomTaxonomies('composer', 'Komponist', 'Komponisten', false, array('repertoire', 'music', 'song'));
    $songtype = new CustomTaxonomies('songtype', 'Filter', 'Filter', false, array('post', 'repertoire', 'music', 'song', 'gallery', 'press'));
    $gallery = new CustomTaxonomies('gallery', 'Kategorie', 'Kategorien', false, array('gallery'));
  }

  public function change_acf_path( $path ) {
    $path = get_template_directory() . self::$ACF_PATH;

    return $path;
  }

  public function sync_acf_settings( $path ) {
    unset($path[0]);

    $path[] = get_template_directory() . self::$ACF_PATH;

    return $path;
  }

  public function add_theme_scripts_and_styles() {
    wp_enqueue_script( 'polyfills', $this->assets('polyfills.bundle.js'), array(), $this->version, true );
    wp_enqueue_script( 'vendor', $this->assets('vendor.bundle.js'), array('polyfills'), $this->version, true );
    wp_enqueue_script( 'app', $this->assets('app.bundle.js'), array('vendor'), $this->version, true );

    if(WP_ENV === 'development') {
      wp_enqueue_script( 'inline', $this->assets('inline.bundle.js'), array('app'), $this->version, true );
      wp_enqueue_script( 'main', $this->assets('main.bundle.js'), array('inline'), $this->version, true );
    } else {
      wp_enqueue_style( 'inline', $this->assets('inline.css'), array(), $this->version);
      wp_enqueue_style( 'main', $this->assets('main.bundle.css'), array(), $this->version);
    }
  }

  protected function file_content($file) {
    return @file_get_contents($this->theme_path . $file);
  }

  private function assets($filename) {
    return $this->assets_path . $filename;
  }

  public function robertholzer_custom_header_setup() {
    $args = array(
      'default-image'         => $this->assets('default_header.jpg'), // Default Header Image to display
      'width'                 => 1442, // Header image width (in pixels)
      'flex-height'           => true,
      'height'                => 1026, // Header image height (in pixels)
    );

    add_theme_support( 'custom-header', $args );
  }
}
