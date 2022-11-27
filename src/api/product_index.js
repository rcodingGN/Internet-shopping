// 将四个模块请求的接口函数统一暴露
import * as trademark from './product/tradeMark';
import * as Attr from './product/Attr';
import * as Sku from './product/Sku';
import * as Spu from './product/Spu';


// 对外暴露
export default {
    trademark,
    Sku,
    Spu,
    Attr
}