function BattleRound(){
    BattleOrder.call(this);
}

inherit(BattleRound,BattleOrder);

BattleRound.prototype.init=function(cIAR,cIAL,cValue){
    this.initOfOrder(cIAR,cIAL,cValue);
}


x=new BattleRound();
x.testOfJoin();
x.testOfOrder();

