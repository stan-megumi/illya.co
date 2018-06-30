function BattleCharacterDOM(customDB, characterDB, skillDB, skillContentDB) {



}


BattleCharacterDOM.prototype.initCharacterCanvas=function(elementID,c){
    var desc=c.desc;
    var skill=c.skill;
    var attr=c.attr;
    var canvas=document.getElementById(elementID);
    var width=canvas.width;
    var height=canvas.height;
    var context=canvas.getContext("2d");
    var sources = {
	frame: "img/frame/"+desc.m_Rare+".png",
	body: desc.icon,
	element: "img/element/"+desc.m_Element+".png",
	class0: "img/class/"+desc.m_Class+".png"
    };

    loadImages(sources, function(images) {
	var xshift=3;
	var scale=0.88;
	var w=width/2;
	var h=height/2;

	context.drawImage(images.body, 6, 6, w*scale, h*scale);
	context.drawImage(images.frame, 0, 0, w, h);
	context.drawImage(images.element, xshift, xshift, h/4, h/4);
	context.drawImage(images.class0, h-xshift-h/4, h-xshift-h/4, h/4, h/4);
    });

    context.font="10px Georgia";

    var bW=width/2+5;
    var bH=0;
    var inc=10;
    context.fillText(desc.name+" ("+desc.m_Name+")",bW,bH+=inc);
    context.fillText("Hp: {0} ({1}%)".format(attr.Hp,(attr.Hp*1.0/desc.Hp*100).toFixed(2)),  bW,bH+=inc);
    context.fillText("Atk/Def: {0}/{1}".format(attr.Atk,attr.Def),  bW,bH+=inc);
    context.fillText("Mgc/MDef: {0}/{1}".format(attr.Mgc,attr.MDef),  bW,bH+=inc);
    context.fillText("Spd/Luck: {0}/{1}".format(attr.Spd,attr.Luck),  bW,bH+=inc);

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
	var w=0;
	var h=height/2;
	var xshift=6;
	var scale=0.88;
	context.drawImage(images.frame, w, h, width/len, height/2);
	context.drawImage(images.ult, xshift+w, xshift+h, width/len*scale, height/2*scale);

	for (i=1;i<len;i++){
	    context.drawImage(images.frame, w+=width/len, h, width/len, height/2);
	    context.drawImage(images[i], xshift+w, xshift+h, width/len*scale, height/2*scale);
	}
    });

    canvas.onclick=function(e) {
       /// adjust mouse position to be relative to canvas
        var rect = canvas.getBoundingClientRect();
        var    x = e.clientX - rect.left;
        var    y = e.clientY - rect.top;

        /// grab a pixel
        var data = context.getImageData(x, y, 1, 1).data;
	log("x: {0} y: {1}".format(x,y));
    }

    canvas.addEventListener('mousemove', ev_mousemove, false);

    function ev_mousemove (e) {
        var rect = canvas.getBoundingClientRect();
        var    x = e.clientX - rect.left;
        var    y = e.clientY - rect.top;

        /// grab a pixel
        var data = context.getImageData(x, y, 1, 1).data;
	log("x: {0} y: {1}".format(x,y));
    }
}
