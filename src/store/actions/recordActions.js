export const createRecord = (record) => {
    return (dispatch, getState) => {
        
        dispatch({
            type: "CREATE_RECORD",
            record: record
        })
    }
}