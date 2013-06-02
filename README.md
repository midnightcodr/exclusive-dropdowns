# About
We've seen this many times. Usually when a user registers for a new account on a website that requires a number of security questions to be set up, he/she will be provided with a few sets of questions to choose from, usually in the form of select drop-downs. Since no questions should be identical to each other, most of the time the drop down provides some basic logic to prevent users from picking the same questions (Using error message to inform user is lame). Since I became addicted to Backbone.js recently, I wanted to see how I could do that using Backbone, this demo is the product of a few hours waiting for my car being serviced in a VW customer waiting room on a Saturday morning (the original main.js, I rewrote app.coffee the next day).

# Notes
* While this feature will prevent user from picking the same questions on the front end, it doesn't mean server-end validation should be skipped. Always validate user input.
* If you add/remove model to the collection during runtime, the corresponding dropdown should re-render using the order specified by itemid, which is string formatted, which means if you have more than 9 questions, you should 0-padding the itemid.
* I am pretty sure there are other ways to implement this kind of feature. I am just show you how I solved the problem (using Backbone.js).

# Screenshot
![rendering demo](https://raw.github.com/midnightcodr/exclusive-dropdowns/master/screenshot.png)
