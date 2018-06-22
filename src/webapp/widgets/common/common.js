let  common = () => {};
common.VERSION = '1.0.0';
common.init = function() {
	return "fp init 💻";
};
common.add = (x)=>{
    return function(y){
        return x + y
    }
}
export default common;
export {
   common as i
};