<template>
 <div>
    <RecordViewer
        v-if="fullscreen"
        :table="table"
        :attrs="attrs"
        :template="template"
        :id="id"
        buttonText="Edit"
        @recordChanged="recordChanged"
        @select="select"
        @buttonClick="fullscreen=false">
    </RecordViewer>
    <div v-else>
        <div class="container-fluid">
            <div class="card-group">
                <div class="card">
                <div class="card-body" >
                    <h1>MOLGENIS Entity Report Editor (ALPHA)</h1>
                    <div>This app allows you to retrieve data from MOLGENIS REST query and then edit a custom layout template to render the result.
                    <br/>
                    <div class="form-group">
                        <label>Load an example:</label>
                        <select class="form-control col-7" :value="selectedExample" @input="selectExample">
                            <option v-for="e in exampleKeys" :value="e" :key="e">{{e}}</option>
                        </select>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="card-group" v-if="selectedExample">
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
                                :table="table"
                                :attrs="attrs"
                                :id="id"
                                :template="template"
                                buttonText="Fullscreen" 
                                @buttonClick="fullscreen=true"
                                @select="select"
                                @recordChanged = "recordChanged">
                            </RecordViewer>
                        </div>
                    </div>
            </div>
            <div class="card-group" v-if="selectedExample">
                <div class="card card-body" style="width: 100%">
                    <h2>Edit data source below</h2>
                    <div class="form-group">
                        <label for="table">Table:</label>
                        <input name="table" class="form-control" v-model="table"/>
                    </div>
                    <div class="form=group">
                        <label for="url">attrs:</label>
                        <input name="attrs" class="form-control" v-model="attrs"/>
                    </div>
                    <div v-if="record === null" class="spinner-border" role="status">
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
  data () {
    const table = this.$route.params.id || null
    const example = yaml[table] || { template: '', idAttribute: '', attrs: '' }
    return {
        record: {},
        examples: yaml,
        loading: true,
        table,
        fullscreen: !!table,
        linenumbers: true,
        ...example
    }
  },
  components : {
      PrismEditor, RecordViewer
  },
  computed: {
    exampleKeys:  function() {
        return Object.keys(this.examples);
    },
    selectedExample () {
        return this.$route.params.id || null
    },
    id () {
        return decodeURI(this.$route.params.id2) || null
    }
  },
  methods: {
    select (id) {
        this.$router.push({path: `/${this.selectedExample}/${encodeURI(id)}`})
    },
    selectExample (event) {
        this.table = event.target.value
        const example = this.examples[this.table]
        this.host = example.host
        this.template = example.template
        this.idAttribute = example.idAttribute
        this.attrs = example.attrs
        this.template = example.template
        this.$router.push({path: `/${event.target.value}`})
    },
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
      }
  }
};
</script>