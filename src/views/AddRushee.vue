<template>
  <div class="card">
    <div class="card-content">
      <b-field
        label="Name"
        :type="{ 'is-danger': !name }"
        :message="{ 'Please enter a name': !name }"
      >
        <b-input placeholder="Dean Snoddy" v-model="name"></b-input>
      </b-field>
      <b-field label="Major">
        <b-input placeholder="ECE" v-model="major"></b-input>
      </b-field>
      <b-field label="Year of Graduation">
        <b-input v-model="yog"></b-input>
      </b-field>
      <b-field label="Description">
        <b-input
          type="textarea"
          placeholder="He was in my volleyball class and kid pulls..."
          v-model="description"
        ></b-input>
      </b-field>
      <b-field label="Hometown">
        <b-input placeholder="Worcester, MA" v-model="hometown"></b-input>
      </b-field>
      <b-field label="Dorm + Room">
        <b-input placeholder="Morgan 438" v-model="dorm"></b-input>
      </b-field>
      <b-field label="CA / RA">
        <b-input
          placeholder="Noah Roberts / Toshak Patel"
          v-model="ca_ra"
        ></b-input>
      </b-field>
      <b-field label="Phone Number">
        <b-input
          type="tel"
          placeholder="732-856-1395"
          v-model="phone_number"
        ></b-input>
      </b-field>
      <b-field label="Grades">
        <b-input placeholder="ABA BBC" v-model="grades"></b-input>
      </b-field>
      <b-field>
        <b-upload v-model="dropFile" drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"> </b-icon>
              </p>
              <p>Drop picture of the rushee here</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <b-button type="is-primary" @click="add">Add Rushee</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "../firebase";

export default {
  data: () => ({
    name: "",
    major: "",
    description: "",
    yog: new Date().getFullYear(),
    hometown: "",
    dorm: "",
    ca_ra: "",
    phone_number: "",
    grades: "",
    dropFile: null,
  }),
  methods: {
    add() {
      let vm = this;
      let pnmId = fb.db.ref().push().key;
      fb.db.ref("pnms/" + pnmId).set({
        name: vm.name,
        uid: pnmId,
        major: vm.major,
        description: vm.description,
        yog: vm.yog,
        hometown: vm.hometown,
        dorm: vm.dorm,
        ca_ra: vm.ca_ra,
        phone_number: vm.phone_number,
        grades: vm.grades,
        added_by: vm.userProfile.name,
        added_by_uid: vm.userProfile.id,
        status: 0,
        ratings: 0,
        comments: 0,
        questions: 0,
      });

      // ImageTools.resize(
      //   vm.dropFile,
      //   {
      //     width: 320, // maximum width
      //     height: 240, // maximum height
      //   },
      //   function(blob, didItResize) {
      //     // didItResize will be true if it managed to resize it, otherwise false (and will return the original file as 'blob')
      //     document.getElementById("preview").src = window.URL.createObjectURL(
      //       blob
      //     );
      //     // you can also now upload this blob using an XHR.
      //   }
      // );
    },
  },
  computed: {
    ...mapState(["userProfile"]),
  },
};
</script>

<style lang="scss" scoped></style>
