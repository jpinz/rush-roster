<template>
  <section class="section">
    <div class="container">
      <nav class="level" v-if="rushees != null">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">PNMS</p>
            <p class="title">{{ rushees.length }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Interviews</p>
            <p class="title">{{ interviewed.length }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Bids</p>
            <p class="title">{{ bids.length }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">No Bids</p>
            <p class="title">{{ nobids.length }}</p>
          </div>
        </div>
      </nav>
      <input
        v-model="input"
        class="input"
        type="text"
        placeholder="Enter rushee name"
        id="searchbar"
      />
      <div>
        <b-button @click="setFilter(0)">All</b-button>
        <b-button @click="setFilter(1)">Interviewed</b-button>
        <b-button @click="setFilter(2)">Abstained</b-button>
        <b-button @click="setFilter(3)">Bids</b-button>
        <b-button @click="setFilter(4)">No Bids</b-button>
      </div>
      <b-button @click="addRusheeVisible = true">Add Rushee</b-button>
      <b-modal v-model="addRusheeVisible">
        <AddRushee />
      </b-modal>
      <sui-divider />

      <div class="container" v-if="rushees != null">
        <div class="ui doubling padded five column grid">
          <div class="column" v-for="rushee in rushees" :key="rushee.uid">
            <RusheeGridItem
              :rushee="rushee"
              v-on:open-modal="modalVisible = true"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RusheeGridItem from "@/components/RusheeGridItem";
import AddRushee from "@/views/AddRushee";
import * as fb from "../firebase";

export default {
  components: {
    RusheeGridItem,
    AddRushee,
  },
  data: () => ({
    modalVisible: false,
    addRusheeVisible: false,
    input: "",
    filter: 0,
    rushees: [],
  }),
  created() {
    var vm = this;
    const rusheesRef = fb.db.ref("pnms");
    rusheesRef.on("value", function(snapshot) {
      vm.rushees = Object.values(snapshot.val());
    });
  },
  computed: {
    interviewed() {
      return this.rushees.filter((rushee) => rushee.status != 0);
    },
    abstained() {
      return this.rushees.filter((rushee) => rushee.status == "abstained");
    },
    nobids() {
      return this.rushees.filter((rushee) => rushee.status == "nobid");
    },
    bids() {
      return this.rushees.filter((rushee) => rushee.status == "bid");
    },
    filteredRushees() {
      return this.rushees.filter((rushee) =>
        rushee.name.toLowerCase().includes(this.input.toLowerCase())
      );
    },
    computedRushees() {
      switch (this.filter) {
        case 0:
          return this.filteredRushees();
        case 1:
          return this.interviewed();
        case 2:
          return this.abstained();
        case 3:
          return this.nobids();
        case 4:
          return this.bids();
        default:
          return this.filteredRushees();
      }
    },
  },
  methods: {
    setFilter(newFilter) {
      this.filter = newFilter;
    },
  },
};
</script>

<style lang="scss" scoped></style>
