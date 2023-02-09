
DecoderGame = function() { 

    this.encryptionKey = [];    // encrypt/decrypt key
    this.usedSlots = [];        // allocated keys
    this.letterFrequency = [];  // frequency calculation
    this.cleanCryptArray = [];  // master copy of encrypted text
    this.crypttextform = document.crypttextform;
    this.plaintextform = document.plaintextform;

    var decoder = this;

    this.init = function() { 

        console.log(decoder);
        return;

        this.encryptionKey = []
        this.usedSlots = [];

        $("#cypher-text").empty();

        function cleanElement(prefix) { 
            for(i=0; i < decoder.language.alphabet.length; i++) { 
                document.getElementById(prefix + "-" + this.alphabet[i]).value = '';
            }
        }

        ["answer", "guess", "frequency-plaintext", "frequency-cyphertext"].forEach(function(element) { 
            cleanElement(element);
        });
    };

    this.chooseText = function() { 
        randIndex = Math.round((randomChapters.length-1)*Math.random());
        this.plaintextform.plaintext.value = randomChapters[randIndex].toLowerCase();
    }

    this.populateTable = function(source, prefix, roundup) { 
        if(roundup === undefined) roundup = false;
        for(i=0; i < this.alphabet.length; i++) { 
            var target = document.getElementById(prefix + "-" + this.alphabet[i]);
            target.value = roundup ? (source[i] * 100).toFixed(1) : target.value = source[i];
        }
    };

    this.start = function() { 
        this.init();
        this.populateTable(this.freq_english, "freqce", true);
        this.chooseText();
        this.encrypt(this.plaintextform.plaintext.value);
    };

    this.encrypt = function(plaintext) { 
        this.makeKey();
    
        var encryptedText = "";
    
        for(i=0; i < plaintext.length; i++) { 
            if(this.alphabet.indexOf(plaintext.charAt(i)) != -1) { 
                var plainCharCode = this.alphabet.indexOf(plaintext.charAt(i));
                var cryptChar = this.encryptionKey[plainCharCode];
                encryptedText += cryptChar.toUpperCase();
            }
            else
                encryptedText += plaintext.charAt(i);
        }

        $("#cypher-text").html(encryptedText);
        if( $(".decoder .buttons").length > 0 ) $(".decoder .buttons").remove();
        if( $(".decoder .crypt-intro").length > 0 ) $(".decoder .crypt-intro").remove();
        $("#cypher-text").after( 
              '<div class="buttons">'
                + '<button onclick="decoder.testDecrypt()">Try My Guess</button>'
                + '<button onclick="decoder.showAnswer()">I give up</button>'
            + '</div>'
        );
        $("#cypher-text").before('<p class="crypt-intro">This is the cypher text that needs decrypting:</p>');

        this.cleanCryptArray = encryptedText.split("");
        
        this.calcFreqs(plaintext);
        this.populateTable(this.letterFrequency, "freqpt", true);
        
        this.calcFreqs(encryptedText);
        this.populateTable(this.letterFrequency, "freqct", true);
    };

    this.calcFreqs = function(text) { 

        for(i=0; i < this.alphabet.length; i++)
            this.letterFrequency[i]=0;

        for(i=0; i < text.length; i++) { 
            var theChar = text.charAt(i).toLowerCase();
            
            if(this.alphabet.indexOf(theChar) !== -1) { 
                var charCode = this.alphabet.indexOf(theChar);
                this.letterFrequency[charCode] = this.letterFrequency[charCode]+1;
            }
        }
                
        for(i=0; i < this.alphabet.length; i++) { 
            var letterPercentage = (this.letterFrequency[i] / text.length);
            this.letterFrequency[i] = letterPercentage.toFixed(7);
        }

    };

    this.makeKey = function() { 
        for(i=0; i < this.alphabet.length; i++) { 
            var randSlot = Math.round(25*Math.random());
            while(this.usedSlots.indexOf(randSlot)!=-1)
                randSlot = Math.round(25*Math.random());
            this.encryptionKey[randSlot] = this.alphabet[i];
            this.usedSlots[i] = randSlot;
        }
    };

    this.testDecrypt = function() { 
        if($("#cypher-text").html() === "") return;
        var t = $("#cypher-text").html().split("");
        for(i=0; i < this.alphabet.length; i++) { 
            var guessValue = $("#guess-" + this.alphabet[i]).val();
            if(guessValue !== "") { 
                for(j=0; j < t.length; j++) { 
                    if(this.cleanCryptArray[j].toLowerCase() === this.alphabet[i])
                        t[j]=guessValue.toLowerCase();
                }
            }
            else
                t[i]=this.cleanCryptArray[i];
        }
        $("#cypher-text").html(t.join(""));
    };

    this.showAnswer = function() { 
        if(this.encryptionKey.length === 0) return;
        var answer = [];
        for(i=0; i < this.alphabet.length; i++) { 
            var thisLetter = this.alphabet[i];
            var keyForThisLetter = this.encryptionKey.indexOf(thisLetter);
            answer[i] = this.alphabet[keyForThisLetter];
        }
        this.populateTable(answer, "answer");
    };

}