<?php

class TimberSetup extends TimberSite {

  use RepertoireRole;
  use GetTaxonomy;
  use GetComposer;
  use GetGalleryTaxonomy;
  use GetSongType;

  protected $version;
  protected $assets;
  protected $theme_path;
  protected $theme_uri;
  public $wordpress;

	function __construct() {

    $this->wordpress = new WordpressSetup();
    $this->version = $this->wordpress->get_version();

		add_filter('timber_context', array($this, 'add_to_context'));
		add_filter('get_twig', array($this, 'add_to_twig'));

		parent::__construct();
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

  function grab_menu_items($menu_name){
    if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
      $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
      $menu_items = wp_get_nav_menu_items($menu->term_id);
      $theidlist = array();
        foreach ( (array) $menu_items as $key => $menu_item ) {
          $theidlist[] = $menu_item->object_id;
        }
      return $theidlist;
    } else {
        throw new Exception('menu: <b>'.$menu_name.'</b> not set or can\'t get locaction');
    }
  }

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('get_song_type', new Twig_SimpleFilter('get_song_type', array($this, 'get_song_type')));
		$twig->addFilter('get_gallery_taxonomy', new Twig_SimpleFilter('get_gallery_taxonomy', array($this, 'get_gallery_taxonomy')));
    $twig->addFilter('get_composer', new Twig_SimpleFilter('get_composer', array($this, 'get_composer')));
		$twig->addFilter('repertoire_role', new Twig_SimpleFilter('repertoire_role', array($this, 'repertoire_role')));
    $twig->addFunction(new Twig_SimpleFunction('get_header_image', array($this, 'get_header_image')));

    return $twig;

	}
}
