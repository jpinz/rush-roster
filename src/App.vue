<template>
  <div id="app">
    <Header v-if="showNav"></Header>
    <Tabs />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/views/Header";
import Tabs from "@/components/Tabs";

export default {
  components: {
    Header,
    Tabs,
  },
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return Object.keys(this.userProfile).length > 1;
    },
  },
};
</script>

<style>
@import url("https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css");

.App {
  text-align: center;
}

#appHeader {
  background-color: rgb(0, 151, 160) !important;
  padding-top: 30px;
  padding-bottom: 30px;
  color: aliceblue;
}
#awaitingApproval {
  width: 1000px;
}

.Search {
  padding: 10px;
}
.main-div {
  -webkit-column-width: 100px;
  -moz-column-width: 100px;
  column-width: 100px;
}

.accordion-button {
  background-color: rgb(0, 151, 160) !important;
}

/* center the tab buttons */
.ui.secondary.pointing.menu a:first-child {
  margin-left: auto;
}
.ui.secondary.pointing.menu a:last-child {
  margin-right: auto;
}

.ui.comments {
  margin-left: auto;
  margin-right: auto;
}

/* center the contents of the rushees tab */
div.accordion.ui.styled {
  margin: auto;
  margin-bottom: 12px;
}

/* form fields margins */
#form div {
  margin: 5px;
  padding-right: 5px;
}

#rating {
}

#rating-length {
  float: right;
}

#addedBy {
  padding-left: 10px;
}
#presName {
  padding-left: 10px;
}

/* comment reply button */
#addReply {
  margin-bottom: 12px;
}

.fab {
  float: top;
  position: inherit;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}
</style>
