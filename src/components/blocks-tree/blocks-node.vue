<template>
  <div :class="nodeClass">
    <div class="org-tree-node-label">
      <div
        :class="innerLabelClass"
        :style="{ width: labelWidth }"
        @click="(e) => $emit('node-click', e, data, nodeContext)"
        @mouseout="(e) => $emit('node-mouseout', e, data, nodeContext)"
        @mouseover="(e) => $emit('node-mouseover', e, data, nodeContext)"
        @focus="(e) => $emit('node-focus', e, data, nodeContext)"
      >
        <slot name="node" :data="data" :context="nodeContext">
          <span v-if="!renderContent">{{ data[props.label] }}</span>
          <span v-else>{{ renderContent(data) }}</span>
        </slot>
        <span
          v-if="collapsable && !isLeaf"
          :class="nodeExpandBtnClass"
          @click.stop="onExpandBtnClick"
        ></span>
      </div>
    </div>
    <div
      v-if="expanded"
      class="org-tree-node-children"
      :id="data[props.key]"
      :data-type="data[props.typeKey]"
      :data-id="data[props.key]"
    >
      <draggable
        v-model="data[props.children]"
        :move="(e) => props.onMove(e, data, nodeContext)"
        @change="props.onChange"
        :filter="props.ignoreClass"
        v-bind="{
          animation: 200,
          ghostClass: props.ghostClass,
          chosenClass: props.chosenClass,
        }"
        group="children"
        item-key="id"
      >
        <template #item="{ element, index }">
          <blocks-node
            :key="nodeKey(element)"
            :data="element"
            :props="props"
            :collapsable="collapsable"
            :renderContent="renderContent"
            :labelWidth="labelWidth"
            :labelClassName="labelClassName"
            @node-expand="
              (e, data, context) => $emit('node-expand', e, data, context)
            "
            @node-focus="
              (e, data, context) => $emit('node-focus', e, data, context)
            "
            @node-click="
              (e, data, context) => $emit('node-click', e, data, context)
            "
            @node-mouseover="
              (e, data, context) => $emit('node-mouseover', e, data, context)
            "
            @node-mouseout="
              (e, data, context) => $emit('node-mouseout', e, data, context)
            "
          >
            <template #node="{ data, context }">
              <slot name="node" :data="data" :context="context"></slot>
            </template>
          </blocks-node>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import {
  defineComponent,
  computed,
  nextTick,
  watch,
  watchEffect,
  ref,
  Prop,
  reactive,
} from "vue";
import { NodeContext } from "../../../types/revsetter-maps";
export default defineComponent({
  name: "blocks-node",
  components: {
    draggable,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      default: () => ({
        label: "label",
        expand: "expand",
        children: "children",
        onMove: null,
        onChange: null,
        chosenClass: "",
        ghostClass: "",
        ignoreClass: ".ignore-elements",
        key: "id",
        typeKey: "type",
      }),
    },
    collapsable: {
      type: Boolean,
      default: false,
    },
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [String, Function],
  },

  setup(props, { slots, attrs, emit, expose }) {
    let isLeaf = computed(() =>
      Array.isArray(props.data[props.props.children]) &&
      props.data[props.props.children].length > 0
        ? false
        : true
    );
    let labelWidth = computed(() =>
      props.labelWidth
        ? typeof props.labelWidth == "number"
          ? `${props.labelWidth}px`
          : props.labelWidth
        : "auto"
    );
    let expanded = ref<boolean>(props.data[props.props.expand] || true);

    let nodeClass = computed(() => {
      return {
        "org-tree-node": true,
        "is-leaf": isLeaf.value,
        collapsed: !isLeaf.value && props.collapsable && !expanded.value,
      };
    });

    let innerLabelClass = computed(() => {
      let labelClassName =
        typeof props.labelClassName == "function"
          ? props.labelClassName(props.data)
          : props.labelClassName;

      return {
        "org-tree-node-label-inner": true,
        [labelClassName]: !!labelClassName,
      };
    });

    let nodeExpandBtnClass = computed(() => {
      return {
        "org-tree-node-btn": true,
        expanded: !!expanded.value,
      };
    });

    const toggleExpand = () => {
      expanded.value = !expanded.value;
    };

    const onExpandBtnClick = (e: Event) => {
      toggleExpand();
      emit("node-expand", e, props.data, nodeContext);
    };

    const nodeContext = <NodeContext>{
      isExpanded: () => expanded.value,
      toggleExpand,
    };

    const nodeKey = (child) => {
      var key = child[props.props.key];

      if (typeof key === "function") {
        return key(child);
      }
      return key;
    };

    return {
      nodeClass,
      innerLabelClass,
      isLeaf,
      nodeExpandBtnClass,
      onExpandBtnClick,
      labelWidth,
      expanded,
      data: props.data,
      nodeContext,
      nodeKey,
    };
  },
});
</script>