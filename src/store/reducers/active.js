const initialState = {
    active: 'Projects',
    org: null,
    members: null,
    orgName: ''
}

const reducer = (state = initialState, action) =>{
switch (action.type) {
    case "Active":
        return{
            active: action.link
        }
    case "SetOrg":
        // console.log(state);
        return{
            ...state,
            org: action.org
        }   
        case "SetMembers":
            // console.log(state);
            return{
                ...state,
                members: action.members
            } 
            
        case "SetOrgName":
            return {
                ...state,
                orgName: action.orgName
            }    
    default:
        return state;
}
}

export default reducer;