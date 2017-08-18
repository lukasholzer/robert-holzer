<?php

trait GetComposer {
  /**
   * Returns the name of the Composer by a given Tax ID
   *
   * @param   number    $id // ID of the Taxonomy
   * @return  string
   */
  public function get_composer($id) {

    if(gettype($id) === 'string' || gettype($id) === 'integer') {
      return get_term( $id, $taxonomy = 'composer')->name;
    }

    if(gettype($id) === 'array') {
      $arr = array();
      for($i = 0, $max = count($id); $i < $max; $i++) {
        $term = get_term( $id[$i], $taxonomy = 'composer')->name;
        array_push($arr, $term);
      }

      return join($arr, ', ');
    }

    return '';
    }
}
