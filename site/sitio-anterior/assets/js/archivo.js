/* Extras for the archived copy of the old site. */
jQuery(function ($) {
	// Gallery: same photo viewer the old site used (NextGEN Gallery + Simple Lightbox)
	if ($.fn.simpleLightbox && $('.ngg-simplelightbox').length) {
		$('.ngg-simplelightbox').simpleLightbox({ history: false, animationSlide: false, animationSpeed: 100 });
	}

	// The old quote form sent an email from WordPress. This copy has no server code,
	// so the button opens WhatsApp with the same details instead.
	$('form.wpcf7-form').on('submit', function (e) {
		e.preventDefault();
		var f = this;
		var v = function (n) { return $.trim($(f).find('[name="' + n + '"]').val() || ''); };
		var msg = 'Hola, quisiera cotizar un evento en Las Secoyas.\n' +
			'Nombre: ' + v('your-name') + '\n' +
			'Email: ' + v('your-email') + '\n' +
			'Teléfono: ' + v('your-phone') + '\n' +
			'Fecha del evento: ' + v('your-date') + '\n' +
			'Comentario: ' + v('your-message');
		window.open('https://wa.me/56959415518?text=' + encodeURIComponent(msg), '_blank', 'noopener');
	});
});
