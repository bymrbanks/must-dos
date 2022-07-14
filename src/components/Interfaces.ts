export interface Item {
    title: string;
    description: string;
    completed: boolean;
    id: string;
    priority: number;
    userId: string;
}

export interface MustDoListProps {
    items: Array<Item>;
    deleteItem: (id: string) => void;
    editItem?: (id: string) => void;
    setItemPriority?: (item: Item) => void;
    updateItem: (item: Item) => void;
}

export interface MustDoItemProps {
    item: Item;
    deleteItem: (id: string) => void;
    editItem?: (id: string) => void;
    setItemPriority?: (item: Item) => void;
    updateItem: (item: Item) => void;
}

export interface AddMustDoProps {
    addItem: (item: Item) => void;
}
