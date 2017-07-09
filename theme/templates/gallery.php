<?php
  /*
   * Template Name: Gallerie
   */

  $args = array(
    'post_type' => 'gallery',
    'per_page' => '-1'
  );

  $context = Timber::get_context();
  $context['gallery'] = Timber::get_posts($args);
  $context['menu'] = get_terms('gallery');

  $gallery = array( 'components/gallery.twig' );

  Timber::render( $gallery, $context );

  ?>
