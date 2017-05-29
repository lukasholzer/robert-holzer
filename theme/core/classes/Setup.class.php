<?php

class Setup extends TimberSite {
  protected $version;
  protected $assets;
  protected $theme_path;
  protected $theme_uri;

	function __construct() {

    $this->theme_path = get_template_directory() . '/dist/';
    $this->theme_uri = get_template_directory_uri() . '/dist/';

    $this->version = wp_get_theme()->get( 'Version' );
    $this->scripts = (WP_ENV == 'development')? 'http://localhost:3000/': $this->theme_uri;
    $this->assets = $this->theme_uri;

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

		add_filter('timber_context', array($this, 'add_to_context'));
		add_filter('get_twig', array($this, 'add_to_twig'));

		add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));
		add_action('init', array($this, 'register_menus'));

    add_action('wp_enqueue_scripts',  array($this, 'add_theme_scripts'));

    // $options = new OptionsPage('Allgemeine Theme Konfiguration', 'Theme Konfiguration', 'theme-options');
    // $function = $options->addOptionsPage();
    // var_dump($options);

		parent::__construct();
	}

  function register_menus() {
    register_nav_menus(
      array(
        'page-menu'     => __( 'Seiten Men&uuml;', 'robertholzer-theme' ),
        'category-menu'    => __( 'Kategorie Men&uuml;', 'robertholzer-theme' ),
        'teaching-menu'    => __( 'Uni Men&uuml;', 'robertholzer-theme' )
      )
    );
  }

  function register_post_types() {
    $repertoire = new CustomPostTypes('repertoire', 'Repertoire', 'Repertoire', 'dashicons-playlist-audio');
    $press = new CustomPostTypes('press', 'Presse Artikel', 'Presse Artikeln', 'dashicons-testimonial');
    $gallery = new CustomPostTypes('gallery', 'Gallerie', 'Gallerien', 'dashicons-format-gallery');
    $music = new CustomPostTypes('music', 'Album', 'Alben', 'dashicons-format-audio');
    $track = new CustomPostTypes('song', 'Track', 'Tracks', 'dashicons-controls-volumeon');
  }

  function register_taxonomies() {
    // $slug, $name, $namePlural, $hirarchy, $registerFor = array('post'), $i18nDomain = 'robertholzer-theme'
    $composer = new CustomTaxonomies('composer', 'Komponist', 'Komponisten', false, array('repertoire', 'music', 'song'));
    $songtype = new CustomTaxonomies('songtype', 'Filter', 'Filter', false, array('post', 'repertoire', 'music', 'song', 'gallery', 'press'));
  }

  function add_theme_scripts() {


    wp_enqueue_script( 'polyfills', $this->scripts('polyfills.bundle.js'), array(), $this->version, true );
    wp_enqueue_script( 'vendor', $this->scripts('vendor.bundle.js'), array('polyfills'), $this->version, true );
    wp_enqueue_script( 'app', $this->scripts('app.bundle.js'), array('vendor'), $this->version, true );

    wp_enqueue_style( 'inline', $this->assets('styles/inline.min.css'), array(), $this->version);
    wp_add_inline_style( 'inline', $this->file_content('styles/inline.min.css') );
    wp_enqueue_style( 'main', $this->assets('styles/main.min.css'), array(), $this->version);
  }

  function file_content($file) {
    return @file_get_contents($this->theme_path . $file);
  }

  function robertholzer_custom_header_setup() {
    $args = array(
      'default-image'         => $this->assets('default_header.jpg'), // Default Header Image to display
      'width'                 => 1442, // Header image width (in pixels)
      'flex-height'           => true,
      'height'                => 1026, // Header image height (in pixels)
    );

    add_theme_support( 'custom-header', $args );
  }

	function add_to_context( $context ) {
		$context['version'] = $this->version;
		$context['env'] = WP_ENV;
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;

		return $context;
	}

  function scripts($filename) {
    return $this->scripts . $filename;
  }

  function assets($filename) {
    return $this->assets . $filename;
  }

  function get_header_image() {
    $url = get_theme_mod( 'header_image', get_theme_support( 'custom-header', 'default-image' ) );

    if ( 'remove-header' == $url )
      return false;

    if ( is_random_header_image() )
      $url = get_random_header_image();

    $data = array(
      'url' => esc_url_raw(set_url_scheme($url)),
      'width' => get_theme_support( 'custom-header', 'width' ),
      'height' => get_theme_support( 'custom-header', 'height' )
    );

    return (object) wp_parse_args( $data);
  }

  /**
   * @param   number    $id // ID of the Post
   * @param   string    $taxonomy // Taxonomy Name
   */
  function get_taxonomy($id, $taxonomy) {
    $category = get_the_terms( $id, $taxonomy);
    $cat = '';

    if ( $category && ! is_wp_error( $category ) ){

      foreach ( $category as $term ) {
        $cat .= $term->slug;
      }
    }

    return $cat;
  }

  /**
   * @param   number    $id // ID of the Post
   */
	function get_song_type($id) {
    return $this->get_taxonomy($id, 'songtype');
	}

  /**
   * Returns the name of the Composer by a given Tax ID
   *
   * @param   number    $id // ID of the Taxonomy
   * @return  string
   */
  function get_composer($id) {
    return get_term( $id, $taxonomy = 'composer')->name;
	}

  function repertoire_role($roles) {
    $html = '';

    for ($i = 0, $max = count($roles); $i < $max; $i++) {
      $html .= ($i > 0)? ', ' : '';

      $html .= $roles[$i]['role'];
      if($roles[$i]['language']) {
        $html .= sprintf('<i>%s</i>', $roles[$i]['language']);
      }
    }

    return $html;
  }

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('get_song_type', new Twig_SimpleFilter('get_song_type', array($this, 'get_song_type')));
    $twig->addFilter('get_composer', new Twig_SimpleFilter('get_composer', array($this, 'get_composer')));
		$twig->addFilter('repertoire_role', new Twig_SimpleFilter('repertoire_role', array($this, 'repertoire_role')));
    $twig->addFunction(new Twig_SimpleFunction('get_header_image', array($this, 'get_header_image')));

    return $twig;

	}
}
