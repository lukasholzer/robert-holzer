<?php

  $args = array(
    'post_type' => 'post',
    'posts_per_page' => '-1',
    'tax_query' => array(
          array(
              'taxonomy' => 'univercity',
        'field'    => 'slug',
        'terms'    => array( 'jury', 'teaching', 'mastercourses', 'operastudio' ),
        'operator' => 'NOT IN'
      )
    )
  );

  $context = Timber::get_context();
  $context['posts'] = Timber::get_posts($args);
  $context['component'] = 'news';
  $context['nav'] = array(
    'name' => 'navigation',
    'class' => 'navigation--main',
    'menu' => array(
      array('name' => 'biographie'),
      array('name' => 'repertoire'),
      array('name' => 'aufnahmen'),
      array('name' => 'presse'),
      array('name' => 'bilder'),
      array('name' => 'universität')
    )
  );

  $news = array( 'components/news.twig' );

  // Timber::render( $news, $context );

?>
