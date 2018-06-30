var characterDB=loadJSON("CharacterList.json");
var skillDB=loadJSON("SkillList_PL.json");
var skillContentDB=loadJSON("SkillContentList_PL.json");
var customDB=loadJSON("CustomList.json");
var canvas=document.getElementById('canvasDemo');
var context=canvas.getContext("2d");
    

function BattleQuest(){
    BattleOrder.call(this);
    this.characters=[];
    this.canvasMap=[];
    this.canvasMapRowNum=4;
    this.canvasMapColumnNum=7;
    this.canvasJoin={
	0: {name: "LeftJoin", index: [2,1,0]},
	1: {name: "LeftBench", index: [16,15,14]},
	2: {name: "LeftSupport", index: [25,26,27]},
	3: {name: "RightJoin", index: [4,5,6]},
	4: {name: "RightBench", index: [18,19,20]},
	5: {name: "RightSupport", index:  [23,22,21]},
	6: {name: "Center", index:  10}
    };
    this.paraOfQuest={
	size:    200,
	rowPadding: 5,
	columnPadding: 5,
	rowOffset: 5,
	columnOffset: 5,
    }
}

inherit(BattleQuest,BattleOrder);

BattleQuest.prototype.init=function(){
    var i,j;
    var para=this.paraOfQuest;
    var width=canvas.width;
    var height=canvas.height;
    var size=para.size;
    var columnPadding=para.columnPadding;
    var rowPadding=para.rowPadding;
    var rowNum=this.canvasMapRowNum;
    var columnNum=this.canvasMapColumnNum;
    var columnOffset=para.columnOffset;
    var rowOffset=para.rowOffset;
    for (i=0;i<rowNum;i++){
	for (j=0;j<columnNum;j++){
	    this.canvasMap.push([columnOffset+(size+columnPadding)*j,
				 rowOffset+(size+rowPadding)*i]);
	}
    }
    
    this.initCharacters();
    this.initCharacterCanvas();
}

BattleQuest.prototype.initCharacters=function(){
    var customDBSize=customDB.length;
    var characterDBSize=characterDB.length;
    var array=[];
    var para=this.paraOfQuest;
    for (i=0;i<customDBSize;i++) {
	array.push(i);
	this.characters.push(this.loadCharacter(i,genRandomInt(0,characterDBSize-1)));
    }
    var cIA=shuffle(array);
    var cICount=[3,3,1,3,3,1];
    var cValue=[];
    var i;
    for (i=0;i<customDBSize;i++){
	var c=this.characters[cIA[i]];
	cValue.push(c.desc.Spd);
    }
    this.initOfOrder(cIA,cICount,cValue);
}


BattleQuest.prototype.loadCharacter=function(index1,index2,ii){
    var cDB=characterDB[index2];
    var characterSkillID=cDB.m_CharaSkillID;
    var classSkillID=cDB.m_ClassSkillIDs;
    var ele=cDB.m_Element;
    var i,j,k;
    var len=classSkillID.length;
    var sIndex=[];
    var scIndex=[];

    sIndex.push(indexOfDB(characterSkillID,skillDB));
    scIndex.push(indexOfDB(characterSkillID,skillContentDB));

    for (i=0;i<len;i++){
	j=classSkillID[i];
	k=indexOfDB(j,skillDB);
	sIndex.push(k);
	k=indexOfDB(j,skillContentDB);
	scIndex.push(k);
    }
    var sDB=[];
    var sCDB=[];

    for (i=0;i<len+1;i++){
	sDB.push(skillDB[sIndex[i]]);
	sCDB.push(skillContentDB[scIndex[i]]);
    }
    sDB.push(skillDB[ele]);
    sCDB.push(skillContentDB[ele]);
    return new BattleCharacter(customDB[index1],cDB,sDB,sCDB,index1);
}

BattleQuest.prototype.initCharacterCanvas=function(){

    var join=this.join;
    var p,len;
    var i,j;
    var c;
    for (i=join.RJ;i<join.Count;i++) {
	p=join.p[i];
	len=p.index.length;
	for (j=0;j<len;j++){
	    c=this.characters[p.index[j]];
	    this.setCharacterCanvas(c,this.canvasJoin[i].index[j])
	}
    }

    canvas.onclick=function(e) {
	/// adjust mouse position to be relative to canvas
	/*
        var rect = canvas.getBoundingClientRect();
        var    x = e.clientX - rect.left;
        var    y = e.clientY - rect.top;

        /// grab a pixel
        var data = context.getImageData(x, y, 1, 1).data;
	log("x: {0} y: {1}".format(x,y));
        */
    }

    canvas.addEventListener('mousemove', ev_mousemove, false);

    function ev_mousemove (e) {

    }
}

BattleQuest.prototype.clearCharacterCanvas=function(ii){
    var para=this.paraOfQuest;
    var orgin=this.canvasMap[ii];
    var x=orgin[0];
    var y=orgin[1];
    x-=para.rowPadding;
    y-=para.columnPadding;    
    context.clearRect(x,y,para.size+para.rowPadding,para.size+para.columnPadding);
}


