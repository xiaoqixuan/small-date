<style>
	.dropdown-wrap {
	    display: inline-block;
	    position: absolute;
	    width: 100%;
	    left: 0;
	    color: #333;
	}
	.current {
	    display: inline-block;
	    /*padding-left: calc(50% - .2rem);*/
	    padding: 0 .3rem 0 calc(30% + .2rem);
	}
	.current .fa {
		float: right;
    	font-size: .4rem;
    	line-height: 2;
	}
	.item-wrap {
	    line-height: 2;
	    background: #fff;
	    /*padding: .2rem 0;*/
    	text-align: center;
	}
	.item-wrap li {
		padding: 0 .5rem;
	}
	.item-wrap .active {
		background-color: rgba(254, 92, 92, .8);
	}
</style>
<template>
    <div class="dropdown-wrap">
        <p class="current" @click="isOpen = !isOpen">
	        {{current.label}}
	        <i class="fa" :class="{'fa-angle-down': !isOpen, 'fa-angle-up': isOpen}"></i>
        </p>
        <ul v-show="isOpen" class="item-wrap">
            <li :class="{active: current.value === n.value}"
            	v-for="(n,index) in options"
            	@click="changeVal(n)">
                {{n.label}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
	props:['options'],
  	name:'dropdown',
  	data () {
      	return{
      		isOpen: false,
			current: this.options[0]
		}
  	},
 	methods:{
        changeVal (n) {
        	this.current = n
        	this.isOpen = false
            this.$emit("changeVal", n)
        }
  	}
}
</script>

