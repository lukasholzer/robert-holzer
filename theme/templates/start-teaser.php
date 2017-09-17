<?php

$context = Timber::get_context();
$context['posts'] = Timber::get_posts();

$templates = array( 'components/start-teaser.twig' );

// Timber::render( $templates, $context );
