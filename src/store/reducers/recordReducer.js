const initialState = {
    records: [
        {id: "1", title: "help me", content: "tohoo"},
        {id: "2", title: "help you", content: "gdfg"},
        {id: "3", title: "help WE", content: "gfg"},
    ]
}


const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_RECORD":
            console.log("Created project", action.record.recordName);
            break;
    
        default:
            break;
    }
    return state;
}

export default recordReducer;