<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      @on-cell-click="onCellClick"
    />
  </div>
</template>

<script>
import { PEOPLE_REQUEST } from '@/store/actions';

export default {
  name: 'PeopleTable',
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Filter by name', // placeholder for filter input
            trigger: 'keyup',
          },
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        {
          id: 1, name: 'John', age: 20, score: 0.03343,
        },
        {
          id: 2, name: 'Jane', age: 24, score: 0.03343,
        },
        {
          id: 3, name: 'Susan', age: 16, score: 0.03343,
        },
        {
          id: 4, name: 'Chris', age: 55, score: 0.03343,
        },
        {
          id: 5, name: 'Dan', age: 40, score: 0.03343,
        },
        {
          id: 6, name: 'John', age: 20, score: 0.03343,
        },
      ],
    };
  },
  methods: {
    onCellClick(params) {
      console.log(params);
    },
  },
  async mounted() {
    await this.$store.dispatch(PEOPLE_REQUEST);
  },
};
</script>
