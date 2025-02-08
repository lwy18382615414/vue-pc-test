// 获取当前时间戳
const getUnix = () => {
    return new Date().getTime();
}

const getTodayUnix = () => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}
// 获取标准年月日
const getLastDate = (time: number) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
}

export const formatTimeAgo = (date: Date) => {
    const timestamp = new Date(date).getTime()
    const now = getUnix(); // 当前时间戳
    const today = getTodayUnix(); // 今天0点0分0秒时间戳
    const timer = (now - timestamp) / 1000; // 获取传递进来的时间和当前时间的差值，并转换为秒级时间戳
    let tip;
    if(timer < 60 || Math.floor(timer / 60) <= 0) {
        tip = '刚刚'
    } else if(timer < 3600) {
        tip = Math.floor(timer / 60) + ' 分钟前';
    } else if(timer >= 3600 && (timestamp - today) >= 0) {
        tip = Math.floor(timer / 3600) + ' 小时前';
    } else if((timer / 86400) <= 31){
        tip = Math.floor(timer / 86400) + ' 天前';
    } else {
        tip = getLastDate(timestamp);
    }
    return tip
}