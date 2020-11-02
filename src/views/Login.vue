<template>
  <div id="login">
    <section class="section">
      <h1 class="title has-text-centered">Login</h1>
      <div class="columns">
        <div class="column is-one-third" />
        <div class="column is-one-third">
          <div class="card">
            <div class="card-header is-centered">
              <h2 class="card-header-title is-centered">
                Sign in to Your Account
              </h2>
            </div>
            <div class="card-content">
              <form v-on:submit.prevent>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input
                      class="input"
                      type="email"
                      placeholder="example@email.com"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input class="input" type="password" v-model="password" />
                  </div>
                </div>
                <button
                  type="submit"
                  class="button is-primary"
                  v-on:click="signIn"
                >
                  Sign-in
                </button>
                <br />
                <br />
                <b-button type="is-danger" v-on:click="loginWithMicrosoft">
                  Sign in with Microsoft
                </b-button>
                <br />
                <br />
                <button
                  type="submit"
                  class="button is-info"
                  v-on:click="resetPassword"
                >
                  Forgot Password?
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { firebase } from "../firebase";

var provider = new firebase.auth.OAuthProvider("microsoft.com");

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    loginWithMicrosoft() {
      let vm = this;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // User is signed in.
          // IdP data available in result.additionalUserInfo.profile.
          // OAuth access token can also be retrieved:
          // result.credential.accessToken
          // OAuth ID token can also be retrieved:
          // result.credential.idToken
          vm.$store.dispatch("loginMicrosoft", result);
        })
        .catch(function(error) {
          // Handle error.
          alert("Not able to login!");
          console.log(error);
        });
    },
    resetPassword() {
      var auth = firebase.auth();
      let email = prompt("Enter your email address");
      if (!email) {
        alert("Enter an email address");
        return;
      }
      auth
        .sendPasswordResetEmail(email)
        .then(function() {
          // Email sent.
          alert("Email sent!");
        })
        .catch(function(error) {
          // An error happened.
          alert(error.message);
        });
    },
  },
};
</script>
