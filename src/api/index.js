//将四个模块请求的接口函数统一暴露
import * as tradeMark from './product/tradeMark';
import * as Attr from './product/Attr';
import * as Spu from './product/Spu';
import * as Sku from './product/Sku';

//引入权限相关的接口文件
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission'
//对外暴露
export default {
     tradeMark,
     Attr,
     Sku,
     Spu,
     user,
     role,
     permission
}