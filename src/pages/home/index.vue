<template>
  <view class="content">
    <view class="home-head">
      <uni-row>
        <uni-col :span="10">
          <img-cache
            style="width: 235rpx; height: 74rpx; padding: 10rpx"
            src="../../static/logoV.png"
          ></img-cache>
        </uni-col>
        <uni-col
          :span="11"
          v-if="null != user"
          style="text-align: right; padding-top: 20rpx"
        >
          <p class="blance-text">{{ user.username }}</p>
          <p class="blance-text">余额：{{ user.balance }}</p>
        </uni-col>
        <uni-col :span="3" v-if="null != user">
          <img-cache class="user-head" :src="user.face"></img-cache>
        </uni-col>
      </uni-row>
    </view>
    <view class="home-ad"></view>
    <view class="home-gg uni-row uni-flex">
      <view class="text" style="width: 40rpx">
        <img-cache
          style="
            width: 27rpx;
            height: 27rpx;
            margin: 0 10rpx;
            margin-top: 25rpx;
          "
          src="../../static/icon/voice.png"
        ></img-cache>
      </view>
      <view class="text-gg" @click="gotoNew(ggBin)">
        <uni-notice-bar
          color="#8A8989"
          backgroundColor="#fff"
          :scrollable="true"
          :single="true"
          :text="getGgInfo()"
        />
      </view>
      <view class="text" style="width: 200rpx; margin-top: 6rpx">
        <button type="primary" size="mini" @click="gotoNewslist()">
          更多公告
        </button>
      </view>
    </view>
    <view class="home-tabs">
      <uni-row class="uni-row uni-flex">
        <uni-col v-for="(item, index) in tabTools" :key="index">
          <view class="tab-tools" @click="gotoPages(item)">
            <img-cache
              class="tab-tools"
              :src="item.icon"
              @click="gotoPages(item)"
            ></img-cache>
          </view>
          <text class="tab-tools-title">{{ item.title }}</text>
        </uni-col>
      </uni-row>
    </view>
    <view class="uni-flex uni-row home-games">
      <view class="home-sidebar">
        <view
          class="tab-bar-btn"
          v-for="(item, index) in sideBars"
          :key="index"
          :class="{ active: index == sideBarIndex }"
          @click="switchSideBar(index)"
        >
          <view class="sidebar-img-bg">
            <img-cache
              class="sidebar-img"
              :src="index == sideBarIndex ? item.icon : item.iconHL"
            ></img-cache>
          </view>
          <text class="sidebar-title">{{ item.title }}</text>
        </view>
      </view>
      <view class="home-content" v-if="sideBarIndex == 0">
        <view class="home-gamges">
          <uni-row>
            <uni-col
              class="game-content"
              :span="6"
              v-for="(item, index) in games"
              :key="index"
            >
              <view v-if="item.id > 0" @click="gotoBet(item)">
                <view v-if="item.title.length > 2">
                  <p class="game-title-main">{{ item.title.substr(0, 2) }}</p>
                  <p class="game-title-desc">
                    {{ item.title.substr(2, item.title.length - 2) }}
                  </p>
                </view>
                <view v-if="item.title.length <= 2">
                  <p class="game-title">{{ item.title }}</p>
                </view>
                <img-cache
                  class="game-icon"
                  :src="item.iconUrl"
                  mode="aspectFit"
                ></img-cache>
              </view>
            </uni-col>
          </uni-row>
        </view>
        <view class="home-lotty">
          <view style="margin-left: 20rpx; margin-top: 10rpx">
            <view style="display: inline-flex">
              <img-cache
                class="lotty-img"
                :src="sideBars[sideBarIndex].icon"
              ></img-cache>
            </view>
            <view class="lotty-title"
              >{{ sideBars[sideBarIndex].title }}大厅</view
            >
          </view>
          <view class="lotty-enter" @click="gotoGames()">
            全部彩种
            <view style="display: inline-block; margin-left: 10rpx">
              <img-cache
                style="width: 8rpx; height: 14rpx"
                src="../../static/icon/right.png"
              ></img-cache>
            </view>
          </view>
        </view>
      </view>
      <scroll-view
        v-if="sideBarIndex !== 0 && sideBarIndex !== 4"
        class="home-content"
        :scroll-y="true"
      >
        <uni-row>
          <uni-col
            :span="20"
            :offset="2"
            v-for="(item, index) in games"
            :key="index"
          >
            <!-- {{item.name}} -->
            <img-cache
              style="width: 100%"
              mode="widthFix"
              :src="item.img"
              @click="getLogin(item)"
            ></img-cache>
          </uni-col>
        </uni-row>
      </scroll-view>
      <scroll-view
        v-if="sideBarIndex == 4"
        class="home-content"
        :scroll-y="true"
      >
        <uni-row>
          <uni-col
            :span="10"
            :offset="2"
            v-for="(item, index) in games"
            :key="index"
          >
            <!-- {{item.name}} -->
            <img-cache
              style="width: 100%"
              mode="widthFix"
              :src="item.img"
              @click="getLogin(item)"
            ></img-cache>
          </uni-col>
        </uni-row>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import api from "@/api/api.js";
