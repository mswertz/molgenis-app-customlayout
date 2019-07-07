<template>
 <div>
    <div v-if="fullscreen == true">
        <button type="button" class="btn btn-primary" :disabled="index < 1" v-on:click="index -= 1">Prev</button>&nbsp;
        <button type="button" class="btn btn-primary" v-on:click="index += 1">Next</button>&nbsp;
        <button type="button" class="btn btn-primary" v-on:click="fullscreen=false;">Close fullscreen</button>
        <VRuntimeTemplate :template="vue"/>
     </div>
    <div v-if="fullscreen == false">
        <div class="container-fluid">
            <div class="card-group">
                <div class="card">
                <div class="card-body" >
                    <h1>MOLGENIS Entity Report Editor (ALPHA)</h1>
                    <div>This app allows you to retrieve data from MOLGENIS REST query and then edit a custom layout template to render the result.
                    </div>
                </div>
                </div>
            </div>
            <div class="card-group">
                    <div class="card">
                        <div class="card-body" >
                            <h2>Edit template below:</h2>
                            <hr/>
                            <PrismEditor v-model="template" language="js" line-numbers="linenumbers" style="width:100%"/>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h2>Preview result below:<div class="btn-group" role="group" >
                            <button type="button" class="btn btn-primary btn-sm" :disabled="index < 1" v-on:click="index -= 1">Prev</button>
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="index += 1">Next</button>
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="fullscreen=true;">Show fullscreen</button>
                            </div></h2>
                            <hr/>
                            <VRuntimeTemplate :template="vue"/>
                        </div>
                    </div>
            </div>
            <div class="card-group">
                <div class="card card-body" style="width: 100%">
                    <h2>Edit data source below</h2>
                    <div class="form-group">
                        <label for="url">Enter MOLGENIS REST query below (one record will be passed into template):</label>
                        <input class="form-control" type="" v-model="url"/>
                    </div>
                    <div v-if="loading" class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <pre>record = {{ record }}</pre>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//load prism somewhere
import "prismjs";
import "prismjs/themes/prism.css";
//vue-prism-editor dependency
import "vue-prism-editor/dist/VuePrismEditor.css";
import VRuntimeTemplate from "v-runtime-template";
import axios from 'axios';
import PrismEditor from 'vue-prism-editor';

export default {
  data: () => ({
    template: '<h1>{{record.name}}<span v-if="record.acronym">({{record.acronym}})</span></h1>\n{{record.description}}',
    results:[{name:"Loading...."}],
    index: 0, 
    loading: false,
    fullscreen: false,
    linenumbers: true, 
    url: "https://directory.bbmri-eric.eu/api/v1/eu_bbmri_eric_collections?expand=materials,biobank,diagnosis_available,network,contact,data_categories&num=10"
  }),
  components : {
      VRuntimeTemplate, PrismEditor
  },
  computed: {
  	record: function() {
    	return this.results[this.index];
    },
    vue: function() {
        return "<div>"+this.template.trim()+"</div>";
    }
  },
  watch : {
      url: function(val) {
          this.loading = true;
        axios.get(this.url)
        .then(response => {
            this.results = response.data.items; 
            this.loading = false;
        })
      }
  },
  mounted() {
    this.loading = true;
    axios.get(this.url)
    .then(response => {
        this.results = response.data.items; 
        this.loading = false;
    })
  }
};
</script>