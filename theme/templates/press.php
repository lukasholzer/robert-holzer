
<!-- section #Press -->
<section class="section">
  <h1 class="headline headline--section">Presse</h1>

 <?php

  $args = array(
    'post_type' => 'press',
    'per_page' => '-1'
  );

  $context = Timber::get_context();
  $context['press'] = Timber::get_posts($args);
  $context['component'] = 'press';

  $press = array( 'components/press.twig' );
?>
  <pre>
<? var_dump($context['press']); ?>

  </pre>
<?
  Timber::render( $press, $context );

  ?>
</section>
