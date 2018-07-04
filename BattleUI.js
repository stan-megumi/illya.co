function BattleUI(){

    this.canvasGrid={
	vec: [],           // grid position 
	rowNum: 4,
	colNum: 7
    }

    this.canvasJoin={
	0: {name: "RightJoin", index: [11,12,13]},
	1: {name: "RightBench", index: [18,19,20]},
	2: {name: "RightSupport", index:  [25,26,27]},
	3: {name: "LeftJoin", index: [9,8,7]},    // index is grid index
	4: {name: "LeftBench", index: [16,15,14]},
	5: {name: "LeftSupport", index: [23,22,21]},
	6: {name: "Center", index:  10}
    };

    this.para={
	size:    150,
	rowPadding: 5,
	columnPadding: 5,
	rowOffset: 5,
	columnOffset: 5,
    }

    this.data={
	gi:       [],
	card:     {imageData: [], width: 100, height: 100},
	skill:    {imageData: [], width: 400, height: 100},
	info:     {imageData: [], width: 800, height: 500},
	arrow:    {imageData: undefined, width: 100, height: 100, gi: -1},
	loadCount:  0,
	size:       0,
    };

    this.canvas=document.getElementById('canvasMain');
    this.context=this.canvas.getContext("2d");
    this.canvas.addEventListener('mousemove', ev_mousemove, false);
    this.canvas.addEventListener('click', ev_mouseclick, false);
    
    this.canvasInfo=document.getElementById('canvasInfo');
    this.contextInfo=this.canvasInfo.getContext("2d");
    this.qiOfInfo=-1;

    this.canvasOrder=document.getElementById('canvasOrder');
    this.contextOrder=this.canvasOrder.getContext("2d");

    this.canvasAction=document.getElementById('canvasAction');
    this.contextAction=this.canvasAction.getContext("2d");
    this.canvasAction.addEventListener('mousemove', ev_mousemoveAction, false);
    this.canvasAction.addEventListener('click', ev_mouseclickAction, false);
    
    // generate grid index position vec
    var i,j;
    var para=this.para;
    var width=this.canvas.width;
    var height=this.canvas.height;
    var size=para.size;
    var columnPadding=para.columnPadding;
    var rowPadding=para.rowPadding;
    var rowNum=this.canvasGrid.rowNum;
    var columnNum=this.canvasGrid.colNum;
    var columnOffset=para.columnOffset;
    var rowOffset=para.rowOffset;
    for (i=0;i<rowNum;i++){
	for (j=0;j<columnNum;j++){
	    this.canvasGrid.vec.push([columnOffset+(size+columnPadding)*j,
				 rowOffset+(size+rowPadding)*i]);
	}
    }
    
    // generate arrow
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    var arrow=new Image();
    var data=this.data.arrow;
    var context=this.context;
    arrow.src="img/custom/arrow.svg";
    arrow.onload = function() {
	context.drawImage(arrow, 0, 0, 
			       data.width,
			       data.height);	

	data.imageData=context.getImageData(0,0,
					    data.width,
					    data.height);	
    };
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
}

BattleUI.prototype.setCharacterArrow=function(qi){ // qi: questindex gi: gridIndex
    var gi=this.data.gi[qi]-7;
    var old=this.data.arrow.gi;
    if (old!=gi) {
	this.data.arrow.gi=gi;
	if (old>-1){
	    this.clearCharacterGrid(old);
	}
	if (gi>-1) {
	    var origin=this.canvasGrid.vec[gi];  // fetch position
	    this.context.putImageData(this.data.arrow.imageData,
				      origin[0],origin[1]); // push data  
	}
    }
}

BattleUI.prototype.setCharacterCard=function(qi,gi){ // qi: questindex gi: gridIndex
    this.data.gi[qi]=gi;
    var origin=this.canvasGrid.vec[gi];  // fetch position
    this.context.putImageData(this.data.card.imageData[qi],origin[0],origin[1]); // push data   
}

BattleUI.prototype.setCharacterInfo=function(qi){
    var context=this.contextInfo;
    var canvas=this.canvasInfo;
    if (this.qiOfInfo!=qi) {
	context.clearRect(0,0,canvas.width,canvas.height);
	context.putImageData(this.data.info.imageData[qi],0,0); // push data
    }
}


BattleUI.prototype.setCharacterAction=function(order,force=false){
    var qi=order.order.index[0];
    var context=this.contextAction;
    var canvas=this.canvasAction;
    if (this.qiOfInfo!=qi || force) {
	context.clearRect(0,0,canvas.width,canvas.height);
	context.putImageData(this.data.skill.imageData[qi],0,0); // push data
	context.putImageData(this.data.info.imageData[qi],0,this.data.skill.height); // push data
    }
    this.setCharacterArrow(qi);
}

