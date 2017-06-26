<?php

trait GetTaxonomy {

  /**
   * @param   number    $id // ID of the Post
   * @param   string    $taxonomy // Taxonomy Name
   */
  public function get_taxonomy($id, $taxonomy) {
    $category = get_the_terms( $id, $taxonomy);
    $cat = '';

    if ( $category && ! is_wp_error( $category ) ){

      foreach ( $category as $term ) {
        $cat .= $term->slug;
      }
    }

    return $cat;
  }
}
