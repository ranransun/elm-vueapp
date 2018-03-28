<template>
  <div class="cartcontrol">
  	<div class="food-dec icon-remove_circle_outline" v-show="food.count>0" @click.stop="decCart"></div>
  	<div class="food-count" v-show="food.count>0">{{food.count}}</div>
  	<div class="food-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>
<script>

import Vue from 'vue'

export default{
	props:{
		food:{
			type:Object
		}
	},
	created(){
		// console.log(this.food)
	},
	methods:{
		addCart(){
			// console.log(1);
			if(!this.food.count){
				Vue.set(this.food,'count',1);
			}else{
				this.food.count++;
			}
			// this.$dispatch('cart.add',event.target);
		},
		decCart(){
			this.food.count--;
		}
	}
}

</script>

<style scoped>
.cartcontrol{
	font-size: 0;
}
.cartcontrol .food-dec,.food-add{
	display: inline-block;
	padding: 6px;
	line-height: 24px;
	font-size: 24px;
	color: rgb(0,160,220);
	cursor: pointer;
}
.cartcontrol .food-count{
	display: inline-block;
	font-size: 10px;
	width: 12px;
	line-height: 24px;
	text-align: center;
	padding-top: 6px;
	vertical-align: top;
	color: rgb(147,153,159);
}
</style>
