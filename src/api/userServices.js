const API_HOST = import.meta.env.VITE_API_HOST;

export const login = ({ userName, password }) => {
    return fetch(`${API_HOST}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: userName,
            password: password,
        }),
    })
};


export const register = ({ userName, password, email, teamID, role, continent, region }) => {
    return fetch(`${API_HOST}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                userName: userName,
                password: password,
                email: email,
                teamID: teamID,
                role: role,
                continent: continent,
                region: region,
            },
        }),
    })
        .then(response => response.json())
}