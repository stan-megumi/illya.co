var oss="https://illyapicts.oss-cn-shanghai.aliyuncs.com/"

var characterDB=loadJSON("CharacterList.json");
var skillDB=loadJSON("SkillList_PL.json");
var skillContentDB=loadJSON("SkillContentList_PL.json");
var customDB=loadJSON("CustomList.json");

function log(str){
    // console log wrapper
    console.log(str);
    var label=document.getElementById('Label');
    label.innerHTML = str;

}

function clearCanvas(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;
}

function genRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var SideEnum={
    None: -1,
    Right: 0,
    Left:  1
}

String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a


}

function indexOfDB(m_id,db){
    var i;
    var result=-1;
    var len=db.length;
    for (i=0;i<len;i++){
	if (db[i].m_ID==m_id){
	    result=i;
	    break;
	}
    }
    return result ;
}

function loadJSON(file){
    var request = new XMLHttpRequest();
    request.open("GET", oss+"json/"+file, false);
    request.send(null);
    return JSON.parse(request.responseText);
}


function inherit(subClass,superClass){

    // a clean inheritance that:
    // 1 no replication of superClass methods and members
    // 2 no wasted call of superClass constructor
    // 3 no chainning problem
    // for more info, plz refer to <Professional JavaScript for Web Deveplopers>

    function P(){}
    P.prototype=superClass.prototype;
    var prototype=new P();
    prototype.constructor=subClass;
    subClass.prototype=prototype;

    // a typical scenario for class creation and inheritance:
    /*
      function SuperClass(name){
      this.name=name;
      this.colors=["red","blue","green"];
      }

      SuperClass.prototype.sayName=function(){
      alert(this.name);
      }

      function SubClass(name,age){
      SuperClass.call(this,name);
      this.age=age;
      }

      inherit(SubClass,SuperClass);

      SubClass.prototype.sayAge=function(){
      alert(this.age);
      };
      var x=new SubType("ann",18);

      x.sayName();
      x.sayAge();
    */
};





