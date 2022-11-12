import {App} from 'vue';

import {NodeContext,PropsType} from './revsetter-maps';


export default class BlocksTree {
    static name: string;
  
    static install: (app: App,settings?:{nodeName:string,treeName:string}) => any;
    $props: Record<string, any>;
}

export class BlocksNode {

    static name: string;
    $props: Record<string, any>;
}

export {NodeContext,PropsType}
