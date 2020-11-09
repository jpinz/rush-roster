import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router";

Vue.use(Vuex);

function roleToPermission(role) {
  switch (role) {
    case "normal":
      return 0;
    case "rush":
      return 1;
    case "headrush":
      return 2;
    case "admin":
      return 3;
    default:
      return 0;
  }
}

const store = new Vuex.Store({
  state: {
    userProfile: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
      state.userProfile.permission = roleToPermission(state.userProfile.role);
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth
        .signInWithEmailAndPassword(form.email, form.password)
        .catch(function() {
          // Handle Errors here.
          alert("Cannot login");
        });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async loginMicrosoft({ dispatch }, result) {
      var user = result.user;
      if (result.additionalUserInfo.isNewUser) {
        var newUser = result.additionalUserInfo.profile;
        fb.db
          .ref("bros/" + newUser.mail.substr(0, newUser.mail.indexOf("@")))
          .set({
            name: newUser.givenName + " " + newUser.surname,
            email: newUser.mail,
            sortKey: newUser.surname + newUser.givenName,
            verified: false,
            role: "normal",
          });
      }
      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user profile object in the database
      fb.db.ref("bros/" + form.email.substr(0, form.email.indexOf("@"))).set({
        name: form.name,
        email: form.email,
        sortKey: form.email + "Temp",
        verified: false,
        role: "normal",
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      var userId = user.email.substr(0, user.email.indexOf("@"));
      fb.db
        .ref("bros/" + userId)
        .once("value")
        .then(function(snapshot) {
          // set user profile in state
          var profile = snapshot.val();
          profile.id = userId;
          commit("setUserProfile", profile);
        });

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },
  },
});

export default store;
