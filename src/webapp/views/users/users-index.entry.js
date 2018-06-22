import { i }  from '../../widgets/common/common.js';
import ydbanner from '../../widgets/ydbanner/ydbanner.js';
import ydfooter from '../../widgets/ydfooter/ydfooter.js';
import form from '../../widgets/form/form.js';
$(function () {
	console.log('测试公共类库的函数式编程🌲',i.add(1)(2));	
});
ydbanner.init();
ydfooter.init();
form.post();

