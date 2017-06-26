<?php

  trait GetGalleryTaxonomy {

  /**
   * @param   number    $id // ID of the Post
   */
	function get_gallery_taxonomy($id) {

    return get_term( $id, $taxonomy = 'gallery')->slug;
	}
}
