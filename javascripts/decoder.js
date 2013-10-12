
Decoder = function() {

    this.encryptionKey = [];    // encrypt/decrypt key
    this.usedSlots = [];        // allocated keys
    this.letterFrequency = [];  // frequency calculation
    this.cleanCryptArray = [];  // master copy of encrypted text
    this.crypttextform = document.crypttextform;
    this.plaintextform = document.plaintextform;
    this.alphabet = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z' ];
    this.freq_english = [ 0.0651738,0.0124248,0.0217339,0.0349835,0.1041442,0.0197881,0.0158610,0.0492888,0.0558094,0.0009033,0.0050529,0.0331490,0.0202124,0.0564513,0.0596302,0.0137645,0.0008606,0.0497563,0.0515760,0.0729357,0.0225134,0.0082903,0.0171272,0.0013692,0.0145984,0.0007836,0.1918182 ];

    this.cleanup = function() { 
        this.encryptionKey = []
        this.usedSlots = [];
        $("#cypher-text").empty();
        this.cleanElement("answer");
        this.cleanElement("guess");
        this.cleanElement("freqpt");
        this.cleanElement("freqct");
    };

    this.chooseText = function() { 
        randIndex = Math.round((randomChapters.length-1)*Math.random());
        this.plaintextform.plaintext.value = randomChapters[randIndex].toLowerCase();
    }

    this.cleanElement = function(prefix) { 
        for(i=0; i < this.alphabet.length; i++) { 
            document.getElementById(prefix + "-" + this.alphabet[i]).value = '';
        }
    };

    this.populateTable = function(source, prefix, roundup) { 
        if(roundup === undefined) roundup = false;
        for(i=0; i < this.alphabet.length; i++) { 
            var target = document.getElementById(prefix + "-" + this.alphabet[i]);
            target.value = roundup ? (source[i] * 100).toFixed(1) : target.value = source[i];
        }
    };

    this.start = function() { 
        this.cleanup();
        this.populateTable(this.freq_english, "freqce", true);
        this.chooseText();
        this.encrypt(this.plaintextform.plaintext.value);
    };

    this.encrypt = function(plaintext) { 
        this.cleanup();
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

/**
 *  No.. don't look.. this is the plain text chapters used as the encryption source.
 *
 *  Adding new chapters here will automatically add them to the game. Note the use
 *  of lower case, which a convention for plain text in cryptography.
**/

randomChapters = [];

// Dickens - Tale of Two Cities
randomChapters[0] = "it was the best of times, it was the worst of times; it ws the age of wisdom, it was the age of foolishness; it was the epoch of belief, it was the epoch of incredulity; it was the season of light, it was the season of darkness; it was the spring of hope, it was the winter of despair; we had everything before us, we had nothing before us; we were all going directly to heaven, we were all going the other way.";

// Jules Verne - Around the World in 80 Days
randomChapters[1] = "certainly an englishman, it was more doubtful whether phileas fogg was a londoner. he was never seen on 'change, nor at the bank, nor in the counting-rooms of the city; no ships ever came into london docks of which he was the owner; he had no public employment; he had never been entered at any of the inns of court, either at the temple, or lincoln's inn, or gray's inn; nor had his voice ever resounded in the court of chancery, or in the exchequer, or the queen's bench, or the ecclesiastical courts. he certainly was not a manufacturer; nor was he a merchant or a gentleman farmer. his name was strange to the scientific and learned societies, and he never was known to take part in the sage deliberations of the royal institution or the london institution, the artisan's association, or the institution of arts and sciences. he belonged, in fact, to none of the numerous societies which swarm in the english capital, from the harmonic to that of the entomologists, founded mainly for the purpose of abolishing pernicious insects.";

// Shakespeare - Hamlet
randomChapters[2] = "alas, poor yorick! i knew him, horatio: a fellow of infinite jest, of most excellent fancy: he hath borne me on his back a thousand times; and now, how abhorred in my imagination it is! my gorge rims at it. here hung those lips that i have kissed i know not how oft. where be your gibes now? your gambols? your songs? your flashes of merriment, that were wont to set the table on a roar? not one now, to mock your own grinning? quite chap-fallen? now get you to my lady's chamber, and tell her, let her paint an inch thick, to this favour she must come; make her laugh at that. prithee, horatio, tell me one thing.";

// US Declaration of Independence
randomChapters[3] = "we hold these truths to be self-evident, that all men are created equal, that they are endowed by their creator with certain unalienable rights, that among these are life, liberty and the pursuit of happiness. that to secure these rights, governments are instituted among men, deriving their just powers from the consent of the governed. that whenever any form of government becomes destructive to these ends, it is the right of the people to alter or to abolish it, and to institute new government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their safety and happiness. prudence, indeed, will dictate that governments long established should not be changed for light and transient causes; and accordingly all experience hath shown that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. but when a long train of abuses and usurpations, pursuing invariably the same object evinces a design to reduce them under absolute despotism, it is their right, it is their duty, to throw off such government, and to provide new guards for their future security. --such has been the patient sufferance of these colonies; and such is now the necessity which constrains them to alter their former systems of government. the history of the present king of great britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute tyranny over these states. to prove this, let facts be submitted to a candid world.";

// Melville Moby Dick
randomChapters[4] = "call me ismail. having little or no money in my purse, and nothing particular to interest me, i thought i would drive about a little. whenever i find myself growing grim about the mouth; whenever it is a damp, drizzly november in my soul; whenever i find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral i meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off - then, i account it high time to drive my taxi again. there now is your insular city of the manhattoes, belted round by wharves as indian isles by coral reefs - commerce surrounds it with her surf. right and left, the streets take you waterward. its extreme down-town is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. look at the crowds of water-gazers there.";

if (typeof jQuery === 'undefined') { 
    alert("JQuery not present");
}
else { 
    var decoder = new Decoder();
}
