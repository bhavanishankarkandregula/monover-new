

const initialState = [{
    orgName:''
}]


const organizationReducer = (state=initialState  ,action) =>{
    let newState = state;
    switch(action.type){
        case 'Change':
            return [{orgName:action.payload}]
        default:
            return newState;
            
    }
}
export default organizationReducer