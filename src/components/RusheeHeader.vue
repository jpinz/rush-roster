<template>
  <header class="card-header">
    <sui-grid :columns="3">
      <sui-grid-column>
        <div align="center">
          <h2>{{ rushee.name }}</h2>
          <b-tag align="center">Added by {{ rushee.added_by }}</b-tag>
          <br />
          <br />
        </div>
      </sui-grid-column>
      <sui-grid-column>
        <p>My rating</p>
        <b-rate v-model="rating"></b-rate>
      </sui-grid-column>
      <sui-grid-column>
        <div v-if="this.userProfile.role != 'normal'">
          <b-button class="is-danger" @click="deleteRushee">Delete</b-button>
        </div>
      </sui-grid-column>
    </sui-grid>
  </header>
</template>

<script>
import { mapState } from "vuex";
// import * as fb from "../firebase";

export default {
  props: ["rushee"],

  data: () => ({
    rating: this.rushee.ratings[this.userProfile.id],
  }),

  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    deleteRushee() {
      alert("NOT YET IMPLEMENTED Deleting " + this.rushee.name);
    },
  },
};
</script>
