var age = 18;

//ternary operator
var canVote = age >= 18 ? "You can vote" : "You cannot vote";

//nested ternary operator
//nesting the else block further

var canVoteNested =
  age >= 18
    ? "You can vote"
    : age >= 16
    ? "You can vote in some countries"
    : "You cannot vote anywhere";
