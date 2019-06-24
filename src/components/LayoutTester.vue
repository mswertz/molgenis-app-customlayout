<template>
  <div>
      Layout: 
      <select v-model="layout">
        <option value="collections1.vue">collections1</option>
      </select>
      Use pager to check different records.
      <button type="button" class="btn btn-primary" :disabled="index < 1" v-on:click="index -= 1">Prev</button>
      <button type="button" class="btn btn-primary" v-on:click="index += 1">Next</button>
      <div class="card card-body" style="height:90vh;">
      <ApplyLayout v-if="record" :layout="layout" :key="layout" :record="record"/>
      </div>
      For debuging json state below
      <pre>{{ results }}</pre>
  </div>
</template>

<script>
import axios from 'axios';
import ApplyLayout from './ApplyLayout.vue'

export default {
  data: function() {return { 
    results:[null],
    layout: 'collections1.vue',
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
    axios.get("https://directory.bbmri-eric.eu/api/v1/eu_bbmri_eric_collections?expand=materials,biobank,diagnosis_available,network,contact,data_categories&num=10")
    .then(response => {this.results = response.data.items})
  }
}
</script>