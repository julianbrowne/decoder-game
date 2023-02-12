
import "../css/decoder.css"

import Crypter from "./crypter"
import DomTools from "./dom-tools"
import languageSettings from "./language-en-gb"
import answers from "./answers"

function decoderGame(){ 

	this.crypter = null;
	this.domTools = null;
	this.lang = null;

	this.answers = answers;
	this.chosenAnswer = null;

	this.cypherText = null;

	this.init = function() { 
		this.lang = languageSettings;
		this.crypter = new Crypter(this.lang);
		this.domTools = new DomTools();
	};

	function choosePlainText(answerList) { 
		const randomIndex = Math.round((answerList.length-1)*Math.random());
		return answerList[randomIndex];
	};

	this.start = function(targetElementSelector) { 

		this.init();
		this.domTools.clearElements();

		// pick plain text
		this.chosenAnswer = choosePlainText(answers);

		// cypher plain text
		this.cypherText = this.crypter.encrypt(this.chosenAnswer.text);

		// display encrypted text 
		this.domTools.displayCypherText(this.cypherText);

		// Build Guessing Panel
		this.domTools.buildGuessingPanel(this.cypherText, this.chosenAnswer.text, this.lang, targetElementSelector);

		// Add Control Panel
		this.domTools.addControlButtons(targetElementSelector);

	};

	this.testDecryption = function() { 

	    var newCypherText = this.cypherText.split('').slice();

		for(var guessCharIndex=0; guessCharIndex<this.lang.alphabet.length; guessCharIndex++) { 
			var guessedPlaintextCharacter = $("#guess-" + this.lang.alphabet[guessCharIndex]).val();
            if(guessedPlaintextCharacter !== "") { 
            	for(var j=0; j< this.cypherText.length; j++) { 
            		if(this.cypherText[j].toLowerCase() === this.lang.alphabet[guessCharIndex]) { 
            			newCypherText[j]=guessedPlaintextCharacter.toLowerCase();
            		}
            	}
            }
		}

	    this.domTools.displayCypherText(newCypherText.join(''));

	};

	this.showAnswer = function() { 

		// do this via decrypt rather than copy/paste the original
		var plaintext = this.crypter.decrypt(this.cypherText);
		this.domTools.displayPlainText(plaintext);

		// show the key in the guesses 
		var key = this.crypter.getKey();
		for(var i=0; i<this.lang.alphabet.length; i++) { 
			var cypherLetter = this.lang.alphabet[i].toLowerCase();
			var cypherIndex = key.indexOf(cypherLetter);
			var plainLetter = this.lang.alphabet[cypherIndex];
			this.domTools.setGuessToValue(cypherLetter, plainLetter);
		}

	};

};

export default new decoderGame();