BattleUI.prototype.setCharacterOrder=function(order){
    var o=order.order;
    var context=this.contextOrder;
    var canvas=this.canvasOrder;
    var index=o.index;
    var i=index.length;
    context.clearRect(0,0,canvas.width,canvas.height);
    while(i--){
	context.putImageData(this.data.card.imageData[index[i]],
			     10+i*this.data.card.width,
			     50); // push data
    }
}

BattleUI.prototype.updateCharacterInfo=function(c,order){
    var data=this.data;
    var x=this;
    var desc=c.desc;
    var skill=c.skill;
    var attr=c.attr;
    var context=x.contextInfo;
    var canvas=x.canvasInfo;
    var i,len;
    var cards=data.card;
    var skills=data.skill;
    var infos=data.info;

    var context=this.contextInfo;
    context.font = '20px serif';
    var bW=5;
    var bH=0;
    var inc=20;
    var w=data.info.width;
    var h=data.info.height;    
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
    context.fillText("Hp: {0} ({1}%)".format(attr.Hp,(attr.Hp*1.0/desc.Hp*100).toFixed(2)),  bW,bH+=inc);
    context.fillText("Atk/Def: {0}/{1}".format(attr.Atk,attr.Def),  bW,bH+=inc);
    context.fillText("Mgc/MDef: {0}/{1}".format(attr.Mgc,attr.MDef),  bW,bH+=inc);
    context.fillText("Spd/Luck: {0}/{1}".format(attr.Spd,attr.Luck),  bW,bH+=inc);
    var orderI=order.indexOfCharacterOfOrder(desc.QuestIndex);
    context.fillText("OrderValue: {0}/{1}".format(order.order.value[orderI],
						  orderI),  bW,bH+=inc);

    infos.imageData[c.desc.QuestIndex]=context.getImageData(0,0,w,h);
}

BattleUI.prototype.swapCharacter=function(qi1,qi2){ // qi: questindex gi: gridIndex
    var gi1=this.data.gi[qi1];
    var gi2=this.data.gi[qi2];
	
    this.setCharacterCard(qi1,gi2);
    this.setCharacterCard(qi2,gi1);
}

BattleUI.prototype.deadCharacter=function(qi){ // qi: questindex gi: gridIndex
    var gi=this.data.gi[qi];
    var data=this.data.card.imageData[qi].data;
    var len=data.length/4;
    for (var i=0;i<len;i++) {
	data[i*4]=0;
    }
    this.setCharacterCard(qi,gi);
}

BattleUI.prototype.clearCharacterGrid=function(gi){ // gi: gridIndex
    var para=this.para;
    var origin=this.canvasGrid.vec[gi];
    var x=origin[0];
    var y=origin[1];
    x-=para.rowPadding;
    y-=para.columnPadding;    
    this.context.clearRect(x,y,para.size+para.rowPadding,para.size+para.columnPadding);
}

BattleUI.prototype.joinOfQuestIndex=function(qi){
    var join=this.canvasJoin;
    var result={join: -1, num: -1};
    var gi=this.data.gi[qi];
    var i=6;

    while(i--){
	var index=join[i].index;
	var j=index.length;
	while (j--) {
	    if (index[j]==gi) {
		result.join=i;
		result.num=j;
		return result;
	    }
	}
    }
    return result;
}

BattleUI.prototype.qiOfGridIndex=function(gi){
    var result=-1;
    var i=this.data.size;
    var data=this.data;
    if (gi>-1) {
	while(i--){
	    if (data.gi[i]==gi){
		result=i;
		break;
	    }
	}
    }
    return result;
}

BattleUI.prototype.giOfPos=function(x,y){
    var vec=this.canvasGrid.vec;
    var i=vec.length;
    var para=this.para;

    while(i--){
	var origin=vec[i];
	if (x<=origin[0]+para.size && x>=origin[0]
	    &&
	    y<=origin[1]+para.size && y>=origin[1]){
	    return i;
	}	    
    }
    return -1;
}


BattleUI.prototype.qiOfPos=function(x,y){
    return this.qiOfGridIndex(this.giOfPos(x,y));
}



