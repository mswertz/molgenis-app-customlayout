<template>
    <div>
        <button type="button" class="btn btn-secondary btn-sm" :disabled="index < 1" v-on:click="prev">Prev</button>&nbsp;
        <button type="button" class="btn btn-secondary btn-sm" :disabled="index >= ids.length - 1" v-on:click="next">Next</button>&nbsp;
        <button type="button" class="btn btn-secondary btn-sm" @click="$emit('buttonClick')">{{buttonText}}</button>
        <hr/>
        <div v-if="loading" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <VRuntimeTemplate :template="vue" v-if="record"/>
    </div>
</template>
<script>
import axios from 'axios'
import VRuntimeTemplate from "v-runtime-template"

// loads results from URL and allows you to scroll through them
export default {
    props: ['table', 'id', 'attrs', 'template', 'buttonText'],
    components : {
      VRuntimeTemplate
    },
    data () {
        return {
            ids: [],
            loading: false,
            record: null
        }
    },
    methods: {
        next () {
            this.$emit('select', this.ids[this.index + 1])
        },
        prev () {
            this.$emit('select', this.ids[this.index - 1])
        }
    },
    computed: {
        index: function () {
            return this.ids.indexOf(this.id)
        },
        vue: function() {
            return "<div>"+this.template.trim()+"</div>";
        },
        loading () {
            return this.record === null && this.recordUrl != null
        },
        idsUrl () {
            return `/api/v2/${this.table}?attrs=~id&num=10000`
        },
        recordUrl () {
            if (this.ids.indexOf(this.id) === -1) {
                return null
            }
            return `/api/v2/${this.table}/${encodeURI(this.id)}?attrs=${this.attrs}`
        }
    },
    watch : {
        record: function(val) {
            this.$emit('recordChanged', val)
        },
        idsUrl: {
            // fetch IDs
            async handler (value) {
                const response = await axios.get(value)
                if (value === this.idsUrl) {
                    const idAttribute = response.data.meta.idAttribute
                    this.ids = response.data.items.map((it) => it[idAttribute])
                    if (this.ids.length > 0 && this.id === null ) {
                        this.$emit('select', this.ids[0])
                    }
                }
            },
            immediate: true
        },
        recordUrl: {
            async handler (value) {
                if (value === null) {
                    this.record = null
                    this.loading = false
                } else {
                    this.loading = true
                    this.record = null
                    const response = await axios.get(value)
                    if (this.recordUrl === value) {
                        this.record = response.data
                        this.loading = false
                    }
                }
            }
        }
    }
}
</script>