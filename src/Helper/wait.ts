const wait = (miliSeconds:number) => new Promise((res) => setTimeout(res,miliSeconds));
export default wait;