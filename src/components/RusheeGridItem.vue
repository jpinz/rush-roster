<template>
  <div>
    <sui-card class="link" v-on:click="modalVisible = true">
      <div class="ui image fluid">
        <a v-if="rusheeLabel" :class="rusheeLabel[0]">{{ rusheeLabel[1] }}</a>
        <img :src="rushee.photo_url" />
      </div>
      <sui-card-content>
        <sui-card-header>{{ rushee.name }}</sui-card-header>
        <sui-card-meta>{{ rushee.major }} - {{ rushee.yog }}</sui-card-meta>
        <sui-card-description>{{ rushee.description }}</sui-card-description>
        <sui-card-content extra>
          <b-rate
            v-model="rating"
            disabled="true"
            :custom-text="'(' + Object.values(this.rushee.ratings).length + ')'"
          ></b-rate>
        </sui-card-content>
      </sui-card-content>
    </sui-card>
    <b-modal v-model="modalVisible">
      <Rushee :rushee="rushee" />
    </b-modal>
  </div>
</template>

<script>
import router from "../router";
import Rushee from "@/views/Rushee";

export default {
  components: {
    Rushee,
  },
  props: ["rushee"],
  data: () => ({ modalVisible: false }),
  computed: {
    rating() {
      return (
        Object.values(this.rushee.ratings).reduce((sume, el) => sume + el, 0) /
        Object.values(this.rushee.ratings).length
      );
    },
    rusheeLabel() {
      switch (this.rushee.status) {
        case "bid":
          return ["ui green ribbon label", "Bid"];
        case "nobid":
          return ["ui red ribbon label", "No Bid"];
        case "interviewed":
          return ["ui purple ribbon label", "Interviewed"];
        case "abstained":
          return ["ui blue ribbon label", "Abstained"];

        default:
          return null;
      }
    },
  },
  methods: {
    modal() {
      router.push({ path: `/rushee/${this.rushee.uid}` }); // -> /rushee/123
    },
  },
};
</script>
