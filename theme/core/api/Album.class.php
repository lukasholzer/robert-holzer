<?php

require 'API.class.php';

class Album extends API {

	public function __construct($id) {
    $this->id = $id;
    $this->type = 'Album';
  }
}


$album = new Album(get_the_ID());
$album->add_field('title', get_the_title());
$album->add_field('cover', $album->get_image('cover'));
$album->add_field('publisher', get_field('publisher'));
$album->add_field('publisher_url', get_field('publisher_url'));
$album->add_field('composer', get_field('composer'));
$album->add_field('category', get_field('category'));
$album->add_field('description', get_field('description'));
$album->render();
