<template>
  <div class="int-flex-center-container">
    <div class="error" v-show="!togglerSpinner">
      <h1>
        <slot name="heading-text">500</slot>
      </h1>
      <h2>
        <slot name="secondary-heading-text">Oops! Something went wrong</slot>
      </h2>
      <p>
        <slot name="error-text"></slot>
      </p>
    </div>
    <div
      :class="togglerSpinner ? 'int-spinner-background int-spinner-visible ' : 'int-spinner-background int-spinner-hidden ' "
      tabindex="-1"
      role="dialog"
    >
      <div class="spinner" v-show="togglerSpinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      togglerSpinner: true
    };
  },
  mounted() {
    setTimeout(() => (this.togglerSpinner = false), 3500);
  }
};
</script>
 
 <style lang="scss">
@import "../scss/Error";
</style>
 