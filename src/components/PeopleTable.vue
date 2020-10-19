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
            filterFn: this.columnFilterFn,
            trigger: 'keyup',
          },
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        {
          id: 1, name: 'John', age: 20, createdAt: '', score: 0.03343,
        },
        {
          id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343,
        },
        {
          id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343,
        },
        {
          id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343,
        },
        {
          id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343,
        },
        {
          id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343,
        },
      ],
    };
  },
  methods: {
    onCellClick(params) {
      console.log(params);
    },
  },
};
</script>
