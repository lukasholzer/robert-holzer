<?php

  $args = array(
    'post_type' => 'press',
    'per_page' => '-1'
  );

  $context = Timber::get_context();
  $context['press'] = Timber::get_posts($args);
  $context['component'] = 'press';

  $press = array( 'components/press.twig' );

  Timber::render( $press, $context );

  ?>
</section>
