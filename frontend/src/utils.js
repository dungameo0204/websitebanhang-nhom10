export const getBase64 = (file) => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve (reader.result);
        reader.onerror = (error) => reject(error);
    })


export const renderOption = (arr) => {
    let results = []

    if (arr){
        results = arr?.map((opt) => {
            return {
                value : opt,
                label : opt
            }
        })
    }

    results.push ({
        label : 'Thêm Type',
        value : 'add_type' 
    })

    return results
<<<<<<< HEAD
}

//Thừa ----
// export const isJsonString = (data) => {
//     console.log('debug', data)
//     // if (typeof data !== "string") return false;
    
//     try {
//         JSON.parse(data)
//     } catch (error) {
//         return false
//     }
//     return true
// }

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
=======
>>>>>>> bd266dde0a9c8ada150d2a2f6be657a2d635fceb
}