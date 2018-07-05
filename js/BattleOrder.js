function BattleOrder(){
    
    BattleJoin.call(this);

    this.order={
	index: [],
	turn:  [],
	value: [],
	count: 0,
	initValue: [],
	initCI: [],
    };

    this.paraOfOrder={
	Empty: -1,   // indicating no character on that order
	TurnMax: 6,  // limit infinite substitution
    };

    this.orderBackup={};
}

inherit(BattleOrder,BattleJoin);

BattleOrder.prototype.resetOfOrder = function(){
    var order=this.order;
    order.index=[];
    order.count=0;
    order.value=[];
    order.turn=[];
    order.initValue=[];
    order.initCI=[];
    this.OrderBackup={};
}

BattleOrder.prototype.backupOfOrder = function(){
    this.orderBackup=JSON.parse(JSON.stringify(this.order))
}

BattleOrder.prototype.reloadOfOrder = function(){
    this.order=JSON.parse(JSON.stringify(this.orderBackup));
}

BattleOrder.prototype.addCharacterOfOrder=function(cI,value) {

    var order=this.order;

    var i;
    var uninserted=true;
    var result=-1;
    if (order.count>0) {
	for (i=0;i<order.count;i++){
	    if (value<order.value[i]){
		order.index.splice(i,0,cI);
		order.value.splice(i,0,value);
		order.turn.splice(i,0,0);
		result=i;
		uninserted=false;
		break;
	    }
	}
    }
    if (uninserted){
	result=order.count;
	order.index.push(cI);
	order.value.push(value);
	order.turn.push(0);
    }

    order.count++;


    return result;
}


BattleOrder.prototype.initOfOrder = function(cIA, cICount, cValue){
    var order=this.order;
    var i,j,len;
    var join=this.join;
    var p;
    var para=this.paraOfOrder;

    var cIAR=[];//=[[1,2,3],[4,5],[6]];
    var cIAL=[];//=[[7,8,9],[],[]];

    var tmp;
    var sum=0;
    this.resetOfOrder();

    for (i=this.join.RJ;i<this.join.LJ;i++){
	tmp=[];
	for (j=0;j<cICount[i];j++){
	    if (i==this.join.RJ) {
		this.addCharacterOfOrder(cIA[sum],cValue[sum]);
	    }
	    tmp.push(cIA[sum]);
	    sum++;
	}
	cIAR.push(tmp);
    }

    for (i=this.join.LJ;i<this.join.Count;i++){
	tmp=[];

	for (j=0;j<cICount[i];j++){
	    if (i==this.join.LJ) {
		this.addCharacterOfOrder(cIA[sum],cValue[sum]);
	    }
	    tmp.push(cIA[sum]);
	    sum++;
	}
	cIAL.push(tmp);
    }

    this.initOfJoin(cIAR,cIAL);
    order.initValue=cValue;
    order.initCI=cIA;
    this.backupOfOrder();
}


BattleOrder.prototype.indexOfOrder = function(index){
    return this.order.index[index];
}

BattleOrder.prototype.indexOfCharacterOfOrder = function(cI){
    var i;
    var order=this.order;
    var index=order.index;
    for (i=0; i<order.count; i++){
	if (index[i]==cI) {return i; }
    }
    return -1;
}

BattleOrder.prototype.indexOfJoinOfOrder = function(orderEnum1,num1){
    var i;
    var order=this.order;
    var index=order.index;
    var cI=this.indexOfJoin(orderEnum1,num1);
    for (i=0; i<order.count; i++){
	if (index[i]==cI) {return i;}
    }
    return -1;
}

BattleOrder.prototype.indexOfOrder = function(index){
    return this.order.index[index];
}

BattleOrder.prototype.printOfOrder = function(){
    var order=this.order;
    log("index: "+order.index+" count: "+order.count);
    log("value: "+order.value);
    log("turn: "+order.turn);    
}

BattleOrder.prototype.initValueOfCharacterOfOrder = function(cI){
    var i;
    var order=this.order;
    var index=order.initCI;
    var target=-1;
    for (i=0; i<order.count; i++){
	if (index[i]==cI) {
	    target=i;
	    break; 
	}
    }
    if (target!=-1) {return order.initValue[i];}
    return -1;
}


