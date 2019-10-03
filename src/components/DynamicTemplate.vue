<template>
 <div>
    <RecordViewer
        v-if="fullscreen" 
        :url="url" 
        :template="template" 
        buttonText="Close fullscreen" 
        @recordChanged = "recordChanged"
        @buttonClick="fullscreen=false">
    </RecordViewer>
    <div v-else>
        <div class="container-fluid">
            <div class="card-group">
                <div class="card">
                <div class="card-body" >
                    <h1>MOLGENIS Entity Report Editor (ALPHA)</h1>
                    <div>This app allows you to retrieve data from MOLGENIS REST query and then edit a custom layout template to render the result.
                    <br/><div class="form-group"><label>Load an example:</label><select class="form-control col-7" v-model="selectedExample"><option v-for="e in exampleKeys" :value="e">{{e}}</option></select></div>
                    </div>
                </div>
                </div>
            </div>
            <div class="card-group">
                    <div class="card">
                        <div class="card-body" >
                            <h2>Edit template below: <button v-on:click="beautify" class="btn btn-primary btn-sm">format template</button></h2>
                            <hr/>
                            <PrismEditor v-model="template" language="js" line-numbers="linenumbers" style="width:100%"/>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h2>Preview result below:</h2>
                            <RecordViewer
                                :url="url" 
                                :template="template" 
                                buttonText="Fullscreen" 
                                @buttonClick="fullscreen=true"
                                @recordChanged = "recordChanged">
                            </RecordViewer>
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
                    <pre v-else>record = {{ record }}</pre>
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
import YAML from 'yamljs';
import PrismEditor from 'vue-prism-editor';
import beautify from 'vue-beautify';

import RecordViewer from './RecordViewer.vue'

var yaml = YAML.load('./examples.yaml');

export default {
  data: () => ({
    url: "https://directory.bbmri-eric.eu/api/v1/eu_bbmri_eric_collections?expand=materials,biobank,diagnosis_available,network,contact,data_categories&num=10",
    template: '<h1>{{record.name}}<span v-if="record.acronym">({{record.acronym}})</span></h1>\n{{record.description}}',
    record: {},
    examples: yaml,
    selectedExample: 'biobank1',
    loading: true,
    fullscreen: false,
    linenumbers: true 
  }),
  components : {
      PrismEditor, RecordViewer
  },
  computed: {
    exampleKeys:  function() {
        return Object.keys(this.examples);
    }
  },
  methods: {
    beautify: function(event) {
      this.template = beautify(this.template);
    },
    recordChanged: function(record) {
        this.loading = false
        this.record = record
    }
  },
  watch : {
      url: function() {
          this.loading = true
      },
      selectedExample: function(val) {
          this.url = this.examples[val].url;
          this.template = this.examples[val].template;
      }
  }
};
</script>