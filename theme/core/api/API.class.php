<?php

abstract class API {

  protected $_id;
  protected $_type = 'Post';
  protected $_JSON = array('response' => array());

	public function __construct($id) {
    $this->_id = $id;
  }

  public function get_image($field_name = 'image', $id = null) {
    $_image = (!$id) ? get_field($field_name): get_field($field_name, $id);

    if ( !empty($_image) && is_array($_image)) {
      $image = array(
        "url" => $_image['url'],
        "alt"=> $_image['alt'],
        "description" => $_image['description']
      );
    } else {
      $image = array(
        "url" => "",
        "alt"=> "",
        "description" => ""
      );
    }

    return $image;
  }

  public function add_field($key, $value) {
    $temp = array($key => $value);

    $this->_JSON['response'] += [$key => $value];
  }

  public function render() {
    // Set correct header
    @header( 'Content-Type: application/json; charset=' . get_option( 'blog_charset' ) );
    $id = $this->id;

    if(!$id && !is_int($id)) {
      $this->_JSON = array("error" => "No ". $this->type ." with this ID is represent!");
    } else {
      $this->add_field('id', $id);
    }

    echo json_encode($this->_JSON);
  }
}
