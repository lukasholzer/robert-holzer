<?php

class WPAdmin {

  use GetComposer;
  use GetSongType;
  use GetTaxonomy;

  function __construct() {
    add_filter( 'manage_repertoire_posts_columns', array($this, 'repertoire_columns') );
    add_action( 'manage_repertoire_posts_custom_column' , array($this, 'custom_repertoire_column'), 10, 2 );
    add_filter( 'manage_edit-repertoire_sortable_columns', array($this, 'repertoire_sortable_columns') );
  }

  function repertoire_columns( $columns ) {

    $columns['composer'] = __( 'Komponist', 'robertholzer-theme' );
    $columns['role'] = __( 'Rolle', 'robertholzer-theme' );
    $columns['genere'] = __( 'Genere', 'robertholzer-theme' );

    return $columns;
  }

  function custom_repertoire_column( $column, $post_id ) {
    switch ( $column ) {

      case 'composer' :
        echo $this->get_composer( get_field('composer', $post_id) );
        break;

      case 'genere' :
        $terms = get_the_term_list($post_id , 'songtype' , '' , ', ' , '' );
        echo is_string( $terms ) ? $terms : '—';
        break;

      case 'role' :
        $roles = get_field( 'roles', $post_id );
        $rollen = array();

        if(is_array($roles)) {
          foreach($roles as $role) {
            $lang = (is_array($role['language']))? implode(', ',$role['language']) : $role['language'];
            $lang = (strlen($lang) < 1)? '' : sprintf('(%s)', $lang);
            $string = sprintf('%s  <span style="font-size: 0.8em; font-style: italic;">%s</span>', $role['role'], $lang);
            // $string = $role['role'] . ' <span style="font-size: 0.8em; font-style: italic;">(' . $lang . ')</span>';
            array_push($rollen, $string);
          }
        }
        echo implode('<br>', $rollen);

        break;
    }
  }

  function repertoire_sortable_columns( $columns ) {
    $columns['composer'] = 'composer';
    $columns['genere'] = 'genere';

    return $columns;
  }

}
