<?php

trait RepertoireRole {
  public function repertoire_role($roles) {
    $html = '';

    for ($i = 0, $max = count($roles); $i < $max; $i++) {

      $sep = ($i < ($max -1))? ', ' : '';

      if(gettype($roles[$i]['language']) === 'string') {
        $roles[$i]['language'] = array($roles[$i]['language']);
      }

      $role = $roles[$i]['role'];

      if($roles[$i]['language']) {
        $role .= sprintf('<i>%s%s</i>', join($roles[$i]['language'], ',&nbsp;'), $sep);
      } else {
        $role .= $sep;
      }

      $html .= $role;
    }

    return $html;
  }
}
