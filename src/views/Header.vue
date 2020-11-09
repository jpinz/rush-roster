<template>
  <div id="appHeader">
    <sui-grid :columns="3">
      <sui-grid-column></sui-grid-column>
      <sui-grid-column>
        <h1 align="center">Rush Roster</h1>
      </sui-grid-column>
      <sui-grid-column>
        <p>{{ userProfile.name }} {{ userProfile.bromoji }}</p>
        <b-button inverted outlined v-on:click="logout">
          Log out
        </b-button>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    ...mapState(["userProfile"]),
  },
};
</script>

<style lang="scss" scoped></style>
