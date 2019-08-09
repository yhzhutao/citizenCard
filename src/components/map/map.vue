
<template>
  <div class="mapbox">
    <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      style="height:100%;width:100%;"
      @click="getClickInfo"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-info-window
        :position="{lng: 120.202813, lat:30.236637}"
        :width='widths'
        :show="show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
      >
        <p style="line-height:50px;" v-text="contents"></p>
      </bm-info-window>
      <bm-marker
        :position="{lng: 120.202644, lat: 30.236536}"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
    </baidu-map>
  </div>
</template>
<script>
export default {
  name: "mapbox",
  data() {
    return {
      widths:350,
      show: true,
      contents: "杭州市上城区婺江路217号近江时代大厦A座14楼",
      center: { lng: 0, lat: 0 },
      zoom: 20
    };
  },
  methods: {
    handler({ BMap, map }) {
      //   //console..log(BMap, map);
      this.center.lng = 120.2025948844;
      this.center.lat = 30.2365903996;
      this.zoom = this.zoom;
    },
    getClickInfo(e) {
      //   //console..log(e.point.lng);
      //   //console..log(e.point.lat);
      //   this.center.lng = e.point.lng;
      //   this.center.lat = e.point.lat;
    },
    infoWindowClose(e) {
      this.show = false;
    },
    infoWindowOpen(e) {
      this.show = true;
    },
    clear() {
      //   this.infoWindow.contents = ''
    }
  }
};
</script>
<style scoped>
.mapbox {
  width: 100%;
  height: 100%;
  font-size: 16px;
}
</style>

