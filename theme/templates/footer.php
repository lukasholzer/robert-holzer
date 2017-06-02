<?php


  $context = Timber::get_context();
  // $context['footer'] = Timber::get_posts($args);

  $footer = array( 'components/footer.twig');
  $icons = array( 'components/icons.twig' );

  Timber::render( $icons, $context );
  Timber::render( $footer, $context );
