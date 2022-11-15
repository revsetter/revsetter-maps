<template>
  <div class="organization-tree-container">
    <div class="organization-tree" :class="{ horizontal, collapsable }">
      <BlocksNode
        @is-drag-on="($e)=>is_drag_on=$e"
        :is-drag-on="is_drag_on"
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        @node-expand="
          (e, data, nodeContext) => $emit('node-expand', e, data, nodeContext)
        "
        @node-focus="
          (e, data, nodeContext) => $emit('node-focus', e, data, nodeContext)
        "
        @node-click="
          (e, data, nodeContext) => $emit('node-click', e, data, nodeContext)
        "
        @node-mouseover="
          (e, data, nodeContext) =>
            $emit('node-mouseover', e, data, nodeContext)
        "
        @node-mouseout="
          (e, data, nodeContext) => $emit('node-mouseout', e, data, nodeContext)
        "
      >
        <template #node="{data,context}">
          <slot name="node" :data="data" :context="context"></slot>
        </template>
      </BlocksNode>
    </div>
  </div>
</template>

<script lang="ts">
import BlocksNode from "./blocks-node.vue";
import { defineComponent, ref } from "vue";
import { PropsType } from "../../../types/revsetter-maps";
export default defineComponent({
  name: "blocks-tree",
  components: {
    BlocksNode,
  },
  data() {
    return {
      is_drag_on: false
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      default: () =>
        <PropsType>{
          label: "label",
          expand: "expand",
          children: "children",
          leafClass: "is-leaf-drag",
          chosenClass: "",
          ghostClass: "",
          key: "id",
        },
    },
    horizontal: Boolean,
    collapsable: Boolean,
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [Function, String],
  },
});
</script>
