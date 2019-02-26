<template>
  <div>
    <div v-show="feedValid">
      <div class="int-flex-container">
        <div class="int-flex-item">
          <h2>{{title}}</h2>
        </div>
        <div class="int-flex-item" v-if="activateAddNew">
          <table-add :newItemsFields="newItemFields"></table-add>
        </div>
      </div>
      <table-actions></table-actions>
      <div class="int-flex-container">
        <table class="int-table">
          <colgroup>
            <col class="int-first-column">
            <col>
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  :checked="checkboxesData.length !== 0"
                  id="check-all-items"
                  @click="checkAllItems"
                >
              </th>
              <th
                scope="col"
                v-for="(column , index)  in filteredColumn "
                :key="index"
                :id="column.name"
              >
                <a
                  href="#"
                  class="int-sort-by"
                  @click.prevent="sort(column.name , order = !order)"
                >{{column.name}}</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Bulk action tr -->
            <tr v-show="activateBulkEdit" class="inline-bulk-edit-tr">
              <td colspan="12">
                <form @submit.prevent="bulkActionUpdate" id="bulk-update-form">
                  <div class="int-flex-container">
                    <div
                      class="int-column-5"
                      v-for="(item , index) in editeItemsFields"
                      :key="index"
                    >
                      <label class="int-lable" :for="item.name">{{capFirstLetter(item.name)}}</label>
                      <input
                        class="int-input"
                        :name="item.name"
                        :type="item.type"
                        :value="item.value"
                        v-model="item.value"
                        :required="item.required"
                      >
                    </div>
                  </div>
                  <div class="int-inline-edit-buttons">
                    <button
                      class="int-btn int-btn-white int-btn-small"
                      @click="activateBulkEdit = false"
                    >Cancel</button>
                    <input
                      type="submit"
                      class="int-btn int-btn-primary int-btn-small"
                      value="Update"
                    >
                  </div>
                </form>
              </td>
            </tr>
            <!-- end Bulk action tr -->
            <tr v-for="item in filteredList()" :key="item[uniqueKey]">
              <td scope="col" headers="Select">
                <input type="checkbox" :value="item[uniqueKey]" v-model="checkboxesData">
              </td>
              <td
                v-for="(column , index)  in filteredColumn "
                :key="index"
                :contenteditable="!!column.isEditable"
                v-on="{ blur: column.isEditable ? itemChanged : '' }"
                :data-index="item[uniqueKey]"
                :headers="column.name"
                scope="col"
              >
                <template
                  v-if="dateActivation && column.name === 'date' && item[column.name] !== undefined"
                >{{[item[column.name] , dateFormat] | formatDate}}</template>
                <template v-else>{{item[column.name] }}</template>
              </td>
            </tr>
            <tr v-show="notItem">
              <td colspan="100">No Items to display</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="int-flex-container">
        <span>Showing {{paginationLimit}} of {{paginationLength}} entries</span>
        <paginator :data-length="paginationLength" :data-limit="paginationLimit" @changed="next"></paginator>
      </div>
    </div>
    <error-page v-show="!feedValid">
      <span slot="error-text">The Data supplied is either empty or not valid please check the data</span>
    </error-page>
  </div>
</template>
     

<script>
import Paginator from "vue-paginator-ak";
import TableActions from "./TableActions.vue";
import ErrorPage from "./ErrorPage.vue";
import TableAdd from "./TableAdd.vue";
import methods from "../inc/TableMethods";
import computed from "../inc/TableComputed";
import filters from "../inc/TableFilters";
export default {
  name: "InteractiveTable",
  components: {
    Paginator,
    TableActions,
    TableAdd,
    ErrorPage
  },
  props: {
    feed: {
      default: function() {
        return [];
      },
      type: Array
    },
    config: {
      default: function() {
        return {};
      },
      type: Object
    }
  },
  data() {
    return {
      searchKeyword: "",
      order: true,
      dates: [],
      start: 0,
      end: 10,
      showDropdownContent: false,
      allItemsCheckd: false,
      columnsArray: [],
      selectedDate: null,
      actions: {
        edite: true,
        delete: true
      },
      activateBulkEdit: false,
      checkboxesData: [],
      action: null,
      limitVal: 10,
      page: 1
    };
  },

  filters,
  computed,
  methods
};

import Vue from "vue";
import { type } from "os";
//Register gloabl window events
window.events = new Vue();
require("flash-messages-ak");
</script>
<style  lang="scss">
@import "../scss/Interactive.table";
</style>
