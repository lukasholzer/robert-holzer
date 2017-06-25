<?php

trait RepertoireRole {
  public function repertoire_role($roles) {
    $html = '';

    for ($i = 0, $max = count($roles); $i < $max; $i++) {

      $sep = ($i < ($max -1))? ', ' : '';
      $role = $roles[$i]['role'];

      if($roles[$i]['language']) {
        $role .= sprintf('<i>%s%s</i>', $roles[$i]['language'], $sep);
      } else {
        $role .= $sep;
      }

      $html .= $role;
    }

    return $html;
  }
}
