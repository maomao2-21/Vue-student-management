<template>
  <vue-editor
    v-model="form[prop]"
    :editorToolbar="editorToolbar"
    @blur="hanleBlur"
  ></vue-editor>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  props: {
    form: Object,
    prop: String,
  },
  data() {
    return {
      editorToolbar: [
        [
          {
            header: [false, 1, 2, 3, 4, 5, 6],
          },
        ],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          {
            align: "",
          },
          {
            align: "center",
          },
          {
            align: "right",
          },
          {
            align: "justify",
          },
        ],
        ["blockquote", "code-block"],
        [
          {
            list: "ordered",
          },
          {
            list: "bullet",
          },
          {
            list: "check",
          },
        ],
        [
          {
            indent: "-1",
          },
          {
            indent: "+1",
          },
        ], // outdent/indent
        [
          {
            color: [],
          },
          {
            background: [],
          },
        ],
      ],
    };
  },
  methods: {
    hanleBlur(event) {
      this.$emit("blur", event);
    },
  },
};
</script>

<style lang="sass">
.ql-snow.ql-toolbar
  line-height: 24px
</style>