<?php
  $category = get_the_terms( get_the_ID(), 'songtype');
  $cat = '';

  if ( $category && ! is_wp_error( $category ) ) :

    foreach ( $category as $term ) {
        $cat .= $term->slug;
    }

  endif;
?>

<figure class="repertoire__work" data-rep-cat="<?php echo $cat; ?>">
  <h2 class="repertoire__title"><?php the_title(); ?></h2>
  <figcaption class="repertoire__description">
      <?php

        $i = 0;
        $roles = '';
        if( have_rows('roles') ): while ( have_rows('roles') ) : the_row();

          $comma = ($i != 0)? ', ': '';
          $lang = get_sub_field('language');
          $language = (strlen($lang) > 1)? ' <i>('. $lang. ')</i>' : '';
          $i++;

          $roles .= $comma . get_sub_field('role') . $language;

        endwhile; endif;

      ?>

    <span class="repertoire__role"><?php echo $roles; ?></span>
    <span class="repertoire__text"><?php echo $composer; ?></span>
  </figcaption>
  <div class="repertoire__controlls">
    <button>Rezension</button>
    <button>Aufnahme</button>
  </div>
</figure>
