
import {utils} from "./utils"

const config = { 

	guessingTableId: "guessing-panel-table",
	guessingTableClass: "decoder-table",

	frequencyDataCellClass: "frequency",

	buttonPanelId: "decoder-buttons",
	controlButtonsClass: "decoder-button",

	cypherTextElementId: "cypher-text",
	plainTextElementId: "plain-text"
};

function DomTools() { 

	function setUpPlaceholder(elementId) { 
		if($("#"+elementId).length===0) { 
			$('<div>', { id: elementId, class: "" }).appendTo("body");
		}
		return $("#"+elementId);
	}

	var cypherTextElement = setUpPlaceholder(config.cypherTextElementId);
	var plainTextElement = setUpPlaceholder(config.plainTextElementId);

	this.clearElements = function() { 
		cypherTextElement.empty();
		plainTextElement.empty();
	};

	this.displayCypherText = function(text) { 
		cypherTextElement.html(text);
	};

	this.getDisplayedCypherText = function() { 
		return cypherTextElement.html();
	};

	this.displayPlainText = function(text) { 
		plainTextElement.html(text);
	};

	this.setGuessToValue = function(letter, value) { 
		$("#guess-"+letter).val(value);
	};

	this.buildGuessingPanel = function(cypherText, plainText, language, parentElementIdentifier) { 

		if($("#"+config.guessingTableId).length!==0)
			$("#"+config.guessingTableId).remove()

		var table = $("<table>")
			.attr("id", config.guessingTableId)
			.addClass(config.guessingTableClass);

		// encrypted letters

		const cypherAlphabet = language.alphabet.map(f => f.toUpperCase());
		var headRow = buildTableRow("Encrypted Letter", cypherAlphabet, language.alphabet, "encrypted-letter");
		var thead = $("<thead>");
		headRow.appendTo(thead);
		table.append(thead)

		var tbody = $("<tbody>");

		// letter freq in cypher

		const cypherLetterFrequency = utils.calcFreqs(cypherText, language.alphabet);
		tbody.append(buildTableRow("% Freq in Cypher Text", cypherLetterFrequency, language.alphabet, config.frequencyDataCellClass));

		// letter freq in language

		const languageLetterFrequency = language.frequencies.map(f => (f*100).toFixed(1));
		tbody.append(buildTableRow("% Freq in Language", languageLetterFrequency, language.alphabet, config.frequencyDataCellClass));

		// letter freq in plain text

		const plainLetterFrequency = utils.calcFreqs(plainText, language.alphabet);
		tbody.append(buildTableRow("% Freq in Message", plainLetterFrequency, language.alphabet, config.frequencyDataCellClass));

		// guessed letters

		const inputsForGuesses = language.alphabet.map((f, i) => $("<input>").attr("type", "text").attr("pattern", "[a-z]{1}").attr("id", "guess-" + f).val("").attr("maxlength", "1"));
		tbody.append(buildTableRow("Your Guess", inputsForGuesses, language.alphabet, "guessed-letter"));

		// add table to chosen parent element

		table.append(tbody);

		$(parentElementIdentifier).append(table);
	};

	function buildTableRow(label, data, columns, tdClass){ 

		var row = $("<tr>");
		var tdLabel = $("<th>").html(label);
		row.append(tdLabel);

		for(var i=0; i<columns.length; i++){ 
			var td = $("<td>").html(data[i]);
			td.addClass(tdClass);
			row.append(td);
		}

		return row;
	};

	this.addControlButtons = function (parentElementSelector) { 

		if($("."+config.controlButtonsClass).length!==0)
			$("."+config.controlButtonsClass).remove();

		var buttonGroup = $("<div>")
			.attr("id", config.buttonPanelId);

		var testDecryptionButton = $("<button>")
			.html("Test My Guesses")
			.addClass(config.controlButtonsClass)
			.attr("onclick", "decoderGame.testDecryption()");

		buttonGroup.append(testDecryptionButton);

		var giveUpButton = $("<button>")
			.html("I Give Up")
			.addClass(config.controlButtonsClass)
			.attr("onclick", "decoderGame.showAnswer()");

		buttonGroup.append(giveUpButton);

		$(parentElementSelector).append(buttonGroup);

	};

};

export default DomTools;