BattleOrder.prototype.substituteOfOrder = function(orderEnum1, num1, orderEnum2, num2){
    var oI=this.indexOfJoinOfOrder(orderEnum1,num1); // orderIndex
    var candidate=this.substituteOfJoin(orderEnum1, num1, orderEnum2,num2);
    if (candidate>-1) {
	this.order.index[oI]=candidate;
	return true;
    }
    return false;
}

BattleOrder.prototype.addCardOfOrder=function(cI,value,turn) {
    var result=this.addCharacterOfOrder(cI,value);
    if (result>-1) {this.order.turn[result]=turn;}
}

BattleOrder.prototype.removeCharacterOfOrder=function(cI) {

    var order=this.order;
    var oI=this.indexOfCharacterOfOrder(cI); // orderIndex

    order.index.splice(oI,1);
    order.value.splice(oI,1);
    order.turn.splice(oI,1);

    order.count--;
}

BattleOrder.prototype.processDeadOfOrder = function(cI){
    var candidate=this.processDeadOfJoin(cI);
    this.removeCharacterOfOrder(cI);

    if (candidate>-1) {
	this.addCharacterOfOrder(candidate,
				 this.initValueOfCharacterOfOrder(candidate));
    }


    return candidate;
}

BattleOrder.prototype.clearOneTurnOfOrder = function(ov){
    // ov ordervalue

    var order=this.order;
    var para=this.paraOfOrder;
    var i,k;
    var oI;

    // fetch support time limit from clear join
    var result=this.clearOneTurnOfJoin();

    for (i=0;i<result[0].length;i++){
	// if there is turnmax of support
	oI=this.indexOfCharacterOfOrder(result[0][i]); // orderIndex	
	order.index[oI]=result[1][i];
    }

    var vv=(order.value[0]+ov);
    var ii=order.index[0];
    var tt=order.turn[0];
    this.removeCharacterOfOrder(ii);
    this.addCardOfOrder(ii,vv,tt);

    //
    var sub=order.value[0];
    var len=order.count;
    var removeVec=[];
    // card max
    for (i=0;i<len;i++){
	order.value[i]-=sub;
	k=order.turn[i];
	if (k>0) {
	    k++;
	}
	order.turn[i]=k;
	if (k==para.TurnMax) {
	    // or card limit
	    removeVec.push(order.index[i]);
	}
    }

    len=removeVec.length;
    for (i=0;i<len;i++){
	this.removeCharacterOfOrder(removeVec[i]);
    }

    return result;
}


BattleOrder.prototype.testOfOrder = function(){

    var order=this.order;
    var cIA=[1,2,3,4,5,6,7,8,9];
    var cICount=[3,2,1,3,0,0];
    var cValue=[80,70,93,98,89,89,100,200,300];
    var r;

    log("----init of order----");
    this.initOfOrder(cIA,cICount,cValue);
    this.printOfOrder();

    log("----substitute RB 0 for RJ 1----");    
    this.substituteOfOrder(this.join.RJ,1,this.join.RB,0);
    this.printOfOrder();

    log("----substitute support----");
    this.substituteOfOrder(this.join.RJ,1,this.join.RS,0);
    this.printOfOrder();

    log("---- character LJ 1 dead ----");
    this.processDeadOfOrder(7);
    this.printOfOrder();

    log("---- add card----");
    this.addCardOfOrder(89,100,3);
    this.printOfOrder();


    r=Math.floor(Math.random()*100);
    log("--------clear one round ------ with new order value "+r);
    this.clearOneTurnOfOrder(r);
    this.printOfOrder();

    r=Math.floor(Math.random()*100);
    log("--------clear one round ------ with new order value "+r);
    this.clearOneTurnOfOrder(r);
    this.printOfOrder();

    r=Math.floor(Math.random()*100);
    log("--------clear one round ------ with new order value "+r);
    this.clearOneTurnOfOrder(r);
    this.printOfOrder();

    r=Math.floor(Math.random()*100);
    log("--------clear one round ------ with new order value "+r);
    this.clearOneTurnOfOrder(r);
    this.printOfOrder();

    r=Math.floor(Math.random()*100);
    log("--------clear one round ------ with new order value "+r);
    this.clearOneTurnOfOrder(r);
    this.printOfOrder();

    r=Math.floor(Math.random()*100);
    log("--------clear one round ------ with new order value "+r);
    this.clearOneTurnOfOrder(r);
    this.printOfOrder();

}
