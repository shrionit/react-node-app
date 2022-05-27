export function bearer(id_token){
    return {
        headers: {
            Authorization: `Bearer ${id_token}`,
        }
    }
}