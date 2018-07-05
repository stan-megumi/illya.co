function BattleJoin(){

    this.join={
	RJ:   0,    // enums used as this.join.RJ
	RB:   1,
	RS:   2,
	LJ:   3,
	LB:   4,
	LS:   5,
	Count: 6,
	p: {    //properties
	    0: {name: "RightJoin", index: [], turn:[], count: 0, side:  SideEnum.Right},
	    1: {name: "RightBench", index: [], turn: [],count: 0, side: SideEnum.Right},
	    2: {name: "RightSupport", index: [], turn: [], count: 0, side: SideEnum.Right},
	    3: {name: "LeftJoin", index: [], turn: [], count: 0, side:  SideEnum.Left},
	    4: {name: "LeftBench", index: [], turn: [],count: 0, side:  SideEnum.Left},
	    5: {name: "LeftSupport", index:  [], turn: [], count: 0, side: SideEnum.Left},
	}
    };

    this.paraOfJoin={
	Empty:   -1,  // indicating no character on that join, "dead": real dead
	//  at the end of each turn, every non-zero character turn number++
	//   non-zero turn cannot be substituted

	TurnSubstitute: -2,  // normal substitution, ...->-2->-1->0->0->0->-2->-1->0->...
	TurnStrangerSupport: 3, // from 3-->6 then "dead", usually for stranger support
	TurnFriendSupport:   1, // from 1-->6 then "dead", usually for friend support
	TurnMax:             6, // max implies she is "dead": can never be substituted

    };

    this.joinBackup={};

    // methods
/*
    resetSideOfJoin(side);    // clear one side of the join data but not backUp
    resetOfJoin(side);        // clear the whole BattleJoin but not delete the instance
    backupOfJoin();           // backup this.join to this.joinBackup
    reloadOfJoin();           // reload this.join from this.joinBackup
    initSideOfJoin(side,cIAR,cIARCount);  //reset the side, init one side of join, backup
    initOfJoin(cIAR,cIAL,cIARCount,CIALCount); // reset, init, backup

    indexOfJoin(join, index);  
    printSideOfJoin(side);
    printOfJoin();

    // substitute the character on JoinEnum num1 to the bench num2
    substitute(joinEnum, num1, num2); 

    processDeadOfJoin(joinEnum, num); // process the dead character on position: JoinEnum, num
    checkSideOverOfJoin();            // check each side all dead status
    clearOneTurnOfJoin();            // decrease turn for one round

    testOfJoin();     // a test of 
*/
}

BattleJoin.prototype.resetSideOfJoin = function(side){
    var i,p;
    var join=this.join;
    var para=this.paraOfJoin;
    var start=side*3;
    for (i=start;i<start+3; i++){
	p=join.p[i];
	p.index=[];
	p.turn=[];
	p.count=0;
    }
}

BattleJoin.prototype.resetOfJoin = function(){
    this.resetSideOfJoin(SideEnum.Right);
    this.resetSideOfJoin(SideEnum.Left);
    this.JoinBackup={};
}

BattleJoin.prototype.backupOfJoin = function(){
    this.joinBackup=JSON.parse(JSON.stringify(this.join.p))
}

BattleJoin.prototype.reloadOfJoin = function(){
    this.join.p=JSON.parse(JSON.stringify(this.joinBackup));
}

BattleJoin.prototype.initSideOfJoin = function(side,cIA){
    // cIA: character Index Array for join [[join],[bench],[support]]
    this.resetSideOfJoin(side);

    var i,p;
    var join=this.join;
    var start=side*3;
    var vec;
    for (i=start;i<start+3; i++){
	vec=cIA[i-start];
	len=vec.length;
	p=join.p[i];
	for (j=0;j<len;j++){
	    p.index.push(vec[j]);
	    p.turn.push(0);
	}
	p.count=len;
	log("loading "+p.count+" characters into "+p.name+": "+p.index);
    }
    this.backupOfJoin();
}

BattleJoin.prototype.initOfJoin = function(cIAR, cIAL){
    this.initSideOfJoin(SideEnum.Right,cIAR);
    this.initSideOfJoin(SideEnum.Left,cIAL);
}


BattleJoin.prototype.indexOfJoin = function(join, index){
    return this.join.p[join].index[index];
}

BattleJoin.prototype.printSideOfJoin = function(side){
    var join=this.join;
    var start=side*3;

    var str;
    p=join.p[start];
    var len=p.count;
    var i;
    str=p.name+"["+p.count+"]: ";
    for (i=0;i<p.index.length;i++) {
	str+=p.index[i]+"("+p.turn[i]+") ";
    }

    str+="/ ";
    p=join.p[start+1];
    var len=p.count;
    var i;
    str+=p.name+"["+p.count+"]: ";
    for (i=0;i<p.index.length;i++) {
	str+=p.index[i]+"("+p.turn[i]+") ";
    }

    str+="/ ";
    p=join.p[start+2];
    var len=p.count;
    var i;
    str+=p.name+"["+p.count+"]: ";
    for (i=0;i<p.index.length;i++) {
	str+=p.index[i]+"("+p.turn[i]+") ";
    }
    log(str);
}

