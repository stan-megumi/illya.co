// var characterDB=loadJSON("CharacterList.json");
// var skillDB=loadJSON("SkillList_PL.json");
// var skillContentDB=loadJSON("SkillContentList_PL.json");
// var customDB=loadJSON("CustomList.json");

function BattleQuest(){
    this.order=new BattleOrder();  
    this.ui=new BattleUI();        
    this.skillSolver=new BattleSkillSolver();
    this.ai=new BattleAI();       
    this.characters=[];

    this. control={
	substitute: {x: undefined, y: undefined, b: false},
	castSkill:      {x: undefined, y: undefined, b: false}
    }


}



BattleQuest.prototype.init=function(){
    this.initCharacters();
    this.ui.initCharacterCanvas(this.characters, this.order);
}

BattleQuest.prototype.initCharacters=function(){
    var customDBSize=customDB.length;
    var characterDBSize=characterDB.length;
    var array=[];
    var para=this.paraOfQuest;
    for (i=0;i<customDBSize;i++) {
	array.push(i);
	this.characters.push(new BattleCharacter(i,genRandomInt(0,characterDBSize-1),i));
    }
    var cIA=shuffle(array);
    var cICount=[3,3,1,3,3,1];
    var cValue=[];
    var i;
    for (i=0;i<customDBSize;i++){
	var c=this.characters[cIA[i]];
	cValue.push(c.desc.Spd);
    }
    this.order.initOfOrder(cIA,cICount,cValue);
}

BattleQuest.prototype.substitution=function(qi){
    var current=this.order.order.index[0];
    var b=this.control.substitute.b;
    var ui=this.ui;
    var c=this.characters[qi];
    var c1=this.characters[current];
    if (qi==current) {
	if (!b) {
	    log("{0} is clicked ! plz select one to substitute or click again to cancel".format(c.desc.name));
	}
	else {
	    log("selection cancelled");
	}
	this.control.substitute.b=!b;
    }
    else {
	if (b) {
	    var bb=confirm("Are you sure to substitute {0} for {1}".format(c.desc.name,c1.desc.name));
	    this.control.substitute.b=!b;
	    if (bb) {
		// substitute
		log("find join of "+current+" "+qi)
		var join1=this.ui.joinOfQuestIndex(current);
		var join2=this.ui.joinOfQuestIndex(qi);
		var order=this.order;

		if (order.substituteOfOrder(join1.join,join1.num,
					    join2.join,join2.num)){
		    ui.swapCharacter(qi,current);
		    alert("substitute {0} for {1} success".format(c.desc.name,c1.desc.name));
		    ui.setCharacterOrder(order);
		    ui.setCharacterAction(order,true);
		}
		else{
		    alert("illegal substitution");
		}
	    }
	}
    }
}




BattleQuest.prototype.castSkill=function(si){
    var current=this.order.order.index[0];
    var cast=this.control.castSkill;
    var b=cast.b;
    var ui=this.ui;
    var c=this.characters[current];

    if (!b) {
	log("skill {0} is clicked ! plz select one target to cast or click again to cancel".format(si));
	cast.x=si;
    }
    else {
	if (si!=cast.x) {
	    log("skill {0} is clicked ! plz select one target to cast or click again to cancel".format(si));
	    cast.x=si;
	    
	    
	}
	else {
	    log("skill target cancelled");
	}
    }
    cast.b=!b;
}    

BattleQuest.prototype.updateInfo=function(){
    var len=this.characters.length;
    var ui=this.ui;
    var c;
    while (len--) {
	c=this.characters[len];
	if (c.attr.Hp<=0) {
	    var candidate=this.order.processDeadOfOrder(len);
	    if (candidate>-1) {
		ui.swapCharacter(len,candidate);
	    }
		ui.deadCharacter(len);
	}
	this.ui.updateCharacterInfo(c,this.order);
    }
}


BattleQuest.prototype.castSkillTarget=function(qi){
    var current=this.order.order.index[0];
    var c=this.characters[qi];
    var c1=this.characters[current];
    var cast=this.control.castSkill;
    var ui=this.ui;
    cast.y=qi;
    this.skillSolver.solve(this.characters[current],this.characters[qi],qi,this.order);
    this.updateInfo();
    ui.setCharacterOrder(this.order);
    ui.setCharacterAction(this.order,true);
    cast.b=false;
}



x=new BattleQuest();
x.init();

function onClearOneTurn(){
    var r=Math.floor(Math.random()*100);
    x.clearOneTurnOfOrder(r);
    x.updateCharacterCanvasPanel();
}

function onSoftRefresh(){
    delete x;
    x=new BattleQuest();
    x.init();
}


function ev_mousemove(e) {
    var canvas=x.ui.canvas;
    var rect=canvas.getBoundingClientRect();
    var    xx = e.clientX - rect.left;
    var    yy = e.clientY - rect.top;
    var qi=x.ui.qiOfPos(xx,yy);
    if (qi>-1) {
	var c=x.characters[qi];
	x.ui.setCharacterInfo(qi);
    }
}

function ev_mouseclick(e) {
    var canvas=x.ui.canvas;
    var rect=canvas.getBoundingClientRect();
    var    xx = e.clientX - rect.left;
    var    yy = e.clientY - rect.top;
    var qi=x.ui.qiOfPos(xx,yy);

    if (qi>-1 ) {
	if (x.control.castSkill.b==false){
	    x.substitution(qi);
	}
	else {
	    x.castSkillTarget(qi);
	}
    }
}


function ev_mousemoveAction(e) {

}

function ev_mouseclickAction(e) {
    var canvas=x.ui.canvasAction;
    var rect=canvas.getBoundingClientRect();
    var    xx = e.clientX - rect.left;
    var    yy = e.clientY - rect.top;
    if (yy<x.ui.data.skill.height) {
	var si=Math.floor((xx)/130);
	if (si<4) {
	    x.control.substitute.b=false;
	    x.castSkill(si);
	}
    }

}
