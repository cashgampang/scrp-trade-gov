
function socialIcon(){
	$('#social-modal').modal();
	$('.copy-link-custom').val(window.location.href);
}
	$('.custom-copy-btn').click(function(){
		$(this).find('.custom-copy-icon').addClass('d-none');
		navigator.clipboard.writeText(window.location.href).then(function() {
					
	    }).catch(function(error) {
	        console.error('Error copying URL: ', error);
	    });
		
		$(this).find('.custom-copy-text').removeClass('d-none');
	setTimeout(function() {
		$('.custom-copy-text').addClass("d-none");
		$('.custom-copy-icon').removeClass("d-none");
	   }, 800);
	});
	
	
	$('.socialList a.custom-facebook').click(function(){
		var link = window.location.href;
	    var url = "https://www.facebook.com/sharer.php?u=" + link;
	    $('a.custom-facebook').attr('href',url);
	});
	$('.socialList a.custom-whatapp').click(function(){
		var link = window.location.href;
	    var url = "whatsapp://send?text=" + link;
	    $('a.custom-whatapp').attr('href',url);
	});
	$('.socialList a.custom-linkedin').click(function(){
		var link = window.location.href;
	    var url = "https://www.linkedin.com/shareArticle?mini=true&url=" + link;
	    $('a.custom-linkedin').attr('href',url);
	});
	$('.socialList a.custom-twitter').click(function(){
		var link = window.location.href;
	    var url = "https://twitter.com/intent/tweet?url=" + link;
	    $('a.custom-twitter').attr('href',url);
	});