BattleJoin.prototype.printOfJoin = function(){
    this.printSideOfJoin(SideEnum.Right);
    this.printSideOfJoin(SideEnum.Left);
}

BattleJoin.prototype.substituteOfJoin = function(joinEnum1, num1, joinEnum2, num2){
    var join=this.join;
    var para=this.paraOfJoin;
    var p1=join.p[joinEnum1];
    var index1=p1.index[num1];
    var p2=join.p[joinEnum2];
    var index2=p2.index[num2];
    var result=-1;
    
    if (index2>para.Empty
	&& joinEnum1!=joinEnum2
	&& p2.turn[num2]==0
	&& p1.turn[num1]==0
	&& p1.side==p2.side)
    {
	// p.turn ==0 as the support cannot be substituted
	result=index2;
	p2.index[num2]=index1;
	p1.index[num1]=index2;
	p2.turn[num2]=para.TurnSubstitute;	
	if (joinEnum2==join.RS || joinEnum2==join.LS){
	    p1.turn[num1]=para.TurnFriendSupport;
	    p2.turn[num2]=para.TurnMax;	
	}
    }
    return result;
}

BattleJoin.prototype.processDeadOfJoin = function(cI){
    // cI character index


    var joinEnum, num;
    var join=this.join;
    var para=this.paraOfJoin;
    var p,p1,len,i,j;
    var b=true;
    var result=-1;

    var assert=false;
    for (i=join.RJ;i<join.Count;i+=3){
	p=join.p[i];
	len=p.count;
	for (j=0;j<len;j++){
	    if (p.index[j]==cI){
		joinEnum=i;
		num=j
		assert=true;
		break;
	    }
	}
	if (assert) {break;}
    }

    if (!assert) return -2;

    p=join.p[joinEnum];

    var ifSupport=(p.turn[num]>0);
    
    if (ifSupport) {
	p1=join.p[joinEnum+2];
	len=p1.index.length;
	for (i=0;i<len;i++){
	    if (p1.index[i]>para.Empty && p1.turn[i]==para.TurnMax) {
		// p.turn has to be zero because of the lock of support
		log("support dead")
		result=p1.index[i];
		p.index[num]=result;
		p.turn[num]=0;
		p1.index[i]=para.Empty;
		p1.count--;
		b=false;
		break;
	    }
	}
    }
    else  {
	p1=join.p[joinEnum+1];
	len=p1.index.length;

	for (i=0;i<len;i++){
	    if (p1.index[i]>para.Empty && p1.turn[i]==0) {
		result=p1.index[i];
		p.index[num]=result;
		p1.index[i]=para.Empty;
		p1.count--;
		b=false;
		break;
	    }
	}
    }
    // if no candidate

    if (b) {
	p=join.p[joinEnum];
	p.index[num]=para.Empty;
	p.count--;
    }
    
    return result;
}


BattleJoin.prototype.checkSideDeadOfJoin = function(){
    // return SideEnum.X is dead
    var result=SideEnum.None;
    var join=this.join;
    var p=join.p;

    if (p[join.RJ].count + p[join.RB].count==0) {
	result=SideEnum.Right;
    } 
    else if (p[join.LJ].count+p[join.LB].count==0){
	result=SideEnum.Left;
    }
    return result; 
}


BattleJoin.prototype.clearOneTurnOfJoin = function(){
    var i,j;
    var join=this.join;
    var p;
    var len;
    var turn,turnValue;
    var para=this.paraOfJoin;
    var vec=[join.RJ,join.RB,join.LJ,join.LB];
    var result1=[];
    var result2=[];
    i=len=vec.length;
    while (i--) {
	p=join.p[vec[i]];
	turn=p.turn;
	j=len=p.count;
	while (j--) {
	    turnValue=turn[j];
	    if (turnValue!=0) {turnValue++;}
	    turn[j]=turnValue;
	    if (turnValue==para.TurnMax) {
		result1.push(p.index[j]);
		// the only event is turn max of
		// support
		// assume there will be only
		// one support
	    }
	}
    }
    if (result1.length>0) {
	result2.push(this.processDeadOfJoin(result1[0]));
	// this should update the join
	// this should push >-1 value 
    }


    var result=[result1,result2];
    return result;
}

BattleJoin.prototype.testOfJoin = function(){
    var join=this.join;
    var p=join.p;
    log("init of join");
    var cIAR=[[1,2,3],[4,5],[6]];
    var cIAL=[[7,8,9],[],[]];

    this.initOfJoin(cIAR,cIAL);
    this.printOfJoin();

    log("----substitute RB 0 for RJ 1----");    
    this.substituteOfJoin(join.RJ,1,join.RB,0);
    this.printOfJoin();

    log("----substitute RS 0 for RJ 1----");    
    this.substituteOfJoin(join.RJ,1,join.RS,0);
    this.printOfJoin();

    log("----clear one turn----");
    this.clearOneTurnOfJoin();
    this.printOfJoin();

    log("----character LJ 1 dead----");
    this.processDeadOfJoin(8);
    this.printOfJoin();

    for (i=0;i<5;i++) {
    log("----clear one turn----");
    this.clearOneTurnOfJoin();
    this.printOfJoin();
    }
}

