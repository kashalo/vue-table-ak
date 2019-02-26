<template>
  <div>
    <button
      id="add-new-btn"
      class="int-btn int-btn-primary int-btn-small"
      @click="addNew = !addNew"
    >Add New</button>
    <div
      :class="addNew ? 'modal-mask-ak visible-ak' : 'modal-mask-ak hidden-ak' "
      tabindex="-1"
      role="dialog"
    ></div>
    <div v-if="addNew" class="modal-container-ak">
      <form @submit.prevent="newItemValues">
        <div class="modal-content-ak">
          <div class="modal-header-ak">
            <h3 class="modal-title-ak">Add New Item</h3>
            <slot name="header-button-ak">
              <button type="button" class="close-ak" @click="addNew = false">
                <span aria-hidden="true">&times;</span>
              </button>
            </slot>
          </div>
          <div class="modal-body-ak">
            <div class="int-flex-container">
              <div class="int-column-5" v-for="(item , index) in newItemsFields" :key="index">
                <label class="int-lable" :for="item.name">{{item.name}}</label>
                <input
                  class="int-input"
                  :name="item.name"
                  :type="item.type"
                  :value="item.value"
                  v-model="item.value"
                  required
                >
              </div>
            </div>
          </div>
          <div class="modal-footer-ak">
            <button type="button" class="int-btn int-btn-small" @click="addNew = false">Close</button>
            <input type="submit" class="int-btn int-btn-primary int-btn-small" value="Submit">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: "TableAdd",
  props: ["newItemsFields"],
  data() {
    return {
      addNew: false,
      newItem: {}
    };
  },
  methods: {
    newItemValues() {
      let data = {};
      this.newItemsFields.forEach(element => {
        data[element.name.toLowerCase()] = element.value;
      });
      this.addNew = false;
      return events.$emit("newItemsadded", data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/TableAdd";
</style>
