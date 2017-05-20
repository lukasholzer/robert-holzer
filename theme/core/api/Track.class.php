<?php

  //api/v1/track/:id
  @header( 'Content-Type: application/json; charset=' . get_option( 'blog_charset' ) );

  if(get_the_ID() && is_numeric(get_the_ID())):

?>

{
  "id": <?php the_ID(); ?>,
  "title": "<?php the_title(); ?>",
  "track": "<?php the_field('track'); ?>",
  "album": <?php the_field('album') ?>,
  "cover": "<?php the_field('cover') ?>"
}

<?php

  else:

?>

{
  "error": "No Track with this ID is represent!"
}

<?php

  endif;

?>
