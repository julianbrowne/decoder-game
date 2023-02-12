
const { utils } = require('../src/js/utils');

test('calculate frequency of one letter in five', () => { 

	var freq = utils.calcFreqs('abcde', 'a')[0];
	expect(freq).toEqual(20);

});

test('calculate frequency of three letters in 10', () => { 

	var freqs = utils.calcFreqs('abcdefghij', 'bgz');

	expect(freqs[0]).toEqual(10);
	expect(freqs[1]).toEqual(10);
	expect(freqs[2]).toEqual(0);

});
