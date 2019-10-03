<template>
    <div>
        <button type="button" class="btn btn-secondary btn-sm" :disabled="index < 1" v-on:click="index -= 1">Prev</button>&nbsp;
        <button type="button" class="btn btn-secondary btn-sm" :disabled="index >= results.length - 1" v-on:click="index += 1">Next</button>&nbsp;
        <button type="button" class="btn btn-secondary btn-sm" @click="$emit('buttonClick')">{{buttonText}}</button>
        <hr/>
        <VRuntimeTemplate :template="vue"/>
    </div>
</template>
<script>
import axios from 'axios'
import VRuntimeTemplate from "v-runtime-template"

// loads results from URL and allows you to scroll through them
export default {
    props: ['url', 'template', 'buttonText'],
    components : {
      VRuntimeTemplate
    },
    data: () => ({
        index: 0,
        results:[{name:"Loading...."}],
        loading: false
    }),
    computed: {
        record: function() {
    	    return this.results[this.index];
        },
        vue: function() {
            return "<div>"+this.template.trim()+"</div>";
        },
    },
    watch : {
      record: function(val) {
        this.$emit('recordChanged', val)
      },
      url: {
        handler: function(val) {
            this.loading = true
            this.index = 0
            axios.get(this.url).then((response) => {
                if (this.url === val) {
                    this.results = response.data.items
                    this.loading = false
                }
            })
        },
        immediate: true 
      }
    }
}
</script>