import {grammarCatItem} from "./grammar-cat-item.model";

export interface grammarCat {
    name: string;
    cat: grammarCatItem[];
    open: boolean;
    disabled: boolean;
}
