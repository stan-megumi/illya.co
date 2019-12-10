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
	cards: [
	    { header: ' ',
	      content: '',
	      src: "",
	    },
	    { header: '',
	      content: "",
	      src: "",
	    },
	    { header: '',
	      content: "",
	      src: "",
	    },
	    { header: '',
	      content: "",
	      src: ""
	    },
	    { header: '',
	      content: "",
	      src: "",
	    },
	    { header: '',
	      content: "",
	      src: ""
	    },
	    { header: '',
	      content: "",
	      src: ""
	    },
	    { header: '',
	      content: "",
	      src: ""
	    },
	    { header: '',
	      content: "",
	      src: ""
	    },
	    { header: '',
	      content: "",
	      src: ""
	    },
	    { header: '',
	      content: "",
	      src: ""
	    },
	    { header: '',
	      content: "",
	      src: ""
	    },
	]
    },
    created () {
	var card_id = getUrlKey('krr')
	if (!card_id)
	{
	    card_id = "26012010"
	}

	wiki = "https://wiki.kirafan.moe/static/assets/texture/charauiresource/charaillustfull/charaillust_full_";
	this.cards[0].src = wiki + card_id + ".org.webp"
	this.cards[1].src = wiki + "30022010" + ".org.webp"
	this.cards[2].src = wiki + "14012010" + ".org.webp"
	this.cards[3].src = wiki + "29012000" + ".org.webp"
	this.cards[4].src = wiki + "15082000" + ".org.webp"
	this.cards[5].src = wiki + "15002010" + ".org.webp"
	this.cards[6].src = wiki + "30012010" + ".org.webp"
	this.cards[7].src = wiki + "30032000" + ".org.webp"
	this.cards[8].src = wiki + "17002010" + ".org.webp"
	this.cards[9].src = wiki + "17012010" + ".org.webp"
	this.cards[10].src = wiki + "15012010" + ".org.webp"
	this.cards[11].src = wiki + "30042000" + ".org.webp"

	console.log (this.cards[0].src)
    },
});

