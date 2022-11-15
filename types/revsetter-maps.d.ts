export interface NodeContext {
    isExpanded():boolean;
    toggleExpand():void;
}

export interface PropsType {
    label: string;
    expand: string;
    leafClass: string;
    chosenClass: string;
    ghostClass: string;
    children: string;
    key?:any| (() => any);
    onMove:()=>true;
    onMoveEnd:()=>true;
}