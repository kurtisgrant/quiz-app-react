// Client facing scripts here

$(() => {

  // Navbar mobile menu functionality
  const $menuToggle = $('.navbar-burger');
  const $navMenu = $('.navbar-menu');
  let menuOpen = false;
  $menuToggle.click(() => {
    menuOpen = !menuOpen;
    $menuToggle
      .toggleClass('is-active', menuOpen)
      .attr('aria-expanded', menuOpen);
    $navMenu.toggleClass('is-active', menuOpen);

  });


});
