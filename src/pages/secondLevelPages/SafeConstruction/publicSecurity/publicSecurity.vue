<template>
  <div class="publicSecurity">
    <gmt-search-list>
      <release-content-list></release-content-list>
    </gmt-search-list>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
import releaseContentList from '@/components/releaseContentList'
export default {
  components: {
    GmtSearchList,
    releaseContentList
  }
}
</script>

<style>

</style>
