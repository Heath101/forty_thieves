A javascript implementation of the solitaire game **Forty Thieves**. If you do not know how to play Forty Thieves, check out the [rules](https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)).

This is still currently being developed.  Unfortunately there are several parts that are not fully factored out, and classes that have lots of responsibilities.  Still needs a lot of refactoring, and cleaning up.  Eventually I would like to turn this into an electron app, so the project is not really doing much in the way of responsive design or multiple browser support.

To run the app, clone the github repo

```shell
git clone git@github.com:Heath101/forty_thieves.git
cd forty_thieves
```
then install all the dependencies:

```shell
npm install
```

This project has also not been nicely and neatly packaged up yet, so to run:

```shell
npm run dev 
```


### Future Feature List ###

 - Keep score as you put cards into the foundation
 - A way to reload a particular deck/card layout
 - Rules for the game, inside the game
 - Better more cohesive design