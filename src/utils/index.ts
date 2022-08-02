export const transformNumber2Time = (num:number) => {
    console.log((num/60));
    
    
    const MM =Math.floor (num / 60);
    const ss = num % 60;
    return `${MM<10?'0'+MM:MM}:${ss<10?'0'+ss:ss}`
}