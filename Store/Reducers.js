export const ReducerTicket =(state={}, action) =>{
    switch (action.type) {
        case 'GENERATE':
           return action.value
           case 'SERVER_ERROR':
           return action.error
           case 'ENABLE':
      return {};
        default:
               return state;            
    }
}