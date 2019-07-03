<template>
 <div>
     <div class="container-fluid">
        <div class="card-group">
            <div class="card">
            <h1>MOLGENIS Entity Template Editor</h1>
            <div class="form-group">
                <label for="url">MOLGENIS REST query (one record will be passed into template):</label>
                <input class="form-control" type="" v-model="url"/>
            </div>
            </div>
        </div>
        <div class="card-group">
                <div class="card">
                    <div class="card-body" >
                        <h2>Edit template below:</h2>
                        <PrismEditor v-model="template" language="js" line-numbers="line-numbers" style="width:100%"/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h2>Preview result:
                        <button type="button" class="btn btn-primary btn-sm" :disabled="index < 1" v-on:click="index -= 1">Prev</button>
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="index += 1">Next</button>
                        </h2>
                        <VRuntimeTemplate :template="vue"/>
                    </div>
                </div>
        </div>
        <div class="card-group">
            <div class="card card-body" style="width: 100%">
                <h2>For debuging json state below</h2>
                <pre>record = {{ record }}</pre>
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
    "line-numbers": true, 
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
  mounted() {
    axios.get(this.url)
    .then(response => {this.results = response.data.items})
  }
};
</script>