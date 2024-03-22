<template>
    <div class="tabs">
        <div class="tab_title">
            <div class="tabitem" v-for="(item, index) in tabs" :key="item.id" :data-index="index" @click="handleClick" :class="item.isActive?'active': ''">
                    {{item.value}}
                <div :class="item.isActive ? 'tabLine' : ''"></div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return{}
    },
    props: {
        tabs: {
            type: Array,
            // default: []
        }
    },
    methods: {
        // 点击tab栏
        handleClick(e) {
            const { index } = e.target.dataset;
            this.$emit("handleClick", { index });
        },
    }
}
</script>

<style scoped lang="scss">
@import '../style/tpdbtab.scss'
</style>