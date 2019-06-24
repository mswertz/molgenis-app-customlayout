<template>
  <div>
      Choose layout
      <select v-model="layout">
        <option selected value="collections1.vue">collections1</option>
      </select>
      <br/>
      Layout below this line, above next line. 
      <br/>Use pager to check different records.
      <br/>
      <button :disabled="index < 1" v-on:click="index -= 1">Prev</button>
      <button v-on:click="index += 1">Next</button>
      <hr/>
      <ApplyLayout :layout="layout" :key="layout" :record="record"/>
      <hr/>
      For debuging json state below
      <pre>{{ results }}</pre>
  </div>
</template>

<script>
import axios from 'axios';
import ApplyLayout from './ApplyLayout.vue'

export default {
  data: function() {return { 
    results:[{name:"Loading ... wait a minute ..."}],
    layout: 'error.vue',
    index: 0
  }},
  components: {
    ApplyLayout
  },
  computed: {
  	record: function() {
    	return this.results[this.index];
    }
  },
  mounted() {
    axios.get("https://directory.bbmri-eric.eu/api/v1/eu_bbmri_eric_collections?expand=materials,biobank,diagnosis_available,network,contact,data_categories")
    .then(response => {this.results = response.data.items})
  }
}
</script>