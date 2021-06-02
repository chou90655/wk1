<template>
	<view>
    <iframe src="" class="iframe" frameborder="0"></iframe>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import graceChecker from '../../common/graceChecker.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
		computed: {
			...mapGetters(['user', 'remUser']),
		},
		data() {
			return {
			}
		},
    computed: {
      ...mapState(['token'])
    },
		methods: {
      
    }
	}
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
