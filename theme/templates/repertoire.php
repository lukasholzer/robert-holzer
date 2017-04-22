
<!-- section #Repertoire -->
<section>
  <h1 class="headline">Repertoire</h1>

  <?php
    $composers = get_terms( 'composer' );

    foreach ( $composers as $composer ):

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

      $query = new WP_Query($args);

      if ( $query->have_posts() ) :

  ?>

  <div class="repertoire">
    <aside class="repertoire__composer"><h2><?php echo $composer->name; ?></h2></aside>

    <article class="repertoire__row">


      <?php while ( $query->have_posts() ) : $query->the_post(); ?>

        <?php set_query_var( 'composer', $composer->name ); ?>
        <?php get_template_part( 'templates/repertoire-work' ); ?>

      <?php endwhile; ?>

    </article>
  </div>
  <?php
    endif;

  endforeach;
  ?>
</section>


<?php

  $query = null;
  wp_reset_postdata();
?>
