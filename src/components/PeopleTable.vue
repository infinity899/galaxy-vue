<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      @on-cell-click="onCellClick"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'planet'">
          <a @click="handlePlanet">check planet details</a>
        </span>
      </template>
    </vue-good-table>
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
          label: 'Height',
          field: 'height',
          type: 'number',
        },
        {
          label: 'Mass',
          field: 'mass',
          type: 'number',
        },
        {
          label: 'Created',
          field: 'created',
          type: 'string',
        },
        {
          label: 'Edited',
          field: 'edited',
          type: 'string',
        },
        {
          label: 'Planet name',
          field: 'planet',
          type: 'string',
        },
      ],
      rows: [],
    };
  },
  methods: {
    formatDate(date) {
      return date.match(/.+?(?=T)/)[0]; // @TODO get time as well
    },
    handlePlanet() {
      console.log('awesome');
    },
    onCellClick(params) {
      console.log(params.rowIndex);
    },
    populateTable() {
      this.$store.getters.people.forEach((person, i) => {
        const tempPerson = {
          id: i,
        };
        tempPerson.name = person.name;
        tempPerson.height = person.height;
        tempPerson.mass = person.mass;
        tempPerson.created = this.formatDate(person.created);
        tempPerson.edited = this.formatDate(person.edited);
        this.rows.push(tempPerson);
      });
    },
  },
  async mounted() {
    await this.$store.dispatch(PEOPLE_REQUEST);
    this.populateTable();
  },
};
</script>
