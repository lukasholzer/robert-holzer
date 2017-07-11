<?php
  /*
   * Template Name: Universität
   */

  $args = array(
    'post_type' => 'post',
    'posts_per_page'=> -1,
    'tax_query' => array(
		  array(
			  'taxonomy' => 'univercity',
        'field'    => 'slug',
        'terms'    => array( 'jury', 'teaching', 'mastercourses', 'operastudio' )
      )
    )
  );

  $context = Timber::get_context();
  $context['posts'] = Timber::get_posts($args);
  $context['curriculum'] = get_field('curriculum');
  $context['component'] = array(
    'name' => 'univercity',
    'title' => get_the_title()
  );

  $uni = array( 'components/univercity.twig' );

  Timber::render( $uni, $context );

  ?>
