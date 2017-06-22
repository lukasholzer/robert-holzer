<?php

class Setup extends TimberSite {
  protected $version;
  protected $assets;
  protected $theme_path;
  protected $theme_uri;

	function __construct() {

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

  /**
   * @param   number    $id // ID of the Post
   */
	function get_song_type($id) {
    return $this->get_taxonomy($id, 'songtype');
	}

  /**
   * @param   number    $id // ID of the Post
   */
	function get_gallery_taxonomy($id) {

    return get_term( $id, $taxonomy = 'gallery')->slug;
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

      $sep = ($i < ($max -1))? ', ' : '';
      $role = $roles[$i]['role'];

      if($roles[$i]['language']) {
        $role .= sprintf('<i>%s%s</i>', $roles[$i]['language'], $sep);
      } else {
        $role .= $sep;
      }

      $html .= $role;
    }

    return $html;
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
