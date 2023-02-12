# Decoder Game

Source code for the [frequency analysis game](https://www.julianbrowne.com/article/decoder-game/) from the [blog site](https://julianbrowne.com/).

You can try it on github [here](https://julianbrowne.github.io/decoder-game/test/)

## Details

Built using jQuery.

Bundled with Webpack.

Tested with Jest.

## How to use

Access the game either on the blog or on the test page.

When you press the 'go' button, the game will randomly selected a piece of text to encrypt using a substitution cypher. The text will be one or more opening paragraphs from a famous piece of writing in the English language.

You will then be presented with the encrypted/cypher text and a table. The cypher text will be in upper case, which is a convention in cryptography, and decrypted/plain text will be shown in lower case.

To aid you in your quest, underneath each letter in the table you will be given:

- The percentage frequency the encrypted letter appears in the cypher text (e.g. if the cypher text was `abcde` then 'a' appears 20% of the time)

- The percentage frequency the letter appears in normal/unencrypted language. So, if 'e' happened to be encrypted to 'z' then you'd see that 'e' appears in normal language about 10% of the time and, in a reasonably long piece of cypher text, 'z' appears about the same percentage (or if not 'z' is quite likely to be the most frequent character).

- You will also get the percentage each letter appears in the plain text. This is more for if you get stuck because, clearly, if 'y' appeared in the plain text 0.13% of the time, it's encrypted cypher partner is also going to appear 0.13% of the time.

And if it all gets too much you can choose the 'give' up option, which will fill the gaps in.

