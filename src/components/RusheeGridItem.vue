<template>
  <div id="rusheeItem">
    <sui-card class="fluid">
      <sui-image src="static/images/avatar/large/helen.jpg" />
      <sui-card-content>
        <sui-card-header>{{ rushee.name }}</sui-card-header>
        <sui-card-meta>{{ rushee.major }} - {{ rushee.yog }}</sui-card-meta>
        <sui-card-description>{{ rushee.blurb }}</sui-card-description>
        <sui-card-content extra>
          <b-rate
            :custom-text="rushee.ratings.length"
            v-model="rating"
          ></b-rate>
        </sui-card-content>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
export default {
  props: ["rushee"],
  data: () => ({}),
  computed: {
    rating() {
      return (
        this.rushee.ratings.reduce((sume, el) => sume + el, 0) /
        this.rushee.ratings.length
      );
    },
  },
  methods: {},
};
</script>
