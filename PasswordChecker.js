var caesarDescription = "The Caesar cipher, also known as a shift cipher, is one of the simplest forms of encryption. It is a substitution cipher where each letter in the original message (called the plaintext) is replaced with a letter corresponding to a certain number of letters up or down in the alphabet. In this way, a message that initially was quite readable, ends up in a form that can not be understood at a simple glance.";

var rsaDescription = "RSA was first described in 1977 by Ron Rivest, Adi Shamir and Leonard Adleman of the Massachusetts Institute of Technology. Public-key cryptography, also known as asymmetric cryptography, uses two different but mathematically linked keys, one public and one private. The public key can be shared with everyone, whereas the private key must be kept secret. In RSA cryptography, both the public and the private keys can encrypt a message; the opposite key from the one used to encrypt a message is used to decrypt it. This attribute is one reason why RSA has become the most widely used asymmetric algorithm: It provides a method of assuring the confidentiality, integrity, authenticity and non-reputability of electronic communications and data storage.";

var diffieHellmanDescription = "Diffie-Hellman key exchange, also called exponential key exchange, is a method of digital encryption that uses numbers raised to specific powers to produce decryption keys on the basis of components that are never directly transmitted, making the task of a would-be code breaker mathematically overwhelming.";

var bruteForceDescription = "Brute force is a method of password cracking that tries every possible combination of characters until a password is guessed correctly. A lot of logins prevent against this kind of attack (giving you only X number of login attempts, for example), but it is still a possibility regardless. This is not very fast, as brute force involves actually putting in the password and seeing it if was correct. This is the slowest of the password cracking attempts but is 100% successful given enough time.";

//This is the amount of time it takes for an *average* computer to complete 1 operation.
var timeFunctionConstant = .03149;

var alternateTimes = function(time) {
	if(time > 60*60*24*365*14000000000) return "Longer than the universe has been around"
	if(time > 60*60*24*365*700000000) return "The amount of time it would take to reach a neighboring galaxy";
	if(time > 60*60*24*365*100000) return "The amount of time it would take you to reach Alpha Centauri"
	if(time > 60*60*24*365*36) return "The amount of time it would take to leave the solar system (but not reach anything yet)";
	if(time > 60*60*24*365*10) return "The amount of time it's going to take me to pay off my student loans...";
	if(time > 60*60*24*365*4) return "The time it would take you to watch all of netflix."
	if(time > 60*60*24*30) return "The amount of time a person would spend in the international space station";
	if(time > 60*60*24*7) return "The amount of time it would take to execute a lunar mission";
	if(time > 60*60*24) return "The amount of time it would take to go on a long distance train ride";
	if(time > 60*60) return "The amount of time you spend binge watching shows on netflix";
	if(time > 60) return "The amount of time it would take you to go grab a bite to eat";
	if(time > 5) return "The time it would take you to walk to the kitchen";
	if(time > 1) return "The amount of time it takes your heart to beat once";
	if(time > .5) return "The amount of time it would take you to blink";
	if(time >= 0) return "The amount of time it would take a hummingbird to flap its wings"
}

var convertUnits = function(seconds) {
	if (seconds < 1) return seconds.toFixed(2) + " seconds"
	if (seconds < 60) return "about " + seconds.toFixed(2) + " seconds";
	if ((seconds /= 60) < 60) return "about " + seconds.toFixed(2) + " minutes";
	if ((seconds /= 60) < 24) return "about " + seconds.toFixed(2) + " hours";
	if ((seconds /= 24) < 7) return "about " + seconds.toFixed(2) + " days";
	if ((seconds /= 7) < 4) return "about " + seconds.toFixed(2) + " weeks";
	if ((seconds /= 4) < 12) return "about " + seconds.toFixed(2) + " months";
	if ((seconds /= 4) > 12) return "about " + seconds.toFixed(2) + " years";
}

var strengthValues = function(strength) {
	if(strength == 0) return "Your password is not strong at all.";
	if(strength == 1) return "Your password is fairly week; try using a combination of uppercase and lowercase letters";
	if(strength == 2) return "Your password is weak; try including some numbers";
	if(strength == 3) return "Your password is strong; try adding some symbols to make it even stronger";
	if(strength == 4) return "Your password is fairly strong; make sure your password is at least 10 characters long to get the most out of a password";

	return "Your password is very strong!";
}

