<?php


  $context = Timber::get_context();
  // $context['footer'] = Timber::get_posts($args);

  $footer = array( 'components/footer.twig' );

  Timber::render( $footer, $context );
