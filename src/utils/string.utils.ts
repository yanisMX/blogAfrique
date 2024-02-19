export const stringDecode = (str : string) => {
    const strDecode = str.replace('%20', " ");
    return strDecode;
}