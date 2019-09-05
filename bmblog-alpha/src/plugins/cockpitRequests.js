export async function getCollection(cmsPath, token, collectionName) {
    const response = await fetch(`${cmsPath}/api/collections/get/${collectionName}?token=${token}`);
    const data = await response.json();
    return data.entries;
}

export async function getSingleton(cmsPath, token, singletonName) {
    const response = await fetch(`${cmsPath}/api/singletons/get/${singletonName}?token=${token}`);
    const data = await response.json();
    return data;
}

export async function deleteCollectionItem(cmsPath, token, collectionName, id) {
    const response = await fetch(`${cmsPath}/api/collections/remove/${collectionName}?token=${token}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            filter: { _id: id }
        })
    });
    const data = await response.json();
    return data;
}

export async function addCollectionItem(cmsPath, token, collectionName, data) {
    console.log('sa');
    const response = await fetch(`${cmsPath}/api/collections/save/${collectionName}?token=${token}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: data
        })
    });
    const res = await response.json();
    return res;
}

export async function getAssets(cmsPath, token, filter) {
    const response = await fetch(`${cmsPath}/api/cockpit/assets?token=${token}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            filter: filter || null
        })
    });
    const res = await response.json();
    return res;
}

export async function addAsset(cmsPath, token, formData) {
    const response = await fetch(`${cmsPath}/api/cockpit/addAssets?token=${token}`, {
        method: 'post',
        headers: { 'Accept': 'application/json' },
        body: formData
    });
    const res = await response.json();
    return res;
}