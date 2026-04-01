/******/ (() => { // webpackBootstrap
var burgerBtn = document.getElementById('burgerBtn');
var mobileMenu = document.getElementById('mobileMenu');
var menuOverlay = document.getElementById('menuOverlay');
burgerBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('O_mobileMenuOpen');
  menuOverlay.classList.toggle('O_menuOverlayActive');
  document.body.style.overflow = mobileMenu.classList.contains('O_mobileMenuOpen') ? 'hidden' : '';
});
menuOverlay.addEventListener('click', function () {
  mobileMenu.classList.remove('O_mobileMenuOpen');
  menuOverlay.classList.remove('O_menuOverlayActive');
  document.body.style.overflow = '';
});
/******/ })()
;