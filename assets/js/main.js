function toggleVisible(el) {
	if (el.style.display === 'none'){
		return el.style.display = 'block';
	} else {
		return el.style.display = 'none';
	}
};

function delayedCall(callback, timeout, params) {
	setTimeout(function() { callback.apply(null, params); }, timeout);
}

function fadeIn(el) {
	el.classList.add('fade_show');
	el.classList.remove('fade_hide');
}

function fadeOut(el) {
	el.classList.add('fade_hide');
	el.classList.remove('fade_show');
}

function toggleFade(el) {
	if (el.style.display === 'none'){
		el.style.display = 'block';
		delayedCall(fadeIn, 250, [el]);
	} else {
		fadeOut(el);
		delayedCall(function () {el.style.display = 'none';}, 300, []);
	}
}

var mobMenuButton = document.getElementById("mobMenuButton");
var mobMenuCloseButton = document.getElementById("mobMenuCloseButton");
var mobMenu = document.getElementById("mobMenu");

mobMenu.classList.add('fade_hide');
mobMenu.style.display = 'none';

mobMenuButton.addEventListener("click", function () {
	toggleFade(mobMenu);
});

mobMenuCloseButton.addEventListener("click", function () {
	toggleFade(mobMenu);
});


function getCurrentTheme(){
	return localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
}

function setTheme(theme){
	document.documentElement.setAttribute('data-theme', theme);
	localStorage.setItem('theme', theme);  
}


function switchTheme(e) {
	var theme = getCurrentTheme();
	if (theme == 'light') {
		setTheme('dark');
	}
	else {
		setTheme('light');
	}
}

document.addEventListener('DOMContentLoaded', function() {
	var themeSwitcher = document.querySelector('.mode_button');
	themeSwitcher.addEventListener('click', switchTheme, false);
}, false);

var theme = getCurrentTheme();

var userDefault = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (theme === null) {
	if(userDefault){
		setTheme('dark');
	}
	else{
		setTheme('light');
	}
}
else {
	document.documentElement.setAttribute('data-theme', theme);
}    