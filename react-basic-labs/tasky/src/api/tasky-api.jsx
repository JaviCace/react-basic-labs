
export const getTasks = async () => {
    const res = await fetch('http://localhost:8080/api/tasks');

    if (!res.ok) {
        throw new Error('Error loading tasks');
    }

    return res.json();
};

export const addTask = async (data) => {
    const res = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error('Error adding task');
    }

    return res.json();
};

export const deleteTask = async (id) => {
    const res = await fetch(
        `http://localhost:8080/api/tasks/${id}`,
        {
            method: 'DELETE'
        }
    );

    if (!res.ok) {
        throw new Error('Error deleting task');
    }

    return res;
};

export const updateTask = async (data) => {
    const res = await fetch(
        `http://localhost:8080/api/tasks/${data.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    );

    if (!res.ok) {
        throw new Error('Error updating task');
    }

    return res.json();
};
