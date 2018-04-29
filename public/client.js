var syr, xmr;
function send() {
	syr = $.ajax({
		type: 'POST',
		data: JSON.stringify({message: $('input').val()}),
		url:'message',
		success: function(data) {
			console.log(data)
		}	
	});
	$('input').val(' ');
};

subscribe();
function subscribe() {
	xmr = $.ajax({
		type: 'GET',
		url: '/subscribe',
		success: function(data) {
			$('<p></p>').html(data).appendTo($('.message'));
			$('.message').animate({scrollTop: 10000}, 0)
			subscribe();
		}
	});
};

$('button').on('click', function(e) {
	send();
});
$(document).on('keypress', function(e) {
	if (e.keyCode == 13) {
		send();
	}
});