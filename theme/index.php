<?php get_header(); ?>

<?php echo @file_get_contents(get_template_directory() . '/dist/icons/sprite.svg'); ?>

<?php get_template_part( 'templates/start-teaser' ); ?>

<main class="root">

    <?php get_template_part( 'templates/repertoire' ); ?>
    <?php get_template_part( 'templates/press' ); ?>
    <?php get_template_part( 'templates/music' ); ?>
    <?php get_template_part( 'templates/gallery' ); ?>

</main>

<?php get_template_part( 'templates/footer' ); ?>

<?php get_footer(); ?>
