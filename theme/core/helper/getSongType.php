<?php

  trait GetSongType {

    /**
    * @param   number    $id // ID of the Post
    */
    function get_song_type($id) {
      return $this->get_taxonomy($id, 'songtype');
    }
}
