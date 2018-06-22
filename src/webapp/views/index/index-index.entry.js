import { i } from '../../widgets/common/common.js';
import ydbanner from '../../widgets/ydbanner/ydbanner.js';
import yourshow from '../../widgets/yourshow/yourshow.js';
import ydfooter from '../../widgets/ydfooter/ydfooter.js';
ydbanner.init();
const result = i.init();
yourshow.init(result);
ydfooter.init();
$(function() {
    import ('../../widgets/common/ad.js').then((_) => {
        console.log('异步API😜', _);
        _.ad.init();
    })
})
