var buttonLeft = document.getElementById('q-left');
var buttonRight = document.getElementById('q-right');
var qText = document.getElementById('q-text');
var qAuthor = document.getElementById('q-author');
var buttonLeft2 = document.getElementById('q-left-2');
var buttonRight2 = document.getElementById('q-right-2');
var qText2 = document.getElementById('q-text-2');
var qAuthor2 = document.getElementById('q-author-2');
var qPhoto = document.getElementById('q-photo');
var current = 0;
var current2 = 0;

/*=====================
	 Quotes list
=====================*/

var quotes = [
{quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.”',
author: 'Jon Doe'},
{quote: '“Two things are infinite: the universe and human stupidity; and I am not sure about the universe.”',
author: 'Albert Einstein'},
{quote: '“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”',
author: 'Jane Austen'}
];

var quotes2 = [
{quote: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.”',
author: 'Jon Doe',
photo: 'img/quotes_2_photo_1.png'},
{quote: '“Two things are infinite: the universe and human stupidity; and I am not sure about the universe.”',
author: 'Albert Einstein',
photo: 'img/quotes_2_photo_2.png'},
{quote: '“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”',
author: 'Jane Austen',
photo: 'img/quotes_2_photo_3.png'}
];

/*=======================
	functions for button
========================*/

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

function left2() {
	if (current2 > 0) current2 -= 1;
	else current2 = quotes2.length - 1;
	qText2.innerHTML = quotes2[current2].quote;
	qAuthor2.innerHTML = quotes2[current2].author;
	qPhoto.src = quotes2[current2].photo;
}

function right2() {
	if (current2 < quotes2.length - 1) current2 += 1;
	else current2 = 0;
	qText2.innerHTML = quotes2[current2].quote;
	qAuthor2.innerHTML = quotes2[curren2].author;
	qPhoto.src = quotes2[current2].photo;
}


buttonLeft.onclick = left;
buttonRight.onclick = right;
buttonLeft2.onclick = left2;
buttonRight2.onclick = right2;