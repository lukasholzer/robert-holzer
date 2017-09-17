<?php
  /*
   * Template Name: Musik
   */

  $args = array(
    'post_type' => 'music',
    'posts_per_page' => '-1'
  );

  $tracks = array(
    'post_type' => 'song',
    'posts_per_page' => '-1'
  );

  $context = Timber::get_context();
  $context['alben'] = Timber::get_posts($args);
  $context['tracks'] = generate_album_slider(Timber::get_posts($tracks));

  $context['component'] = array(
    'title' => get_the_title()
  );

  $album = array( 'components/album.twig' );
  $player = array( 'components/music-player.twig' );

  // Timber::render( $album, $context );
  // Timber::render( $player );


  function generate_album_slider($trackArray) {

    $tracks = array();

    foreach($trackArray as $track) {

      $object = array( "ID" => $track->ID);

      $getID = ($track->has_album === 'album')? $track->album: $track->ID;
      $category = get_field('category', $getID);

      $object['title'] = $track->title;
      $object['category'] = get_term( get_field('category', $getID), 'songtype');
      $object['cover'] = get_field('cover', $getID);
      $object['composer'] = get_field('composer', $getID);

      array_push($tracks, $object);
    }

    return $tracks;
  }
?>
