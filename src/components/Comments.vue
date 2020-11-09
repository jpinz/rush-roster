<template lang="html">
  <sui-comment-group minimal>
    <h3 class="ui dividing header">Comments</h3>
    <sui-comment
      v-for="comment in Object.values(rushee.comments)"
      :key="comment.uid"
    >
      <a class="avatar">
        <span class="tag is-medium">
          {{ comment.bromoji }}
        </span>
      </a>
      <sui-comment-content>
        <a class="author">{{ comment.author }}</a>
        <sui-comment-metadata>
          <div>{{ comment.date }}</div>
        </sui-comment-metadata>
        <sui-comment-text>{{ comment.text }}</sui-comment-text>
      </sui-comment-content>
    </sui-comment>

    <sui-form reply>
      <textarea v-model="newComment" />
      <br />
      <br />
      <b-button class="is-primary" @click="reply">Reply</b-button>
    </sui-form>
  </sui-comment-group>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "../firebase";
import * as dayjs from "dayjs";

export default {
  props: ["rushee"],

  data: () => ({
    newComment: "",
  }),

  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    reply() {
      let vm = this;
      let rusheeUid = vm.rushee.uid;
      let commentId = fb.db.ref().push().key;

      fb.db.ref("pnms/" + rusheeUid + "/comments/" + commentId).set({
        uid: commentId,
        bromoji: vm.userProfile.bromoji,
        author: vm.userProfile.name,
        date: dayjs().format("MMM DD YYYY h:mm A"),
        text: vm.newComment,
      });
      vm.newComment = "";
    },
  },
};
</script>
