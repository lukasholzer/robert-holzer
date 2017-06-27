<?php
  /*
   * Template Name: Musik
   */

  $args = array(
    'post_type' => 'music',
    'per_page' => '-1'
  );

  $context = Timber::get_context();
  $context['alben'] = Timber::get_posts($args);

  $album = array( 'components/album.twig' );
  $player = array( 'components/music-player.twig' );

  Timber::render( $album, $context );
  Timber::render( $player );

?>
