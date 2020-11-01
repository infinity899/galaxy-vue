<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      theme="black-rhino"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'planet'">
          <a
            class="planet-link"
            @click="showPlanetDetails(props.row.planet)"
          >{{ props.row.planet }}</a>
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
import { PEOPLE_REQUEST, PLANETS_REQUEST, PEOPLE_MATCH_PLANET } from '@/store/actions';
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
      homeWorlds: [],
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
    showPlanetDetails(payloadPlanet) {
      this.planet = this.$store.getters.planets
        .find((planet) => planet.name.toUpperCase() === payloadPlanet.toUpperCase());
      this.showPlanet = true;
    },
    async handlePlanets() {
      await this.people.forEach((person) => {
        const { homeworld } = person;
        // eslint-disable-next-line no-unused-expressions
        this.homeWorlds.indexOf(homeworld) === -1 ? this.homeWorlds.push(homeworld) : ''; // create array of unique planets
      });
    },
    populateTable() {
      this.people.forEach((person, i) => {
        const {
          name, height, mass, created, edited, planet,
        } = person;
        const tempPerson = {
          id: i,
          name,
          height,
          mass,
          planet: planet.name,
          created: this.formatDate(created),
          edited: this.formatDate(edited),
        };
        this.rows.push(tempPerson);
      });
    },
    handleClosePlanet() {
      this.showPlanet = false;
    },
    async getPlanets() {
      const requests = this.homeWorlds.map(async (planet) => {
        await this.$store.dispatch(PLANETS_REQUEST, planet);
      });
      await Promise.all(requests);
    },
  },
  async created() {
    await this.$store.dispatch(PEOPLE_REQUEST); // get people from API
    await this.handlePlanets(); // filter unique planets of people
    await this.getPlanets(); // request planets details
    await this.$store.dispatch(PEOPLE_MATCH_PLANET); // add planet to each person
    this.populateTable(); // populate table
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
