# Rules Reader
The project made as assignment so it has some strong simplifications to save my time and the checker's time. I tried to make it really short and easy to understand.

## Technologies
Made with react as front-end and express(node js) as back-end.

### Deployed link
https://klaimyt.tech

I hope the link above works because it's deployed on my local PC and something could go wrong. 

##
The most important part of the app is parsing the rules correctly, and unfortunately, the code doesn't do this properly. It has a logical mistake in RegExp, which duplicates rules with two or more digits after the dot (e.g., 113.10). This can be fixed, for example, by using separate regexp for each part of the table of contents.
