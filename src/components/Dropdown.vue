<template>
  <div class="dropdown" v-if="options">

    <!-- Dropdown Input -->
    <input class="dropdown-input"
           :name="name"
           @focus="showOptions()"
           @blur="exit()"
           @keyup="keyMonitor"
           v-model="searchFilter"
           :disabled="disabled"
           :placeholder="placeholder"
           autocomplete="off"/>

    <!-- Dropdown Menu -->
    <div class="dropdown-content"
         v-show="optionsShown">
      <div
          class="dropdown-item"
          @mousedown="selectOption(option)"
          v-for="(option, index) in filteredOptions"
          :key="index">
        {{ option.name || option.id || '-' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  template: 'Dropdown',
  props: {
    name: {
      type: String,
      required: false,
      default: 'dropdown',
      note: 'Input name'
    },
    options: {
      type: Array,
      required: true,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
      note: 'Options of dropdown. An array of options with id and name',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Please select an option',
      note: 'Placeholder of dropdown'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Disable the dropdown'
    },
    maxItem: {
      type: Number,
      required: false,
      default: 6,
      note: 'Max items showing'
    }
  },
  data() {
    return {
      selected: {name: null, id: null},
      optionsShown: false,
      searchFilter: ''
    }
  },
  created() {
    this.$emit('selected', this.selected);
  },
  computed: {
    filteredOptions() {
      const filtered = [];
      const regOption = new RegExp(this.searchFilter, 'ig');
      for (const option of this.options) {
        if (this.searchFilter.length < 1 || option.name.match(regOption)) {
          if (filtered.length < this.maxItem) filtered.push(option);
        }
      }
      return filtered;
    }
  },
  methods: {
    selectOption(option) {
      this.selected = option;
      this.optionsShown = false;
      this.searchFilter = this.selected.name;
      this.$emit('selected', this.selected);
    },
    showOptions() {
      if (!this.disabled) {
        this.searchFilter = '';
        this.optionsShown = true;
      }
    },
    exit() {
      console.log('EXIT')
      if (!this.selected.id) {
        this.selected = {name: null, id: null};
        this.searchFilter = '';
      } else {
        this.searchFilter = this.selected.name;
      }
      // this.$emit('selected', this.selected);
      this.optionsShown = false;
    },
    // Selecting when pressing Enter
    keyMonitor: function (event) {
      if (event.key === "Enter" && this.filteredOptions[0])
        this.selectOption(this.filteredOptions[0]);
    }
  },
  watch: {
    searchFilter(oldVal, newVal) {
      // console.log('SEARCH')
      console.log(oldVal)
      // console.log('SELECTED')
      console.log(newVal)
      if(this.selected.name != null){
        // console.log('ENLO')
        if(this.selected.name.localeCompare(this.searchFilter) === 0){
          // console.log('EQUALE')
          return
        }
      }
      if (this.filteredOptions.length === 0) {
        this.selected = {};
      } else {
        this.selected = this.filteredOptions[0];
      }
      this.$emit('filter', this.searchFilter);
    }
  }
};
</script>


<style lang="scss" scoped>
.dropdown {
  position: inherit;
  //display: block;
  margin: auto;

  .dropdown-input {
    //position: inherit;
    //background: #fff;
    cursor: pointer;
    //border: 1px solid #e7ecf5;
    //border-radius: 3px;
    color: #0f0;
    //display: block;
    font-size: .8em;
    padding: 6px;
    min-width: 250px;
    max-width: 250px;

    &:hover {
      //background: #f8f8fa;
    }
  }

  .dropdown-content {
    text-align: left;
    //position: relative;
    //background-color: #fff;
    margin-left: 202px;
    min-width: 248px;
    max-width: 400px;
    //max-height: 248px;
    //border: 1px solid #e7ecf5;
    //box-shadow: 0px -8px 34px 0px rgb(22, 136, 22);
    overflow: auto;
    z-index: 1000;

    .dropdown-item {
      color: #dddddd;
      font-size: .7em;
      line-height: 1em;
      padding: 8px;
      text-decoration: none;
      display: block;
      cursor: pointer;

      &:hover {
        background-color: #0f0;
        color: black;
      }
    }
  }

  .dropdown:hover .dropdowncontent {
    display: block;
  }
}
</style>