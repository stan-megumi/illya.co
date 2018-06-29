function log(str){
    // console log wrapper
    console.log(str);
}

var SideEnum={
    None: -1,
    Right: 0,
    Left:  1
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





