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


  Routes::map('api/v1/track/:id', function($params){
    $query = 'post_type=song&p='.$params['id'];
    Routes::load('core/api/Track.class.php', null, $query, 200);
  });

  Routes::map('api/v1/album/:id', function($params){
    $query = 'post_type=music&p='.$params['id'];
    Routes::load('core/api/Album.class.php', null, $query, 200);
  });



}