// ak
import ak from "../../common/ak.js";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters(["remUser", "user", "lotteryHall"]),
    games() {
      var games = [];
      if (this.sideBarIndex == 0) {
        games = this.lotteryHall;
      } else {
        var type = this.sideBars[this.sideBarIndex].type;
        if (type != "") {
          games = this.apiGames.filter((item) => {
            return item.game_id == type;
          });
        }
      }
      return games;
    },
  },
  data() {
    return {
      tabTools: [
        {
          icon: "../../static/icon/chongzhi.png",
          title: "充值",
          link: "/pages/blance/chongzhi",
        },
        {
          icon: "../../static/icon/zhuanzhang.png",
          title: "划转",
          link: "/pages/blance/zhuanzhang",
        },
        {
          icon: "../../static/icon/tikuan.png",
          title: "提款",
          link: "/pages/blance/tixian",
        },
        {
          icon: "../../static/icon/zhanghu.png",
          title: "账户",
          isTab: true,
          link: "/pages/me/index",
        },
        {
          icon: "../../static/icon/kefu.png",
          title: "客服",
          link: "/pages/",
        },
      ],
      sideBars: [
        {
          icon: "../../static/sidebar/caipiao.png",
          iconHL: "../../static/sidebar/caipiaoHL.png",
          title: "彩票",
          type: "",
        },
        {
          icon: "../../static/sidebar/dianjing.png",
          iconHL: "../../static/sidebar/dianjingHL.png",
          title: "电竞",
          type: "dianjing",
        },
        {
          icon: "../../static/sidebar/tiyu.png",
          iconHL: "../../static/sidebar/tiyuHL.png",
          title: "体育",
          type: "tiyu",
        },
        {
          icon: "../../static/sidebar/zhenren.png",
          iconHL: "../../static/sidebar/zhenrenHL.png",
          title: "真人",
          type: "zhenren",
        },
        {
          icon: "../../static/sidebar/dianzi.png",
          iconHL: "../../static/sidebar/dianziHL.png",
          title: "电子",
          type: "dianzi",
        },
        {
          icon: "../../static/sidebar/qipai.png",
          iconHL: "../../static/sidebar/qipaiHL.png",
          title: "棋牌",
          type: "qipai",
        },
        {
          icon: "../../static/sidebar/buyu.png",
          iconHL: "../../static/sidebar/buyuHL.png",
          title: "捕鱼",
          type: "buyu",
        },
      ],
      sideBarIndex: 0, //侧边栏选中项目
      sideBarType: "dpc", //侧边栏选中游戏类型
      ggBin: null,
      apiGames: [],
    };
  },
  onShow() {
    this.getGg();
    this.getApiGameList();
  },
  methods: {
    ...mapActions(["gotoKefu"]),
    getGg() {
      api
        .getGg({
          p: 1,
          pagesize: 1,
        })
        .then((res) => {
          if (
            res.code == 0 &&
            null != res.data.root &&
            res.data.root.length > 0
          ) {
            this.ggBin = res.data.root[0];
          }
        });
    },
    getGgInfo() {
      var content = "暂无公告!";
      if (undefined != this.ggBin && null != this.ggBin) {
        content =
          this.ggBin.title +
          "  " +
          ak.Utils.getDateTimeStr(
            new Date(this.ggBin.oddtime * 1000),
            "Y-m-d H:i:s"
          );
      }
      return content;
    },
    getApiGameList() {
      api
        .getList({
          username: this.user.username,
        })
        .then((res) => {
          if (res.code == 0) {
            res.data.forEach((item) => {
              item.img = api.getFileAccessHttpUrl(item.img);
            });
            this.apiGames = res.data;
          }
        });
    },
    switchSideBar(index) {
      this.sideBarIndex = index;
      this.sideBarType = this.sideBars[index].type;
    },
    gotoGames() {
      uni.navigateTo({
        url: "/pages/games/games",
      });
    },
    gotoPages(item) {
      if (undefined != item.isTab && item.isTab) {
        uni.switchTab({
          url: item.link,
        });
      } else {
        if (item.title == "客服") {
          this.gotoKefu();
        } else {
          uni.navigateTo({
            url: item.link,
          });
        }
      }
    },
    gotoBet(item) {
      // uni.showToast({
      //   title: "暂未开放，敬请期待",
      //   icon: "none",
      // });
      uni.navigateTo({
        url: "/pages/lottery/index?code=" + item.name + "&fcode=" + item.typeid,
      });
    },
    gotoNewslist() {
      uni.navigateTo({
        url: "/pages/newslist/newslist",
      });
    },
    gotoNew(ggBin) {
      uni.navigateTo({
        url: "/pages/newslist/newsdetail?newBin=" + JSON.stringify(ggBin),
      });
    },
    getLogin(item) {
      api
        .getLogin({
          username: this.user.username,
          type: item.type,
          game_type: item.game_type,
        })
        .then((res) => {
          if (res.code == 0) {
            console.log(res.data.url);
            uni.navigateTo({
              url:
                "/pages/webview/webview?url=" +
                encodeURIComponent(res.data.url) +
                "&title=" +
                item.type_name, // + res.data.name
            });
          }
        });
    },
  },
};
</script>
<style lang="scss">
uni-page-body {
  overflow: hidden;
}
</style>
<style lang="scss">
.home-head {
  height: 100rpx;
  background: url(../../static/bg/homeHead.png) no-repeat center;
  background-size: 100% 100rpx;

  .user-head {
    text-align: right;
    margin-top: 10rpx;
    width: 80rpx;
    height: 80rpx;
    border: 4rpx solid #fff;
    border-radius: 80rpx;
  }
  .blance-text {
    font-family: PingFang;
    margin-right: 20rpx;
    font-size: 23rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 34rpx;
  }
}

