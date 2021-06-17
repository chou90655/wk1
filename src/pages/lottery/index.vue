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
      // return `${configService.lotteryUrl}#/?token=${token}&username=${username}&code=${code}&fcode=${fcode}`;
      return `http://172.20.30.34:8080/#/?token=${token}&username=${username}&code=${code}&fcode=${fcode}`;
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
      console.log(event.data);
      if (event.data==='back') {
        uni.switchTab({
          url: "/pages/home/index",
        });
      } else if (event.data==='list') {
        uni.switchTab({
          url: "/pages/bet/index",
        });
      } else if (event.data==='login') {
        uni.navigateTo({
          url: "/",
        });
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
