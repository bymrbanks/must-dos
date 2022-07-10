export interface Item {
    title: string;
    description?: string;
    status: boolean;
    id: string;
    priority: number;
}

export interface MustDoListProps {
    items: Array<Item>;
    completeItem: (id: string) => void;
    deleteItem: (id: string) => void;
    editItem?: (id: string) => void;
    setItemPriority?: (item: Item) => void;
}

export interface AddMustDoProps {  
addItem: (item: Item) => void;
}
