<?php

class Setup extends TimberSite {
  protected $version;
  protected $assets;

	function __construct() {

    $this->version = wp_get_theme()->get( 'Version' );
    $this->assets = (WP_ENV == 'development')? 'http://localhost:4000/': get_template_directory_uri() . '/dist/';

		add_theme_support( 'post-formats' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );

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
  }

  function register_taxonomies() {
    // $slug, $name, $namePlural, $hirarchy, $registerFor = array('post'), $i18nDomain = 'robertholzer-theme'
    $composer = new CustomTaxonomies('composer', 'Komponist', 'Komponisten', false, array('repertoire'));
    $songtype = new CustomTaxonomies('songtype', 'Filter', 'Filter', false, array('post', 'repertoire', 'music', 'gallery', 'press'));
  }

  function add_theme_scripts() {

    wp_enqueue_script( 'polyfills', $this->assets . 'polyfills.bundle.js', array(), $this->version, true );
    wp_enqueue_script( 'vendor', $this->assets . 'vendor.bundle.js', array('polyfills'), $this->version, true );
    wp_enqueue_script( 'app', $this->assets . 'app.bundle.js', array('vendor'), $this->version, true );

    if(WP_ENV === 'development') {
      wp_enqueue_script( 'inline', $this->assets . 'inline.bundle.js', array('app'), $this->version, true );
      wp_enqueue_script( 'main', $this->assets . 'main.bundle.js', array('inline'), $this->version, true );
    } else {
      wp_enqueue_style( 'inline', $this->assets . 'inline.css', array(), $this->version);
      wp_enqueue_style( 'main', $this->assets . 'main.bundle.css', array(), $this->version);
    }
  }

	function add_to_context( $context ) {
		$context['version'] = $this->version;
		$context['env'] = WP_ENV;
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;

		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}
}
