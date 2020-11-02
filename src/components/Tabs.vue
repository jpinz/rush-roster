<template>
  <div>
    <sui-tab
      :menu="{ attached: false, secondary: true, pointing: true }"
      @change="handleChange"
      :active-index="activeIndex"
    >
      <sui-tab-pane title="Rushees" :attached="false">
        <router-view />
      </sui-tab-pane>
      <sui-tab-pane title="Voting" :attached="false">
        <router-view />
      </sui-tab-pane>
      <sui-tab-pane title="Account" :attached="false">
        <router-view />
      </sui-tab-pane>
      <sui-tab-pane
        title="Users"
        :attached="false"
        v-if="userProfile.permission > 0"
      >
        <router-view />
      </sui-tab-pane>
      <sui-tab-pane
        title="Settings"
        :attached="false"
        v-if="userProfile.permission > 0"
      >
        <router-view />
      </sui-tab-pane>
    </sui-tab>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "../router";

export default {
  data: () => ({
    activeIndex: null,
  }),
  computed: {
    ...mapState(["userProfile"]),
    currentIndex() {
      switch (this.$route.name) {
        case "Rushees":
          return 0;
        case "Voting":
          return 1;
        case "Account":
          return 2;
        case "Users":
          return 3;
        case "Settings":
          return 4;
        default:
          return 0;
      }
    },
  },
  mounted() {
    this.activatePane(this.currentIndex);
  },
  methods: {
    activatePane(index) {
      this.activeIndex = +index;
    },
    handleChange(e, activePane) {
      if (activePane.title == "Rushees") {
        router.push("/");
      } else {
        router.push("/" + activePane.title.toLowerCase());
      }
    },
  },
};
</script>
