// 引入mock模块
import Mock from 'mockjs';
// 把json数据格式引入,json数据没有对外暴露，但是可以引入
// 原因：webpack默认对外暴露：img、json
import banner from './banner.json';
import floor from './floor.json';

// mock数据：第一个参数请求地址  第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner}); // 模拟首页轮播图
Mock.mock("/mock/floor",{code:200,data:floor}); // 模拟楼层轮播图