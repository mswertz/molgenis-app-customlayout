<template>
    <div>
        <component :is="component" :record="record" :layout="layout" v-if="component" />
    </div>
</template>

<script>
export default {
    props: {
        layout: {type: String, default: '../layouts/error.vue'},
        record: {type: Object}
    },
    data: function() {
        return {
            component: null
        }
    },
    computed: {
        loader() {
            return () => import(`../layouts/${this.layout}`)
        }

    },
    mounted() {
        this.loader()
            .then(() => {
                this.component = () => this.loader()
            })
            .catch(() => {
                this.component = () => import('../layouts/error.vue')
            })
    }
}
</script>