BattleUI.prototype.appendCharacterGUI=function(c,order){

    var data=this.data;
    var x=this;
    var desc=c.desc;
    var skill=c.skill;
    var attr=c.attr;
    var context=x.contextInfo;
    var canvas=x.canvasInfo;
    var i,len;
    var cards=data.card;
    var skills=data.skill;
    var infos=data.info;

    data.gi.push(-1);
    skills.imageData.push(undefined);
    cards.imageData.push(undefined);
    infos.imageData.push(undefined);

    // setting 

    var sources = {
	frame: "img/skill/frame.png",
	ult: "img/skill/sp.png",
    };

    len=skill.m_ID.length;
    for (i=1;i<len;i++){
	sources[i]="img/skill/"+skill.m_SkillType[i]+".png";
    }

    this.loadImages(sources, function(images) {
	var  w=data.skill.width;
	var  h=data.skill.height;
	context.clearRect(0,0,w,h);
	var xshift=6;
	var scale=0.88;
	context.drawImage(images.frame, 0, 0, w/len, h);
	context.drawImage(images.ult, xshift, xshift, w/len*scale, h*scale);

	var xpos=0;
	for (i=1;i<len;i++){
	    context.drawImage(images.frame, xpos+=w/len, 0, w/len, h);
	    context.drawImage(images[i], xpos+xshift, xshift, w/len*scale, h*scale);
	}
	
	skills.imageData[c.desc.QuestIndex]=context.getImageData(0,0,w,h);
	context.clearRect(0,0,w,h);
    });


    context.font = '20px serif';

    var bW=5;
    var bH=0;
    var inc=20;
    var w=data.info.width;
    var h=data.info.height;    
    context.clearRect(0,0,w,h);
    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
    context.fillText("Hp: {0} ({1}%)".format(attr.Hp,(attr.Hp*1.0/desc.Hp*100).toFixed(2)),  bW,bH+=inc);
    context.fillText("Atk/Def: {0}/{1}".format(attr.Atk,attr.Def),  bW,bH+=inc);
    context.fillText("Mgc/MDef: {0}/{1}".format(attr.Mgc,attr.MDef),  bW,bH+=inc);
    context.fillText("Spd/Luck: {0}/{1}".format(attr.Spd,attr.Luck),  bW,bH+=inc);
    var orderI=order.indexOfCharacterOfOrder(desc.QuestIndex);
    context.fillText("OrderValue: {0}/{1}".format(order.order.value[orderI],
						  orderI),  bW,bH+=inc);

    infos.imageData[c.desc.QuestIndex]=context.getImageData(0,0,w,h);
    context.clearRect(0,0,w,h);


    sources = {
	frame: "img/frame/"+desc.m_Rare+".png",
	body: desc.icon,
	element: "img/element/"+desc.m_Element+".png",
	class0: "img/class/"+desc.m_Class+".png"
    };

    this.loadImages(sources, function(images) {

	var w=data.card.width;
	var h=data.card.height;
	context.clearRect(0,0,w,h);
	var xshift=3;
	var scale=0.88;
	context.drawImage(images.body, 12, 6, w*scale, h*scale);
	context.drawImage(images.frame, 0, 0, w, h);
	context.drawImage(images.element, xshift, xshift, w/4, h/4);
	context.drawImage(images.class0, w-xshift-w/4, h-xshift-h/4, w/4, h/4);
	cards.imageData[c.desc.QuestIndex]=context.getImageData(0,0,w,h);
	context.clearRect(0,0,w,h);


	if (data.loadCount==data.size) { // if all characters' cards loaded
	    x.initCharacterJoin(order);
	    x.setCharacterAction(order);
	    x.setCharacterOrder(order);
	}
    },true,this.data);

    context.clearRect(0,0,canvas.width,canvas.height)

}

BattleUI.prototype.initCharacterCanvas=function(characters, order){

    var p,len;
    var i,j;
    var c;
    var join=order.join;
    len=characters.length;
    this.data.size=len;
    for (i=0;i<len;i++) {
	this.appendCharacterGUI(characters[i],order);
    }
}


BattleUI.prototype.initCharacterJoin=function(order){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    var p,i,j,len;
    var join=order.join;
    for (i=join.RJ;i<join.Count;i++) {
	p=join.p[i];
	len=p.index.length;
	for (j=0;j<len;j++){
	    this.setCharacterCard(p.index[j],this.canvasJoin[i].index[j])
	    log("{0} {1}: qi: {2} gi: {3}".format(i,j,p.index[j],this.canvasJoin[i].index[j]));
	}
    }
}


BattleUI.prototype.loadImages=function(sources, callback, b, data) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }

    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
	    if(++loadedImages >= numImages) {
		if (b)  {
		    data.loadCount++
		}
		callback(images);
	    }
        };
        images[src].src = sources[src];
    }
}
