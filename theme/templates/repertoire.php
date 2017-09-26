<?php
  /*
   * Template Name: Repertoire
   */

  $composers = get_terms('composer', array('orderby' => 'count', 'order' => 'DESC', 'hide_empty' => 0 ));

  $context = Timber::get_context();
  $context['items'] = array();
  $slide = 0;

  foreach($composers as $composer) {
    $args = array(
      'post_type' => 'repertoire',
      'posts_per_page'=> -1,
      'tax_query' => array(
        array(
          'taxonomy' => 'composer',
          'field' => 'slug',
          'terms' => array( $composer->slug ),
            'operator' => 'IN'
          )
      )
    );

    $works = Timber::get_posts($args);

    if($works) {

      $work = array(
        'name' => $composer->name,
        'slug' => $composer->description,
        'scrollTo' => $slide,
        'works' => $works
      );

      $context['composers'][] = $work;
      $slide++;
    }


  }

  $templates = array( 'repertoire.twig' );
  Timber::render( $templates, $context );

?>
