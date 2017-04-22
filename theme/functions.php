<?php

require_once __DIR__ . '/vendor/autoload.php';

$timber = new \Timber\Timber();

if (class_exists('Timber')) {

  require_once __DIR__ . '/core/classes/Setup.class.php';
  require_once __DIR__ . '/core/classes/CustomPostTypes.class.php';
  require_once __DIR__ . '/core/classes/CustomTaxonomies.class.php';

  define('WP_ENV', 'development');


  Timber::$dirname = array('templates', 'views');

  new Setup();

}
