

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })


export const renderOption = (arr) => {
    let results = []

    if (arr) {
        results = arr?.map((opt) => {
            return {
                value: opt,
                label: opt
            }
        })
    }

    results.push({
        label: 'Thêm Type',
        value: 'add_type'
    })

    return results
}

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',','.');
        return `${result} VND`;
    }catch (error) {
        return null;
    }
}

