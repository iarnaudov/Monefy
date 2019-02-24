export const firebaseSnapshotToArray = (snapshot) => {
    var arrayResult = [];
    snapshot.forEach((item) => {
        arrayResult.push({
            id: item.id,
            ...item.data()
        });
    });

    return arrayResult;
}