.home-ad {
  height: 290rpx;
  background: url(../../static/bg/homeBg.png) no-repeat center;
  background-size: 100% 290rpx;
}

.home-gg {
  background: #fff;
  .text-gg {
    -webkit-flex: 1;
    flex: 1;
    color: #8a8989;
    font-size: 23rpx;
    padding: 10rpx;
    overflow: scroll;
    height: 50rpx;
    line-height: 50rpx;
  }
}

.home-tabs {
  background: #fff;
  height: 170rpx;
  padding-left: 5%;
  text-align: center;
  .tab-tools {
    width: 106rpx;
    height: 106rpx;
    border-radius: 106rpx;
    text-align: center;
    .tab-tools-img {
      margin-top: 23rpx;
      width: 60rpx;
      height: 60rpx;
    }
  }

  .tab-tools-title {
    display: inline-block;
    width: 100%;
    text-align: left;
    height: 40rpx;
    line-height: 40rpx;
    margin-left: 20%;
    font-size: 23rpx;
    font-weight: 600;
    color: #000000;
    font-family: PingFang;
  }
}
.home-games {
  height: calc(100vh - 730rpx);
  overflow: hidden;
  .home-sidebar {
    width: 170rpx;
    text-align: center;
    line-height: 90rpx;
    .active {
      background: linear-gradient(90deg, #9b98ff, #40b9ff) !important;

      .sidebar-title {
        color: #ffffff !important;
      }
    }
    .tab-bar-btn {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 126rpx;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      border-radius: 30rpx;
      background: #fff;
      margin-left: 20rpx;
      margin-top: 15rpx;

      .sidebar-img-bg {
        height: 72rpx;
        padding-top: 10rpx;
        text-align: left;
        align-items: center;
        justify-content: center;
        .sidebar-img {
          width: 30rpx;
          height: 30rpx;
        }
      }
      .sidebar-title {
        padding-left: 10rpx;
        font-size: 23rpx;
        font-family: PingFang;
        font-weight: 500;
        color: #929292;
      }
    }
  }
  .home-content {
    -webkit-flex: 1;
    flex: 1;
    padding-top: 20rpx;
    padding-right: 20rpx;

    .home-gamges {
      background: #fff;
      border-radius: 30rpx;
      height: calc(100vh - 240rpx - 730rpx - 35rpx);
      overflow: scroll;
      padding: 5rpx 0;
      padding-left: 30rpx;
      .game-content {
        .game-title-main,
        .game-title-desc,
        .game-title {
          margin: 12rpx 10rpx;
          font-size: 19rpx;
          font-family: PingFang;
          font-weight: 500;
          color: #6a6a6a;
          line-height: 25rpx;
          width: 81rpx;
          text-align: center;
        }
        .game-title-main {
          height: 20rpx;
        }
        .game-title-desc {
          height: 20rpx;
        }
        .game-title {
          height: 42rpx;
        }
        .game-icon {
          width: 81rpx;
          height: 78rpx;
        }
      }
    }
    .home-lotty {
      position: relative;
      height: 238rpx;
      background: url(../../static/bg/lottBg.png) no-repeat center;
      background-size: 100% 238rpx;
      .lotty-enter {
        margin-top: 100rpx;
        margin-left: 20rpx;
        left: 20rpx;
        width: 140rpx;
        height: 39rpx;
        background: #ffffff;
        border-radius: 20rpx;

        font-size: 19rpx;
        font-family: PingFang;
        font-weight: bold;
        color: #96a0ff;
        line-height: 39rpx;
        text-align: center;
      }
      .lotty-img {
        display: inline-block;
        width: 35rpx;
        height: 36rpx;
      }
      .lotty-title {
        display: inline-block;
        height: 34rpx;
        font-size: 36rpx;
        font-family: PingFang;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>
