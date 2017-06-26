<?php

trait GetComposer {
  /**
   * Returns the name of the Composer by a given Tax ID
   *
   * @param   number    $id // ID of the Taxonomy
   * @return  string
   */
  public function get_composer($id) {
    return get_term( $id, $taxonomy = 'composer')->name;
	}
}
