<template>
	<div class="good">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="meau-item"  :class="{'current':currentIndex===index}" @click="selectMeau(index)">
					<span class="meau-text">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="food-wrapper" ref="foodWrapper">
			<ul>
				<li class="food-list food-list-hook" v-for="item in goods">
					<h1 class="food-title">{{item.name}}</h1>
					<ul>
						<li class="food-item" v-for="food in item.foods"  @click="clickFood(food,$event)">
							<div class="icon">
								<img width="57px" height="57px" v-bind:src="food.icon">
							</div>
							<div class="food-con">
								<h1 class="food-name">{{food.name}}</h1>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now-price">￥{{food.price}}</span><span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cart-wrapper">
									<CartControl v-bind:food="food"></CartControl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<ShopCart ref="ShopCart" v-bind:selectFoods="selectFoods" v-bind:deliveryPrice="seller.deliveryPrice" v-bind:minPrice="seller.minPrice"></ShopCart>
		<Food ref="Food" v-bind:food="selectedFood"></Food>
	</div>
</template>

<script>
import BScoll from 'better-scroll'
import ShopCart from '../shopcart/ShopCart'
import CartControl from '../cartcontrol/CartControl'
import Food from '../food/Food'
const ERR_OK=0

export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			goods:[],
			listHeight:[],
			scrollY:0,
			selectedFood:{}
		}
	},
	computed:{
		selectFoods(){
			let foods=[];
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if(food.count){
						foods.push(food);
					}
				});
			});
			return foods;
		},
		currentIndex(){
			for(let i=0;i<this.listHeight.length;i++){
				let height1=this.listHeight[i];
				let height2=this.listHeight[i+1];
				if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
					return i;
				}
			}
			return 0;
		}
	},
	created(){
		this.$http.get('/api/goods').then((response)=>{
			response=response.body;
			if(response.errno===ERR_OK){
				this.goods=response.data;
				this.$nextTick(()=>{
					this._initScroll();
					this._calculateHeight();
				});
			}
		})
	},
	methods:{
		selectMeau(index){
			let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
			let curIndex=foodList[index];
			this.foodScroll.scrollToElement(curIndex,300);
		},
		clickFood(food){
			this.selectedFood=food;
			this.$refs.Food.showFood();
	    },
		_drop(target){
			this.$refs.ShopCart.drop(target);
		},
		_initScroll(){
			this.menuScroll=new BScoll(this.$refs.menuWrapper,{click:true});
			this.foodScroll=new BScoll(this.$refs.foodWrapper,{probeType:3,click:true});
			this.foodScroll.on('scroll',(pos)=>{
				this.scrollY=Math.abs(Math.round(pos.y));
			});
		},
		_calculateHeight(){
			let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
			// console.log(foodList);
			let height=0;
			this.listHeight.push(height);
			for (let i = 0; i<foodList.length; i++) {
				let item=foodList[i];
				height+=item.clientHeight;
				this.listHeight.push(height);
				// console.log(this.listHeight);
			}
		}
	},
	components:{
		ShopCart,
		CartControl,
		Food
	},
	events:{
		'cart.add'(target){
			this._drop(target);
		}
	}
}
</script>

<style scoped >
@import "../../common/stylus/icon.css"
*{
	margin: 0;
	padding: 0;
}
.good{
	display: flex;
	position: absolute;
	top: 174px;
	bottom: 46px;
	width: 100%;
	overflow: hidden;
}
.menu-wrapper{
	flex: 0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.menu-wrapper .meau-item{
	display: table;
	height: 54px;
	width: 56px;
	line-height: 14px;
	padding: 0 12px;
}
.menu-wrapper .current{
	position: relative;
	z-index: 10;
	margin-top: -1px;
	background: #fff;
	font-weight: 700;
}
.menu-wrapper .current .meau-text{
	border: none !important;
}
.menu-wrapper .meau-item .meau-text{
	display: table-cell;
	width: 56px;
	vertical-align: middle;
	font-size: 12px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.food-wrapper{
	flex: 1;
}
.food-wrapper .food-title{
	height: 26px;
	line-height: 26px;
	font-size: 12px;
	background: #f3f5f7;
	color: rgb(147,153,159);
	padding-left: 14px;
	border-left: 2px solid #d9dde1;
}
.food-wrapper .food-item{
	display: flex;
	margin: 18px;
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food-wrapper .food-item:last-child{
	border: none;
	margin-bottom: 0;
}
.food-wrapper .icon{
	flex: 0 0 57px;
	margin-right: 10px;
}
.food-wrapper .food-con{
	flex: 1;
	position: relative;
}
.food-wrapper .food-con .food-name{
    height: 14px;
	line-height: 14px;
	font-size: 14px;
	margin: 2px 0 8px 0;
	color: rgb(7,17,27);
}
.food-wrapper .food-con .desc{
	margin-bottom: 8px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.food-wrapper .food-con .extra{
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.food-wrapper .extra .count{
	margin-right: 12px;
}
.food-wrapper .food-con .price{
	font-weight: 700;
	line-height: 24px;

}
.food-wrapper .price .now-price{
	margin-right: 18px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.food-wrapper .price .old-price{
	text-decoration: line-through;
	font-size: 10px;
	color: rgb(147,153,159);
}
.cart-wrapper{
	position: absolute;
	right: 0;
	bottom: -12px;
}
</style>
