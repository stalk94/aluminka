export const useGroop =(key, arr)=> {
    let reducer = [];
    arr.find((tovar)=> tovar[key] && reducer.push(tovar));

    return reducer
}