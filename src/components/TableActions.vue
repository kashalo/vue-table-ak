<template>
  <div class="int-flex-container">
    <div class="int-flex-item">
      <!-- Bulk Actions Div -->
      <div v-show="$parent.bulkActions()">
        <select class="int-select" v-model="$parent.action">
          <option :value="null">Bulk Actions</option>
          <option
            v-for="(action , index) in $parent.bullkActionsList"
            :key="index"
            :value="action"
          >{{action}}</option>
        </select>
        <button class="int-btn int-btn-white" @click="$parent.triggerAction($parent.action)">Apply</button>
      </div>
      <!-- end Bulk Actions Div -->
      <select class="int-select" v-model="$parent.selectedDate" v-if="$parent.dateActivation">
        <option :value="null">Filter By Date</option>
        <option v-for="date in $parent.dates" :key="date.id" :value="date">{{date}}</option>
      </select>
      <select
        v-model="$parent.limit"
        @change="$parent.limitUpdated($event.target.value)"
        class="int-select"
      >
        <option
          v-for="(limit , index) in $parent.limits"
          :key="index"
          :value="limit"
          :disabled="$parent.paginationLength < limit"
        >{{limit}}</option>
      </select>

      <div class="dropdown">
        <button
          class="int-btn int-btn-white int-btn-dropdown"
          @click="$parent.showDropdownContent = !$parent.showDropdownContent"
        >Columns</button>
        <div
          :class=" $parent.showDropdownContent ? 'int-dropdown-content show' : 'int-dropdown-content'  "
        >
          <div
            class="int-checkbox-group"
            v-for="(column , index) in $parent.columnsSet"
            :key="index"
          >
            <input
              type="checkbox"
              v-model="column.active"
              :aria-label="'Checkbox for '+ column.name"
            >
            <label :for="index">{{column.name}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="int-flex-item">
      <input
        type="text"
        v-model="$parent.searchKeyword"
        placeholder="Instance Search"
        class="int-search-input"
      >
    </div>
  </div>
</template>


<script>
export default {
  name: "TableActions"
};
</script>
