<?php get_header(); ?>

<?php echo @file_get_contents(get_template_directory() . '/dist/icons/sprite.svg'); ?>

<?php //get_template_part( 'templates/start-teaser' ); ?>

<main class="root">

    <?php

      // get Menu Items and query Pages according to page-menu
      $menuitems = $GLOBALS["theme"]->wordpress->get_menu_items('page-menu');
      $args = array(
        'post_type' => 'page',
        'orderby' => 'post__in',
        'posts_per_page' => '-1',
        'post__in' => $menuitems
      );

      $the_query = new WP_Query( $args );
      if ( $the_query->have_posts() ) :
        while ( $the_query->have_posts() ) : $the_query->the_post();

          // get Template with component name
          get_template_part( 'templates/' . get_field('component')  );

        endwhile;
      endif;
      wp_reset_postdata();
    ?>

    <?php /* get_template_part( 'templates/news' ); ?>
    <?php get_template_part( 'templates/repertoire' ); ?>
    <?php get_template_part( 'templates/press' ); ?>
    <?php get_template_part( 'templates/music' ); ?>
    <?php get_template_part( 'templates/gallery' );*/ ?>

</main>

<?php get_template_part( 'templates/footer' ); ?>

<?php get_footer(); ?>
