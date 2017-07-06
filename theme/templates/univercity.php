<?php
  /*
  Template Name: Universität
  */

  $args = array(
    'post_type' => 'post',
    'per_page' => '-1'
  );

  $context = Timber::get_context();
  $context['posts'] = Timber::get_posts($args);
  $context['component'] = 'univercity';

  $uni = array( 'components/univercity.twig' );

  Timber::render( $uni, $context );

  ?>
</section>
