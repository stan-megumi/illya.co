var orderBar=0x0;

console.log(orderBar);



var h1, h2, h3, h4, h5;
var e1, e2, e3;

// each has skill:
var s1, s2, s3, s4;
// each can generate:
var c1, c2, c3, c4;

// orderValue between [0, 512], thus: 9 bits per:

// hOrderValue for storing the orderValue for humans
// eOrderValue for storing the orderValue for enemys
// three cOrderValue for storing the orderValue for cards

// there are at most 10 cards and 10 chara for a round, which is a 5 bit indicator // at most 32 (cards and chara combined), indicator

//// data part

// two integer, 128 bit, sequence, 20*5; two 64 integer as bar
// ten places: recording each 10*4= 40;  one 64 integer as place

// skills: loaded 

// character:
//// panelData, n* integers, // multi occupation // mulite attribution
//// one integer indicating skills index, and an array indicating {cool down, usage}
//// status, one integer and an array  
//// buff, one integer and an array

//// methods part

//  set methods  // set the information of the data
//  get methods  // get the information of the data
//  clear methods // 

//   player part

//// ai (information integer)

//// information integer



// on each bar, at most 8 cards and 6 chara for a round, 14*4 which needs at most 56 bits integer
// on each bar, at most 8 cards and 6 chara for a round, 14*9 which needs at most 126 bits integer
//// 64 is of 6 chara and 1 card, the most usual case

// there are at most 8 positions, which is a 4 bit indicator including no position, death

// so we need:
// one 32 bit unsigned integer for indicating place,
// one 32 bit unsigned integer for indicating order sequence,
// two 64 bit unsigned integers for indicating order value;

// each round, we have two parts of fight: orderBar and stucts of players
// we combined it into three 64 bit unsigned integer for the total information of place and orderBar
// we need at most 16 structs for a round of battle
// each struct have a setting integer, if he has access to other information

// damage calc and passing, buff, and status, clear system
// processing the one player and its action

// world is a composition of place, orderValue, a series of information methods and clear methods
// players are of structs of attributes, actions choices and information rights 

// when player acting, he is given only one integer: information rights
// and the world is depicted by this information right

//// the struct of player:
//   hp, magic, ... , speed etc.
//   status intger and related coeff
//   buff integer and related coeff

// player
// skills: attack, with 3 each that is 8 , 15 with 




