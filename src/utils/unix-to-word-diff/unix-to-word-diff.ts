import moment from "moment";

export default (unix_time: number) => {
    let diff = Math.abs(moment.unix(unix_time).diff(new Date(), 'months', true))
    let year = Math.floor(diff / 12);
    let month = Math.floor(diff % 12)
    return `${year} years ${month} month`;
}