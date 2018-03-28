<template>
	<div class="food" v-show="showFlag" ref="food">
		<div class="food-cotent">
			<div class="bac-img">
				<img class="img-bg" v-bind:src="food.image" />
				<div class="back">
					<i @click="backPage" class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="foodconent">
				<h1 class="foodname">{{food.name}}</h1>
				<span class="foodcount">月售{{food.sellCount}}份</span><span class="foodrating">好评率{{food.rating}}%</span>
				<div class="price">
					<span class="now-price">￥{{food.price}}</span><span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<CartControl :food="food"></CartControl>
				</div>
				<div class="buy" v-show="!food.count||food.count===0" @click="addFirst">加入购物车</div>
			</div>
			<Split v-show="food.info"></Split>
			<div class="foodbreif"  v-show="food.info">
				<h1 class="title">商品介绍</h1>
				<p class="text" >{{food.info}}</p>
			</div>
			<Split></Split>
			<div class="rating">
				<h1 class="rating-title">商品评价</h1>
				<RatingSelect :selectType="selectType" :onlyContent="onlyContent"  :desc="desc"  :ratings="food.ratings" v-on:contenttoggle="togglecontent" v-on:ratingtype="ratingtype"></RatingSelect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings&&food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in food.ratings">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img class="avatar" width="12px" height="12px" :src="rating.avatar">
							</div>
							<div class="time">{{rating.rateTime | formateDate}}</div>
							<p class="text">
								<span class="icon-thumb" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span><span class="word">{{rating.text}}</span>
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import BScroll from 'better-scroll'
import Vue from 'vue'
import CartControl from '../cartcontrol/CartControl'
import Split from '../Split'
import RatingSelect from '../ratingselect/RatingSelect'

const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;

export default{
	props:{
		food:{
			type:Object
		}
	},
	data(){
		return{
			showFlag:false,
			selectType:ALL,
			onlyContent:false,
			desc:{
				all:'全部',
				positive:'推荐',
				negative:'吐槽'
			}
		};
	},
	methods:{
		showFood(){
			this.showFlag=true;
			this.selectType=ALL;
			this.onlyContent=false;
			this.$nextTick(()=>{
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.food,{click:true});
				}else{
					this.scroll.refresh();
				}
			});
		},
		togglecontent(onlyContent){
			this.onlyContent=onlyContent;
			this.$nextTick(()=>{
				this.scroll.refresh();
			});
		},
		ratingtype(type){
			this.selectType=type;
			this.$nextTick(()=>{
				this.scroll.refresh();
			});
		},
		backPage(){
			this.showFlag=false;
		},
		addFirst(){
			Vue.set(this.food,'count',1);
		},
		needShow(type,text){
			if(this.onlyContent&&!text){
				return false;
			}
			if(this.selectType===ALL){
				return true;
			}else{
				return type===this.selectType;
			}
		}
	},
	filters:{
		formateDate(time){
			let date=new Date(time);
			return date.toLocaleString();
		}
	},
	components:{
		CartControl,
		Split,
		RatingSelect
	}
}

</script>

<style scoped >

@import "../../common/stylus/icon.css"


*{
	margin: 0;
	padding: 0;
}
.food{
	position: fixed;
	top: 0px;
	bottom: 48px;
	left: 0px;
	width: 100%;
	z-index: 20;
	background: #fff;
}
.bac-img{
	width: 100%;
	height: 0;
	padding-top: 100%;
	position: relative;
}
.img-bg{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
}
.back{
	position: absolute;
	top: 10px;
	left: 8px;
	text-align: center;
}
.icon-arrow_lift{
	display: block;
	font-size: 20px;
	padding: 10px;
	color: #fff;
	cursor: pointer;
}
.foodconent{
	padding: 18px;
	position: relative;
}
.foodconent .foodname{
	font-size: 14px;
	color: rgb(7,17,27);
	font-weight: 700;
	line-height: 14px;
}
.foodconent span{
	display: inline-block;
	font-size: 10px;
	color: rgb(147,153,159);
	height: 10px;
	line-height: 10px;
	margin: 8px 0 18px;
}
.foodrating{
	padding-left: 12px;
}
.price{
	font-weight: 700;
	line-height: 24px;

}
.price .now-price{
	margin-right: 18px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.price .old-price{
	text-decoration: line-through;
	font-size: 10px;
	color: rgb(147,153,159);
}
.cartcontrol-wrapper{
	position: absolute;
	right: 12px;
	bottom: 12px;

}
.buy{
	position: absolute;
	right: 18px;
	bottom: 18px;
	z-index: 10;
	height: 24px;
	line-height: 24px;
	padding: 0 12px;
	box-sizing: border-box;
	font-size: 10px;
	border-radius: 12px;
	color: #fff;
	background: rgb(0,160,220);
}
.foodbreif{
	padding: 18px;
}
.foodbreif .title{
	line-height: 14px;
	margin-bottom: 6px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.foodbreif .text{
	padding: 0 8px;
	font-size: 14px;
	line-height: 24px;
	color: rgb(77,85,93);
}
.rating{
	padding: 18px 18px 0;
	border-bottom: 1px solid rgba(7,17,27,0.3);
}
.rating-title{
	line-height: 14px;
	margin-bottom: 6px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.rating-wrapper{
	padding: 0 18px;
}
.rating-item{
	position: relative;
	padding: 16px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.rating-item .user{
	position: absolute;
	top: 16px;
	right: 0;
	font-size: 0;
}
.rating-item .user .name{
	display: inline-block;
	font-size: 10px;
	color: rgb(147,153,159);
	line-height: 12px;
	margin-right: 6px;
	vertical-align: top;
}
.rating-item .user .avatar{
	border-radius: 50%;
}
.rating-item .time{
	font-size: 10px;
	color: rgb(147,153,159);
	line-height: 12px;
	margin-bottom: 6px;
}
.rating-item .text{
	font-size: 12px;
	line-height: 16px;
	color: rgb(7,17,27);
}
.rating-item .icon-thumb{
	margin-right: 4px;
	font-size: 12px;
}
.rating-item .icon-thumb_down{
	color: rgb(147,153,159);
}
.rating-item .icon-thumb_up{
	color: rgb(0,160,220);
}
.no-rating{
	padding: 16px 0;
	font-size: 12px;
	color: rgb(147,153,159);
}
</style>
