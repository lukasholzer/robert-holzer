<?php
  /*
   * Template Name: Biographie
   */



  $context = Timber::get_context();
  $context['post'] = new Timber\Post();

  $context['component'] = array(
    'title' => get_the_title()
  );

  $template = array( 'components/biography.twig' );

  Timber::render( $template, $context );
?>
