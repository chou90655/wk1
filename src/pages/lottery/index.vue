<template>
  <view class="lottery">
    <iframe v-if="game.code" :src="url" class="iframe" frameborder="0"></iframe>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
import configService from "../../common/service/config.service";
export default {
  computed: {
    ...mapGetters(["user", "remUser"]),
    url() {
      const { token, username } = this.user;
      const { code, fcode } = this.game;
      return `http://172.20.30.34:8080/#/?token=${token}&username=${username}&code=${code}&fcode=${fcode}`;
      // return `${configService.lotteryUrl}#/?token=${token}&username=${username}&code=${code}&fcode=${fcode}`;
    },
  },
  created() {
    window.addEventListener("message", this.receiveMessage, false);
  },
  data() {
    return {
      game: {},
    };
  },
  beforeDestroy() {
    window.removeEventListener("message", this.receiveMessage)
  },
  onLoad(option) {
    this.game = option;
  },
  methods: {
    receiveMessage(event) {
      if (event.data==='back') {
        console.log(event.data);
        uni.navigateBack()
        uni.navigateBack()
      }
    },
  },
};
</script>

<style lang="scss">
.lottery {
  width: 100%;
  height: 100%;
  position: absolute;
}
.iframe {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
