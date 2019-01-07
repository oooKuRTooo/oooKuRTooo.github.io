var buttonLeft = document.getElementById('q-left');
var buttonRight = document.getElementById('q-right');
var qText = document.getElementById('q-text');
var qAuthor = document.getElementById('q-author');
var current = 0;

var quotes = [
{quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.”',
author: 'Jon Doe'},
{quote: '“Two things are infinite: the universe and human stupidity; and I am not sure about the universe.”',
author: 'Albert Einstein'},
{quote: '“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”',
author: 'Jane Austen'}
];

function left() {
	if (current > 0) current -= 1;
	else current = quotes.length - 1;
	qText.innerHTML = quotes[current].quote;
	qAuthor.innerHTML = quotes[current].author;
}

function right() {
	if (current < quotes.length - 1) current += 1;
	else current = 0;
	qText.innerHTML = quotes[current].quote;
	qAuthor.innerHTML = quotes[current].author;
}

buttonLeft.onclick = left;
buttonRight.onclick = right;