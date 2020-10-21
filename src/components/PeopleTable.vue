<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      @on-cell-click="onCellClick"
      theme="black-rhino"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'planet'">
          <a class="planet-link">Check planet</a>
        </span>
      </template>
    </vue-good-table>
    <Planet
      :planet="planet"
      v-if="showPlanet"
      @close="handleClosePlanet"
    />
  </div>
</template>

<script>
import { PEOPLE_REQUEST } from '@/store/actions';
import { getPlanet } from '@/utils/api';
import Planet from '@/components/Planet.vue';

export default {
  name: 'PeopleTable',
  components: {
    Planet,
  },
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
          sortable: false,
        },
      ],
      rows: [],
      planet: {},
      showPlanet: false,
      error: '',
    };
  },
  computed: {
    people() {
      return this.$store.getters.people;
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    async onCellClick(params) {
      if (params.column.field === 'planet') {
        try {
          const planet = await getPlanet(params.row.planet);
          this.planet = planet.data;
          this.showPlanet = true;
        } catch (e) {
          this.error = e.message;
        }
      }
    },
    populateTable() {
      this.people.forEach((person, i) => {
        const {
          name, height, mass, created, edited, homeworld,
        } = person;
        const tempPerson = {
          id: i,
          name,
          height,
          mass,
          created: this.formatDate(created),
          edited: this.formatDate(edited),
          planet: homeworld,
        };
        this.rows.push(tempPerson);
      });
    },
    handleClosePlanet() {
      this.showPlanet = false;
    },
  },
  async mounted() {
    await this.$store.dispatch(PEOPLE_REQUEST);
    this.populateTable();
  },
};
</script>

<style lang="scss">
.planet-link {
  cursor: pointer;
  color: #0c5021;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
}
</style>
