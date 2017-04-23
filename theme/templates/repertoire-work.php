<?php
  $category = get_the_terms( get_the_ID(), 'songtype');
  $cat = '';

  if ( $category && ! is_wp_error( $category ) ){

    foreach ( $category as $term ) {
        $cat .= $term->slug;
    }
  }

  $context = Timber::get_context();
  $context['composer'] = $composer;
  $context['category'] = $cat;
  $context['post'] = new TimberPost();

  $templates = array( 'components/repertoire-work.twig' );

  Timber::render( $templates, $context );


?>
