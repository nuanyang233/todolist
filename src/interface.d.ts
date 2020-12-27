interface ITodo {
    id: string,
    title: string,
    completed: boolean
}

interface ITodoItemProps {
    title: string;
    completed: boolean;
    editing: boolean;
    handleDelete: () => void;
    handleToggle: () => void;
    handleEdit: () => void;
    handleCancelEdit: () => ovid;
    handleSave: (val:any) => void;
}

interface ITodoListFooterProps {
    activeTodoCount: number;
    completedTodoCount: number;
    showState: string;
    handleChangeShowState: (e:any) => void;
    handleClearAllCompleted: () => void;
}
