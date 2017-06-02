<?php

require 'API.class.php';

class Track extends API {

  public function __construct($id) {
    $this->id = $id;
    $this->type = 'Track';
  }
}


$album = new Track(get_the_ID());
$album->add_field('title', get_the_title());
$album->add_field('cover', $album->get_image('cover'));
$album->add_field('onAlbum', get_field('has_album') === 'album');
$album->add_field('album', get_field('album'));
$album->add_field('files', array(get_field('track')));
$album->add_field('composer', get_field('composer'));
$album->add_field('category', get_field('category'));
$album->render();
