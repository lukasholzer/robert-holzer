<?php

require 'API.class.php';

class Track extends API {

  public function __construct($id) {
    $this->id = $id;
    $this->type = 'Track';
  }
}

$album = new Track(get_the_ID());

$onAlbum = get_field('has_album') === 'album';
$albumId = get_field('album');

$cover = ($onAlbum && $albumId)? $album->get_image('cover', $albumId): $album->get_image('cover');
$albumTitle = ($onAlbum && $albumId)? get_the_title($albumId): false;
$composer = ($onAlbum && $albumId)? get_field('composer', $albumId): get_field('composer');
$category = ($onAlbum && $albumId)? get_field('category', $albumId): get_field('category');

$album->add_field('title', get_the_title());
$album->add_field('albumTitle', $albumTitle);
$album->add_field('cover', $cover);
$album->add_field('onAlbum', $onAlbum);
$album->add_field('album', $albumId);
$album->add_field('files', array(get_field('track')));
$album->add_field('composer', get_term( $composer, 'composer'));
$album->add_field('category', get_term( $category, 'songtype'));
$album->render();
