<?php get_header(); ?>

<?php echo @file_get_contents(get_template_directory() . '/dist/icons/sprite.svg'); ?>

<?php get_template_part( 'templates/start-teaser' ); ?>

<main class="root">

    <?php

      get_template_part( 'templates/news' );

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
          $component = $GLOBALS["theme"]->wordpress->extract_component_name_from_template_file();
          get_template_part( 'templates/' . $component );

        endwhile;
      endif;
      wp_reset_postdata();
    ?>

</main>

<?php get_template_part( 'templates/footer' ); ?>

<?php get_footer(); ?>
