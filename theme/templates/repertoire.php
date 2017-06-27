<?php
  /*
   * Template Name: Repertoire
   */

  $composers = get_terms('composer', array('orderby' => 'count', 'order' => 'DESC', 'hide_empty' => 0 ));

  $context = Timber::get_context();
  $context['items'] = array();

  foreach ( $composers as $composer ) {

    $args = array(
      'post_type' => 'repertoire',
      'tax_query' => array(
        array(
          'taxonomy' => 'composer',
          'field' => 'slug',
          'terms' => array( $composer->slug ),
            'operator' => 'IN'
          )
      )
    );


    $context['items'][] = array(
      'composer' => $composer->name,
      'repertoire' => Timber::get_posts($args)
    );

  }

  $templates = array( 'components/repertoire.twig' );
  Timber::render( $templates, $context );

?>
