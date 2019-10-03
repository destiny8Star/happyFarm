//app.js
import Auth from '/class/api/AuthApi.js';
import Mall from '/class/api/Mall.js';
import Index from './class/api/Index.js';
import Order from './class/api/Order.js';
import Game from './class/api/Game.js';
const index =new Index()
const auth=new Auth();
const mall =new Mall()
const order=new Order() 
const game=new Game()
App({
  auth: auth,
  mall:mall,
  index:index,
  order:order,
  game:game,
  onLaunch: function () {
   
  },
  globalData: {
    api:'https://farm.isoft.mobi/api/',
    addText: '玩命加载中...',
    endText: '—————  我也是有底线的  —————',
  }
})
