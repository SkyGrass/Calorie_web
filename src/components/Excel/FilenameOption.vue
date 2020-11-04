<template>
  <div style="display:inline-block;">
    <!-- $t is vue-i18n global function to translate lang -->
    <el-input
      clearable
      :placeholder="$t('excel.placeholder')"
      v-model="filename"
      style="width:240px;"
      prefix-icon="el-icon-document"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    filename: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
