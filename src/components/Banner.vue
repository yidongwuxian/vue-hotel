<template>
<div id="iswiper">	
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide class="swiper-slide" v-for="str in listImg" :key="str.id" :style="{ backgroundImage: 'url(' + str.url + ')' }"></swiper-slide>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide class="swiper-slide" v-for="str in listImg" :key="str.id"  :style="{ backgroundImage: 'url(' + str.url + ')' }"></swiper-slide>
      </swiper>
</div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'; 
import 'swiper/dist/css/swiper.min.css'; 
export default {
  props: ['listImg'],	
  data(){
  	return{
  		swiperOptionTop: {
          notNextTick: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10
        },
        swiperOptionThumbs: {
          notNextTick: true,
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        }
  	}
  },
  computed:{
  	
  },
  methods:{
  	play(){
      if(!this.$refs.swiperTop){ return; }
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.params.control = swiperThumbs
      swiperThumbs.params.control = swiperTop
    }
  },
  created(){
  	
  },
  mounted(){
  	this.play();
  }
}
</script>

<style lang="scss" scoped>
#iswiper{
  position:relative;
  height:450px;
  .swiper-container {
    height: 100%;
    width: 100%;
  }

  .swiper-container, .gallery-top {
    height: 80%;
    width: 100%;
    .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-transition-property: -webkit-transform;
        transition-property: transform;
        box-sizing: content-box;
        .swiper-slide {
          background-size: cover;
          background-position: 50%;
        }
    }
  }

  .gallery-thumbs {
    height: 70px;
    box-sizing: border-box;
    padding: 10px 0;
    .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-transition-property: -webkit-transform;
        transition-property: transform;
        box-sizing: content-box;
        .swiper-slide {
          width: 70px;
          height: 100%;
          opacity: 0.4;
        }
        .swiper-slide-active {
          opacity: 1;
        }
    }    
      
  }
}
</style>