BattleQuest.prototype.setCharacterCanvas=function(c,ii){
    this.clearCharacterCanvas(ii);
    var orgin=this.canvasMap[ii];
    var para=this.paraOfQuest;
    var desc=c.desc;
    var skill=c.skill;
    var size=para.size;
    var attr=c.attr;

    var sources = {
	frame: "img/frame/"+desc.m_Rare+".png",
	body: desc.icon,
	element: "img/element/"+desc.m_Element+".png",
	class0: "img/class/"+desc.m_Class+".png"
    };

    loadImages(sources, function(images) {
	var xshift=3;
	var scale=0.88;
	var w=size/2;
	var h=size/2;
	context.drawImage(images.body, orgin[0]+6, orgin[1]+6, w*scale, h*scale);
	context.drawImage(images.frame, orgin[0], orgin[1], w, h);
	context.drawImage(images.element, orgin[0]+xshift, orgin[1]+xshift, h/4, h/4);
	context.drawImage(images.class0, orgin[0]+h-xshift-h/4, orgin[1]+h-xshift-h/4, h/4, h/4);
    });
    

    var sources = {
	frame: "img/skill/frame.png",
	ult: "img/skill/sp.png",
    };
    var i;
    var len=skill.m_ID.length;
    for (i=1;i<len;i++){
	sources[i]="img/skill/"+skill.m_SkillType[i]+".png";
    }
    
    loadImages(sources, function(images) {
	var w=orgin[0]+0;
	var h=orgin[1]+size/2;
	var xshift=6;
	var scale=0.88;
	context.drawImage(images.frame, w, h, size/len, size/2);
	context.drawImage(images.ult, xshift+w, xshift+h, size/len*scale, size/2*scale);

	for (i=1;i<len;i++){
	    context.drawImage(images.frame, w+=size/len, h, size/len, size/2);
	    context.drawImage(images[i], xshift+w, xshift+h, size/len*scale, size/2*scale);
	}
    });

    context.font="10px Georgia";
    
    var bW=orgin[0]+size/2+5;
    var bH=orgin[1];
    var inc=10;

    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
    context.fillText("Hp: {0} ({1}%)".format(attr.Hp,(attr.Hp*1.0/desc.Hp*100).toFixed(2)),  bW,bH+=inc);
    context.fillText("Atk/Def: {0}/{1}".format(attr.Atk,attr.Def),  bW,bH+=inc);
    context.fillText("Mgc/MDef: {0}/{1}".format(attr.Mgc,attr.MDef),  bW,bH+=inc);
    context.fillText("Spd/Luck: {0}/{1}".format(attr.Spd,attr.Luck),  bW,bH+=inc);
    var orderI=this.indexOfCharacterOfOrder(desc.Index);
    context.fillText("OrderValue: {0}/{1}".format(this.order.value[orderI],
						  orderI),  bW,bH+=inc);
}


BattleQuest.prototype.updateCharacterCanvasPanel=function(){
    // 
    var order=this.order;
    var cIndex=this.order.index[0];
    this.clearCharacterCanvas(this.canvasJoin[6].index+1); // some shadow
    this.setCharacterCanvas(this.characters[cIndex],this.canvasJoin[6].index);

    var join=this.join;
    var p,len;
    var i,j;
    var c;
    for (i=join.RJ;i<join.Count;i++) {
	p=join.p[i];
	len=p.index.length;
	for (j=0;j<len;j++){
	    c=this.characters[p.index[j]];
	    ii=this.canvasJoin[i].index[j];
	    var para=this.paraOfQuest;
	    var desc=c.desc;
	    var skill=c.skill;
	    var size=para.size;
	    var attr=c.attr;
	    var orgin=this.canvasMap[ii];
	    var x=orgin[0];
	    var y=orgin[1];
	    x-=para.rowPadding;
	    y-=para.columnPadding;    
	    context.clearRect(x+5+size/2,y,para.size/2+para.rowPadding,
			      para.size/2);

	    var bW=orgin[0]+size/2+5;
	    var bH=orgin[1];
	    var inc=10;

	    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
	    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
	    context.fillText("Hp: {0} ({1}%)".format(attr.Hp,(attr.Hp*1.0/desc.Hp*100).toFixed(2)),  bW,bH+=inc);
	    context.fillText("Atk/Def: {0}/{1}".format(attr.Atk,attr.Def),  bW,bH+=inc);
	    context.fillText("Mgc/MDef: {0}/{1}".format(attr.Mgc,attr.MDef),  bW,bH+=inc);
	    context.fillText("Spd/Luck: {0}/{1}".format(attr.Spd,attr.Luck),  bW,bH+=inc);
	    var orderI=this.indexOfCharacterOfOrder(desc.Index);
	    context.fillText("OrderValue: {0}/{1}".format(this.order.value[orderI],
							  orderI),  bW,bH+=inc);
	}
    }
}

x=new BattleQuest();
x.init();
//x.updateDOMPosition();
//x.test(0)
//x.testOfJoin();
//x.testOfOrder();

function onClearOneTurn(){
    var r=Math.floor(Math.random()*100);
    x.clearOneTurnOfOrder(r);
    x.updateCharacterCanvasPanel();
}