var PasswordChecker = {
	fields: {
		dropDown:    document.getElementById('cipher-select'),
		password:    document.getElementById('password-input'),
		checkButton: document.getElementById('check-button'),
		crackTime:   document.getElementById('password-crack-blurb'),
		strength:    document.getElementById('password-strength-text'),

		tabs: {
			caesar: document.getElementById('caesar-cipher-info'),
			rsa: document.getElementById('rsa-info'),
			diffieHellman: document.getElementById('diffie-hellman-info'),
			bruteForce: document.getElementById('brute-force-info')
		}
	},

	ciphers: {
		caesar: {
			title: "Caesar Cipher",
			value: 0,
			description: caesarDescription,
			timeFunction: function(size) {return size * timeFunctionConstant}
		},

		rsa: {
			title: "RSA",
			value: 1,
			description: rsaDescription,
			timeFunction: function(size) {return Math.pow(2, (size * 8)) * timeFunctionConstant}
		},

		diffieHellman: {
			title: "Diffie-Hellman",
			value: 2,
			description: diffieHellmanDescription,
			timeFunction: function(size) {return Math.pow(2, (size * 8)) * timeFunctionConstant}
		},

		bruteForce: {
			title: "Brute Force",
			value: 3,
			description: bruteForceDescription,
			timeFunction: function(size) {return Math.pow(256, size) * (timeFunctionConstant + 1)}
		}
	},

	init: function() {
		this._populateDropDown();
		this._populateCipherTabs();

		//Attach the event listeners for the different actions users can do on the page
		this.fields.dropDown.addEventListener('change', this._changeCipherTab.bind(this));
		this.fields.checkButton.addEventListener('click', this._checkPasswordStrength.bind(this));
	},

	_populateOption: function(cipherNode) {
		var option = document.createElement('option');
		option.text = cipherNode.title;
		option.value = cipherNode.value;

		this.fields.dropDown.add(option);
	},

	_populateDropDown: function() {
		this._populateOption(this.ciphers.caesar);
		this._populateOption(this.ciphers.rsa);
		this._populateOption(this.ciphers.diffieHellman);
		this._populateOption(this.ciphers.bruteForce);
	},

	_populateTab: function(cipherNode, domNode) {
		var tabString = "<h2>" + cipherNode.title + "</h2>" + "<p>" + cipherNode.description + "</p>";

		domNode.innerHTML = tabString;
	},

	_populateCipherTabs: function() {
		this._populateTab(this.ciphers.caesar, this.fields.tabs.caesar);
		this._populateTab(this.ciphers.rsa, this.fields.tabs.rsa);	
		this._populateTab(this.ciphers.diffieHellman, this.fields.tabs.diffieHellman);		
		this._populateTab(this.ciphers.bruteForce, this.fields.tabs.bruteForce);	
	},

	_populateStrengthBar: function(strength) {
		if(strength < 0 || strength > 5) throw "Invalid Strength Value";

		for(var i = 1; i <= 5; i++) {
			var bar = document.getElementById('strength-' + i);
			bar.classList.remove('highlight')
			if(i <= strength) {
				bar.classList.add('highlight')
			}
		}
	},

	_changeCipherTab: function(e) {
		for (var tab in this.fields.tabs) {
			this.fields.tabs[tab].classList.add('hidden');
		}

		this.fields.tabs[Object.keys(this.fields.tabs)[e.target.value]].classList.remove('hidden');
		this.selectedCipher = e.target.value;
	},

	_checkPasswordStrength: function() {
		var password = this.fields.password.value;
		var passwordLength = password.length;
		var crackTime = this.ciphers[Object.keys(this.ciphers)[this.selectedCipher || 0]].timeFunction(passwordLength);
		var passwordString = "It would take " +
				     convertUnits(crackTime) + 
				     " to break your password via " +
				     this.ciphers[Object.keys(this.ciphers)[this.selectedCipher || 0]].title +
        			     " or " + 
				     alternateTimes(crackTime);

		this.fields.crackTime.innerHTML = passwordString;
		this._populateStrengthBar(this._checkPasswordTextStrength(password));
	},

	_checkPasswordTextStrength: function(text) {
		var strength = 0;
		var lower  = /[a-z]/;
		var upper  = /[A-Z]/;
		var number = /[0-9]/;
		var symbol = /[!@#$%^&*?]/;

		if(text.length >= 10) strength++;
		if(lower.test(text))  strength ++;
		if(upper.test(text))  strength ++;
		if(number.test(text)) strength++;
		if(symbol.test(text)) strength++;

		this.fields.strength.innerHTML = strengthValues(strength);

		return strength;
	}
};

PasswordChecker.init();
