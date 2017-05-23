
<!-- section #Music -->
<section class="section">
  <h1 class="headline headline--section">anhören</h1>

  <?php

  $args = array(
    'post_type' => 'music',
    'per_page' => '-1'
  );

  $context = Timber::get_context();
  $context['alben'] = Timber::get_posts($args);

  $album = array( 'components/album.twig' );
  $player = array( 'components/music-player.twig' );

  Timber::render( $album, $context );
  Timber::render( $player );

/*

$query = new WP_Query( $args ); ?>

<?php if ( $query->have_posts() ) : ?>

    <!-- pagination here -->

    <!-- the loop -->
    <?php while ( $query->have_posts() ) : $query->the_post(); ?>
        <h2><?php the_title(); ?></h2>
        <?php echo get_field('composer'); ?>

        <?php

        var_dump(get_field('playlist'));

        ?>
    <?php endwhile; ?>
    <!-- end of the loop -->

    <!-- pagination here -->

    <?php wp_reset_postdata(); ?>

<?php else : ?>
    <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
<?php endif; */?>
