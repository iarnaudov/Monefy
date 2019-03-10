export const firebaseSnapshotToArray = (snapshot) => {
    var arrayResult = [];
    if(!snapshot) {
        return
    }
    snapshot.forEach((item) => {
        arrayResult.push({
            id: item.id,
            ...item.data()
        });
    });

    return arrayResult;
}