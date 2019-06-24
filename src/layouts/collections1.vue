<template>
    <div>
        <br/>Collection {{record.name}}

        <br/><br/>Material types:
        <ul>
            <li v-for="c in record.data_categories.items">{{c.label}}</li>
        </ul>
    </div>
</template>


<!-- below not needed, but that is where data is passed into tmplate -->
<script>
export default {
    props: {
        record: Object
    }
}
</script>
