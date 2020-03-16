const count = $('.count');
const total = $('.total');
const movieSelected = $('#movie');
let ticketPrice = +movieSelected[0].value;
const seats = $('.row .seat:not(occupied)');

//occupies random seats
function occupyRandom(num) {
	while (num) {
		var row = Math.floor(Math.random() * 6) + 1;
		var col = Math.floor(Math.random() * 8);
		seats[row * col].className = 'seat occupied';
		seats[row * col + 1].className = 'seat occupied';
		num -= 2;
	}
}

//Populate UI with saved data
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	if (selectedSeats != null && selectedSeats.length > 0) {
		selectedSeats.forEach(function(index) {
			seats[index].className = 'seat selected';
		});
		const movieIndex = localStorage.getItem('selectedMovieIndex');
		const moviePrice = localStorage.getItem('selectedMoviePrice');
		count[0].innerText = selectedSeats.length;
		total[0].innerText = selectedSeats.length * moviePrice;
		movieSelected[0].selectedIndex = movieIndex;
	}
}

//Save selected movie and price
function setMovieData(movieIndex = 0, moviePrice = 10) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Updates count of selected seats
function updateSelectedCount() {
	const selectedSeats = $('.row .seat.selected');
	count[0].innerText = selectedSeats.length;
	total[0].innerText = selectedSeats.length * ticketPrice;
	const seatsIndex = [ ...selectedSeats ].map(function(seat) {
		return [ ...seats ].indexOf(seat);
	});
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

//Movie select event
$(movieSelected).change(function(e) {
	ticketPrice = +e.target.value;
	updateSelectedCount();
	setMovieData(e.target.selectedIndex, e.target.value);
});

//Seat click event
$('.container').click(function(e) {
	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});

//Initial conditions
occupyRandom(20);
populateUI();
