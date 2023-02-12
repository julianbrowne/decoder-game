
function Crypter(lang) { 

	this.lang = lang;	// language settings (alphabet & letter frequencies)
	this.key = [];		// encryption/decryption "key" - maps each letter to swapped letter

	this.init = function() { 
		this.key = [];
	};

	this.getKey = function() { 
		return this.key;
	};

	this.encrypt = function(plainText) { 
		this.key = makeKey(this.lang.alphabet);
		return encryptPlainText(plainText, this.lang.alphabet, this.key);
	};

    this.decrypt = function(cypherText) { 

    	var plaintext = "";

    	if(this.key === []) return plaintext;

        for(var i=0; i<cypherText.length; i++) { 
			var cypherLetter = cypherText[i].toLowerCase();
			var cypherIndex = this.key.indexOf(cypherLetter);
			if(cypherIndex !== -1) { 
				var plaintextLetter = this.lang.alphabet[cypherIndex];
				plaintext += plaintextLetter;
			}
			else { 
				plaintext += cypherText[i]; // not encrypted, e.g. spaces & punctuation
			}
        }

        return plaintext;

    };

	function makeKey(alphabet) { 

		const keyLength = (alphabet.length-1);
		var usedSlots = [];
		var encryptionKey = [];

		for(var i=0; i<alphabet.length; i++) { 
			var randomSlot = Math.round(keyLength*Math.random());
			while(usedSlots.indexOf(randomSlot) != -1)
				randomSlot = Math.round(keyLength*Math.random());
			encryptionKey[randomSlot] = alphabet[i];
			usedSlots[i] = randomSlot;
		}
		return encryptionKey;
	};

	function encryptPlainText(plainText, alphabet, key) { 

		var encryptedText = "";
    
        for(var i=0; i<plainText.length; i++) { 

            if(alphabet.indexOf(plainText.charAt(i)) != -1) { 
                var plainCharCode = alphabet.indexOf(plainText.charAt(i));
                var cryptChar = key[plainCharCode];
                encryptedText += cryptChar.toUpperCase();
            }
            else {
                encryptedText += plainText.charAt(i);
            }
        }

        return encryptedText;
    };

};

export default Crypter;
