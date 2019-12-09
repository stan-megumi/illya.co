

Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});


function getUrlKey(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}


const app = new Vue({
    el: '#app',
    data: {
	qqID:  "",
	card_src:  "",
	cards: [
	    { header: 'qq',
	      content: '',
	      src: "",
	    },
	    { header: 'krr',
	      content: '',
	      src: "",
	    },
	],
    },
    
    created() {
	this.qqID = getUrlKey('qq');
	this.src = "http://q1.qlogo.cn/g?b=qq&nk=" + this.qqID + "&s=640";

	var card_id = getUrlKey('krr')
	if (!card_id)
	{
	    card_id = "26012010"
	}

	
	this.card_src = "https://wiki.kirafan.moe/static/assets/texture/charauiresource/charaillustfull/charaillust_full_" + card_id + ".org.webp"
	
	this.cards[0].src = this.src;
	this.cards[1].src = this.card_src;

	var msg = getUrlKey('msg')
	if (!msg)
	{
	    msg = "让我康康你的发育"
	}

	var counter = 0;
	var loaded_origin = 0;
	var loaded_dick = 0;
	var loaded_left = 0;
	var loaded_right = 0;
	var loaded_center = 0;
	
	var canvas_dick  = document.getElementById("dick")
	var ctx_dick = canvas_dick.getContext('2d');
	var canvas_right  = document.getElementById("right")
	var ctx_right = canvas_right.getContext('2d');
	var canvas_center  = document.getElementById("center")
	var ctx_center = canvas_center.getContext('2d');
	var canvas_left  = document.getElementById("left")
	var ctx_left = canvas_left.getContext('2d');
	var canvas  = document.getElementById("origin")
	canvas.style.display = "none"

	
	var dick_src = "img/dick.png"    
	var left_src = "img/left.jpg"
	var right_src = "img/right.jpg"
	var center_src = "img/center.jpg"

	
	if (canvas.getContext) {   
	    var ctx = canvas.getContext('2d');
	    var imageObj = new Image();
	    imageObj.src = this.src;
	    imageObj.onload = function () {
		loaded_origin = 1;
	    }
	}

	var imageObj1 = new Image();
	imageObj1.src = dick_src
	imageObj1.onload = function () {
	    loaded_dick = 1;
	}

	var imageObj2 = new Image();
	imageObj2.src = left_src
	imageObj2.onload = function () {
	    loaded_left = 1;
	}

	var imageObj3 = new Image();
	imageObj3.src = center_src
	imageObj3.onload = function () {
	    loaded_center = 1;
	}

	var imageObj4 = new Image();
	imageObj4.src = right_src
	imageObj4.onload = function () {
	    loaded_right = 1;
	}
	
	
	var timer = setInterval( function () {
	    if (loaded_origin == 1) {
		ctx.drawImage (imageObj,0,0,320,320)
		ctx_dick.drawImage (canvas,0,0,320,320)	    
		ctx_right.drawImage (canvas,0,0,320,320)
		ctx_center.drawImage (canvas,0,0,320,320)
		loaded_origin = 2
	    }
	    
	    if (loaded_dick == 1 && loaded_origin == 2) {
		ctx_dick.drawImage (imageObj1,0,20,320,320)
		ctx_dick.font = '700 30px Raleway';
		ctx_dick.fillStyle = 'white';
		ctx_dick.fillText(msg,(320 - msg.length * 30)/2,300);
		counter += 1;
	    }

	    if (loaded_left == 1 && loaded_origin == 2) {
		ctx_left.drawImage (imageObj2,2,20,320,320)
		ctx_left.font = '700 30px Raleway';
		counter += 1;
	    }

	    if (loaded_center == 1 && loaded_origin == 2) {
		ctx_center.drawImage (imageObj3,0,20,320,320)
		ctx_center.font = '700 30px Raleway';
		counter += 1;
	    }

	    if (loaded_right == 1 && loaded_origin == 2) {
		ctx_right.drawImage (imageObj4,0,20,320,320)
		ctx_right.font = '700 30px Raleway';
		counter += 1;
	    }
	    

	    if (counter == 4) {
		clearInterval(timer);
	    }
	}, 10);
    },
    mounted(){
    }
});

