# Rules Reader
The project made as assignment so it has some strong simplifications to save my time and the checker's time.

## Technologies
Made with react as front-end and express(node js) as back-end.

##
The most important part of the app is parsing the rules correctly, and unfortunately, the code doesn't do this properly. It has a logical mistake in RegExp, which duplicates rules with two or more digits after the dot (e.g., 113.10). This can be fixed, for example, by using separate regexp for each part of the table of contents.
