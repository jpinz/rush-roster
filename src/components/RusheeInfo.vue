<template>
  <div>
    <div class="columns">
      <div class="column is-one-third">Pic and Rating stuff TODO</div>
      <div class="column">
        <p class="title is-5">Major: {{ rushee.major }}</p>
        <p class="title is-5">Year of Graduation: {{ rushee.yog }}</p>
        <p class="title is-5">
          Description
        </p>
        <p>{{ rushee.description }}</p>
        <p class="title is-5">
          Hometown
        </p>
        <p>{{ rushee.hometown }}</p>
        <p class="title is-5">
          Dorm + Room
        </p>
        <p>{{ rushee.dorm }}</p>
        <p class="title is-5">
          CA / RA
        </p>
        <p>{{ rushee.ca_ra }}</p>
        <p class="title is-5">
          Phone Number
        </p>
        <p>{{ rushee.phone_number }}</p>
        <p class="title is-5">Grades: {{ rushee.grades }}</p>
      </div>
    </div>
    <Comments :rushee="rushee" />
  </div>
</template>

<script>
import Comments from "@/components/Comments";

export default {
  components: {
    Comments,
  },
  props: ["rushee"],
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>
