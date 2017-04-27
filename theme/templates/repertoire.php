
<!-- section #Repertoire -->
<section class="section">
  <h1 class="headline headline--section">Repertoire</h1>

  <?php
    $composers = get_terms('composer', array('orderby' => 'count', 'order' => 'DESC', 'hide_empty' => 0 ));

    foreach ( $composers as $composer ) {

      $args = array(
        'post_type' => 'repertoire',
        'tax_query' => array(
          array(
            'taxonomy' => 'composer',
            'field' => 'slug',
            'terms' => array( $composer->slug ),
              'operator' => 'IN'
            )
        )
      );

      $context = Timber::get_context();
      $context['composer'] = $composer->name;
      $context['repertoire'] = Timber::get_posts($args);

      $templates = array( 'components/repertoire.twig' );

      Timber::render( $templates, $context );

   }
