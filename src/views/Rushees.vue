<template>
  <section>
    <sui-grid :columns="3">
      <sui-grid-row :v-for="(row, i) in rushees" :key="i">
        <sui-grid-column v-for="(col, j) in 3" :key="j">
          <RusheeGridItem :rushee="i" />
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </section>
</template>

<script>
import RusheeGridItem from "@/components/RusheeGridItem";

export default {
  components: {
    RusheeGridItem,
  },
  data: () => ({
    rushees: [
      {
        name: "Big Chungus",
        description: "He fucked my mom",
        dorm: "The Moon",
        yog: 2020,
        hometown: "Worcester, MA",
        interviewed: false,
        major: "CS",
        phone_number: "9781231234",
        photo_url: "",
        added_by: "Julian Pinzer",
        ratings: [5, 4, 3],
        comments: {},
        questions: [],
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
