export default (alias: string) => {
    let split = alias.trim().split(/(\s+)/).filter(function (e) { return e.trim().length > 0; });
    alias = split[0].length > 1 ? (split[0].charAt(0)).toUpperCase() + (split[0].charAt(1)).toLocaleLowerCase() : (split[0].charAt(0)).toUpperCase()
    if (split.length >= 2) {
        alias = ((split[0].charAt(0)) + (split[1].charAt(0))).toUpperCase()
    }
    return alias
}