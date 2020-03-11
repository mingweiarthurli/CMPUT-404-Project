export const AdminMethodSwitch = action => {
    let method = action.slice(0,1);
    switch(method){
        case 'a':
            method = 'POST'
            break
        case 'u':
            method = 'PUT'
            break
        case 'd':
            method = 'DELETE'
            break
        default:
            break
    }
    return method;
}