<template>
	<div>
	  <div class="shopcart">
	  	<div class="content">
	  		<div class="content-left"  @click="toggleList">
	  			<div class="logo-wrapper">
	  				<div class="logo" :class="{'highlight':totalCount>0}">
	  					<i :class="{'highlight':totalCount>0}" class="icon-shopping_cart"></i>
	  				</div>
	  				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
	  			</div>
	  			<div class="totalprice" :class="{'highlight':totalPrice>0}">￥{{ totalPrice }}</div>
	  			<div class="deliver">另需配送费￥{{deliveryPrice}}元</div>
	  		</div>
	  		<div class="content-right" @click="pay">
	  			<div class="pay" :class="payClass">{{payDesc}}</div>
	  		</div>
	  	</div>
	  	<div class="shopcart-con" v-show="listshow">
	  		<div class="list-header">
	  			<h1 class="list-title">购物车</h1>
	  			<span class="empty" @click="empty">清空</span>
	  		</div>
	  		<div class="list-con"  ref="listCon">
	  			<ul>
	  				<li class="food" v-for="food in selectFoods">
	  					<span class="name">{{food.name}}</span>
	  					<div class="price">
	  						<span>￥{{food.price*food.count}}</span>
	  					</div>
	  					<div class="cartcontrol-wrapper">
	  							<CartControl :food="food"></CartControl>
	  					</div>
	  				</li>
	  			</ul>
	  		</div>
	  	</div>
	  </div>
	  <div class="list-mask" v-show="listshow" @click="hidelist"></div>
    </div>
</template>
<script>
import CartControl from '../cartcontrol/CartControl'
import BScoll from 'better-scroll'
export default{
	props:{
		selectFoods:{
			type:Array,
			default(){
				return[];
			}
		},
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		}
	},
	data(){
		return{
			fold:true
		};
	},
	methods:{
		toggleList(){
			if(!this.totalCount){
				return;
			}
			this.fold=!this.fold;
		},
		empty(){
			this.selectFoods.forEach((food)=>{
				food.count=0;
			});
		},
		hidelist(){
			this.fold=true;
		},
		pay(){
			if(this.totalPrice<this.minPrice){
				return;
			}
			window.alert(`需要支付${this.totalPrice}元`);
		}
	},
	computed:{
		totalPrice(){
			let total=0;
			this.selectFoods.forEach((food)=>{
				total+=food.price*food.count;
			});
			return total;
		},
		totalCount(){
			let count=0;
			this.selectFoods.forEach((food)=>{
				count+=food.count;
			});
			return count;
		},
		payDesc(){
			if(this.totalPrice===0){
				return `￥${this.minPrice}元起送`;
			}else if(this.totalPrice<this.minPrice){
				let dec=this.minPrice-this.totalPrice;
				return `还差￥${dec}元起送`;
			}else{
				return '去结算';
			}
		},
		payClass(){
			if(this.totalPrice<this.minPrice){
				return 'notPay';
			}else{
				return 'okPay';
			}
		},
		listshow(){
			if(!this.totalCount){
				this.fold=true;
				return false;
			}
			let show=!this.fold;
			if(show){
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScoll(this.$refs.listCon,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				});
			}
			return show;
		}
	},
	components:{
		CartControl
	}
}

</script>

<style scoped>

@import "../../common/stylus/icon.css"

*{
	margin: 0;
	padding: 0;
}
.shopcart{
	position: fixed;
	width: 100%;
	height: 48px;
	left: 0;
	bottom: 0;
	z-index: 99;
}
.content{
	display: flex;
	background: #141d27;
}
.content .content-left{
	flex: 1;
	font-size: 0;
}
.content .content-left .logo-wrapper{
	display: inline-block;
	width: 56px;
	height: 56px;
	box-sizing: border-box;
	vertical-align: top;
	border-radius: 50%;
	position: relative;
	top: -10px;
	margin: 0 12px;
	padding: 6px;
	background: #141d27;
}
.content .content-left .logo-wrapper .logo{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: #2b343c;
	text-align: center;
}
.content-left .logo-wrapper .icon-shopping_cart{
	line-height: 44px;
	font-size: 24px;
	color: #80858a;
}
.content .content-left .logo-wrapper .highlight{
	background: rgb(0,160,220);
	color: #fff;
}
.content .content-left .num{
	width: 24px;
	height: 16px;
	position: absolute;
	top: 0;
	right: 0;
	line-height: 16px;
	text-align: center;
	border-radius: 16px;
	font-size: 9px;
	font-weight: 700;
	color: #fff;
	background: rgb(240,20,20);
	box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
}
.content .content-left .totalprice{
	display: inline-block;
	font-size: 16px;
	font-weight: 700;
	color: rgba(255,255,255,0.4);
	vertical-align: top;
	line-height: 24px;
	margin-top: 12px;
	padding-right: 12px;
	box-sizing: border-box;
	border-right: 1px solid rgba(255,255,255,0.1);
}
.content .content-left .highlight{
	color: #fff;
}
.content .content-left .deliver{
	display: inline-block;
	vertical-align: top;
	line-height: 24px;
	margin: 12px 0 0 12px;
	font-size: 10px;
	color: rgba(255,255,255,0.4);

}
.content .content-right{
	flex: 0 0 105px;
	width: 105px;
}
.content .content-right .pay{
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size: 12px;
	color: rgba(255,255,255,0.4);
	font-weight: 700;
	background: #2b333b;
}
.content .content-right .okPay{
	background: #00b43c;
	color: #fff;
}
.content .content-right .notPay{
	background: #2b333b;
}
.shopcart-con{
	position: absolute;
	bottom: 48px;
	left: 0;
	z-index: -1;
	width: 100%;
}
.list-header{
	height: 40px;
	line-height: 40px;
	padding: 0 18px;
	background: #f3f5f7;
	border-bottom: 1px solid rgba(7,17,27);
}
.list-header .list-title{
	float: left;
	font-size: 14px;
	color: rgb(7,17,27);
}
.list-header .empty{
	float: right;
	font-size: 12px;
	color: rgb(0,160,220);
}
.list-con{
	padding: 0 18px;
	max-height: 217px;
	background: #fff;
	overflow: hidden;
}
.list-con .food{
	position: relative;
	padding: 12px 0;
	box-sizing: border-box;
}
.list-con .food .name{
	line-height: 24px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.list-con .food .price{
	position: absolute;
	right: 90px;
	bottom: 12px;
	line-height: 24px;
	font-size: 14px;
	font-weight: 700;
	color: rgb(240,20,20);
}
.list-con .food .cartcontrol-wrapper{
	position: absolute;
	right: 0;
	bottom: 6px;
}
.list-mask{
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 40;
	background: rgba(7,17,27,0.6);
	backdrop-filter:blur(10px);
}
</style>
