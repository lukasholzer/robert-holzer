<?php

require_once __DIR__ . '/Wordpress/WPAdmin.class.php';

class WordpressSetup {
  protected $version;
  protected $assets_path;
  protected $theme_path;
  protected $theme_uri;
  protected $admin;
  protected $assets_manifest;

  private static $ACF_PATH = '/core/acf';

  function __construct() {
    $this->theme_path = get_template_directory() . '/dist/';
    $this->theme_uri = get_template_directory_uri() . '/dist/';
    $this->assets_manifest = (WP_ENV === 'development')? '' : $this->getHashes();

    $this->version = wp_get_theme()->get( 'Version' );
    $this->assets_path = (WP_ENV === 'development')? 'http://localhost:4000/': $this->theme_uri;


    $this->admin = new WPAdmin();

    add_theme_support( 'post-formats' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );

    add_action('init', array($this, 'register_custom_post_types'));
    add_action('init', array($this, 'register_custom_taxonomies'));
    add_action('init', array($this, 'register_menus'));

    add_action( 'after_setup_theme', array($this, 'robertholzer_custom_header_setup'));

    add_action('wp_enqueue_scripts',  array($this, 'add_theme_scripts_and_styles'));


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

    if(!is_admin()) {
      add_filter('script_loader_tag', array($this, 'async_defer_scripts'), 10, 3);
      add_filter('style_loader_tag', array($this, 'inline_styles'), 10, 4);
    }

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
    $uni = new CustomTaxonomies('univercity', 'Univercity', 'Univercities', false, array('post'));
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
    wp_enqueue_script( 'polyfills-defer', $this->assets('polyfills.js'), array(), $this->version, true );
    wp_enqueue_script( 'vendor-defer', $this->assets('vendor.js'), array('polyfills-defer'), $this->version, true );
    wp_enqueue_script( 'app-defer', $this->assets('app.js'), array('vendor-defer'), $this->version, true );

    // in development use .js files for HMR reloading styles
    if(WP_ENV === 'development') {
      wp_enqueue_script( 'inline', $this->assets('inline.js'), array('app-defer'), $this->version, true );
      wp_enqueue_script( 'main', $this->assets('main.js'), array('inline'), $this->version, true );
    } else {
      wp_enqueue_style( 'inline', $this->assets('inline.css'), array(), $this->version);
      wp_enqueue_style( 'main', $this->assets('main.css'), array(), $this->version);
    }
  }

  public function async_defer_scripts($tag, $handle, $src) {
    if(WP_ENV === 'development') {
      return $tag;
    }
    $param = '';
    if ( strpos($handle, '-async') !== false ) $param = 'async ';
    if ( strpos($handle, '-defer') !== false ) $param .= 'defer ';
    if ( $param ) {
        $tag = sprintf("<script %s type=\"text/javascript\" src=\"%s\"></script>\n", $param, $src);
    }
    return $tag;
  }

  public function inline_styles($html, $handle, $href, $media) {
    if(WP_ENV === 'development') {
      return $html;
    }
    if($handle === 'inline') {
      $inline = file_get_contents($this->theme_path . $this->assets_manifest['inline.css']);
      $html = sprintf("\n<style type=\"text/css\">\n%s\n</style>\n", $inline);
    }
    return $html;
  }

  private function getHashes() {

    $hashstring = file_get_contents( get_template_directory() . '/dist/build-manifest.json');
    $hashfile = json_decode($hashstring, true);

    return $hashfile;
  }

  private function assets($filename) {
    if(WP_ENV === 'development') {
      return $this->assets_path . $filename;
    } else {
      return $this->assets_path . $this->assets_manifest[$filename];
    }
  }

  public function get_menu_items($menu_name){
    if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
      $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
      $menu_items = wp_get_nav_menu_items($menu->term_id);
      $theidlist = array();
      foreach ( (array) $menu_items as $key => $menu_item ) {
        $theidlist[] = $menu_item->object_id;
      }
      return $theidlist;
    } else {
      throw new \Exception('Menu: <b>'.$menu_name.'</b> not set or can\'t get locaction');
    }
  }

  public function extract_component_name_from_template_file() {
    $template_file = get_page_template();
    $from = '/';
    $to = '.';
    $string = substr($template_file, strrpos($template_file, $from) + strlen($from));
    if (strstr ($string, $to, true) !== false) {
        $string = strstr($string, $to, true);
    }
    return $string;
  }

  public function robertholzer_custom_header_setup() {
    $args = array(
     // 'default-image'         => $this->assets('default_header.jpg'), // Default Header Image to display
      'width'                 => 1442, // Header image width (in pixels)
      'flex-height'           => true,
      'height'                => 1026, // Header image height (in pixels)
    );
    add_theme_support( 'custom-header', $args );
  }
}
