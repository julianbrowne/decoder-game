
var utils = { 

	calcFreqs: function(text, alphabet) { 

		var letterFrequency = [];

        for(var i=0; i<alphabet.length; i++)
        	letterFrequency[i]=0;

        for(var i=0; i<text.length; i++) { 

            var c = text.charAt(i).toLowerCase();
            
            if(alphabet.indexOf(c) !== -1) { 
                var charCode = alphabet.indexOf(c);
                letterFrequency[charCode] = letterFrequency[charCode]+1;
            }
        }
                
        for(var i=0; i <alphabet.length; i++) { 
            letterFrequency[i] = parseFloat(((letterFrequency[i] / text.length) * 100).toFixed(1));
        }

        return letterFrequency;

    }

};

export { utils };
