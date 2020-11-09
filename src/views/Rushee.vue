<template>
  <div class="card">
    <div class="card-content">
      <RusheeHeader :rushee="rushee" />

      <sui-tab :menu="{ attached: true, secondary: true, pointing: true }">
        <sui-tab-pane title="Info" :attached="true">
          <RusheeInfo :rushee="rushee" />
        </sui-tab-pane>
        <sui-tab-pane title="Questions" :attached="true">
          <RusheeQuestions />
        </sui-tab-pane>
      </sui-tab>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RusheeHeader from "@/components/RusheeHeader";
import RusheeInfo from "@/components/RusheeInfo";
import RusheeQuestions from "@/components/RusheeQuestions";

export default {
  components: {
    RusheeHeader,
    RusheeInfo,
    RusheeQuestions,
  },
  props: ["rushee"],
  data: () => ({
    rating: this.rushee[this.userProfile.id],
  }),
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateRating() {
      var updates = {};
      updates[
        "/pnm/" + this.rushee.uid + "/ratings/" + this.userProfile.id
      ] = this.rating;
    },
  },
};
</script>

<style lang="scss" scoped></style>
