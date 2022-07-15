const API_HOST = import.meta.env.VITE_API_HOST;

export const newTask = ({ title, status, importance, description }) => {
    return fetch(`${API_HOST}/task/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            task: {
                title: title,
                status: status,
                importance: importance,
                description: description
            },
        }),
    })
};

export const getFormData = () => {
    return fetch(`${API_HOST}/auth/data`).then(response => response.json())
}

export const getAllTasks = () => {
    return fetch(`${API_HOST}/task`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
    })
        .then(response => response.json())
};

export const deleteTaskById = (id) => {
    return fetch(`${API_HOST}/task/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
    })
        .then(response => response.json())
};


export const editTask = (data) => {
    const statusArray = ['NEW','IN PROGRESS','FINISHED'];
    const newStatus = statusArray.indexOf(data.status) > 1 ? 0 : statusArray.indexOf(data.status) +1
    return fetch(`${API_HOST}/task/${data._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
        body : JSON.stringify({
            task : {
                title : data.title,
                importance : data.importance,
                status : statusArray[newStatus],
                description : data.description,
            }
        })
    })
        .then(response => response.json())
}