$(function(){
  // 定义卡片内容
  let arr = [{"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},
    {"name":'Jax-1'},{"name":'Joye-2'},{"name":'Jimmy-3'},{"name":'Jay-4'},];
  let tmp = {
    data:{           
      isLock:true, 
      zindex:0,           
      item:null,           
      clientX:0,
      clientY:0,
      offsetLeft:0,
      offsetTop:0,
      mouseX:0,
      mouseY:0,
      contentHeight:0,
      contentArray:['roll-1','roll-2','roll-3'], 
      bannerHeight:836,           
    },
    init:function(){         
      this.bind();      
      this.setCard();
      this.addition();
      this.roll(); 
    },
    bind:function(){
      // 委托绑定 item项 鼠标按下时候触发
      $('.guestbook-section').on('mousedown','.guestbook-item',this.mousedownEvent)//鼠标按下
      // 绑定容器，当容器有鼠标滑过就触发
      $('.guestbook-section').on('mousemove',this.mousemoveEvent)//鼠标移动
      // 委托绑定 item项 鼠标按起时候触发
      $('.guestbook-section').on('mouseup','.guestbook-item',this.lockMouseEvent)//鼠标触发
      // 绑定容器，如果鼠标离开触发
      $('.guestbook-section').on('mouseleave',this.lockMouseEvent)//鼠标离开
      $('.benediction-input-button').on('click',this.input)     
      $('.guestbook-section').on('click','.guestbook-item-close',this.close)
      $('.fixation-head-item').on('click',this.arrive);
      $(window).on('scroll',this.roll);          
    },
    setCard:function(){        
        let background = ['#fff0f0','#fdfbe9','#f0f5ff','#f1fff0'];
        let containerWidth   = $('.guestbook-section').width();
        let containerHeight  = $('.guestbook-section').height();
        let itemWidth        = 320;
        let itemHeight       = 160;
        let paddingOffset    = 0;
        let maxWidth         = containerWidth - itemWidth - paddingOffset;
        let maxHeight        = containerHeight - itemHeight - paddingOffset;
        let htmlCss = '';
        arr.forEach(function(card,index){
          let randomTop = tmp.randomBetween(paddingOffset,maxHeight);
          let randomLeft = tmp.randomBetween(paddingOffset,maxWidth); 
          let key = `<div class="guestbook-item" 
                      style="z-index:${index + 1};
                      background:${background[index%background.length]};                  
                      top:${randomTop}px; 
                      left:${randomLeft}px";
                      >  
                      <div class="guestbook-item-close"></div>;
                      <h5 class="guestbook-item-title">小兔兔说：</h5>;
                      <p class="guestbook-item-text">耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！</p>
                          ${card.name}
                    </div>`;
          htmlCss += key 
        })        
        $('.guestbook-section').append(htmlCss);
        // 存储与数量相关的层级数
        tmp.data.zindex = arr.length;
    }, 
    input:function(e){    
        let input = $('.benediction-input-text').val();
        input:{   
          let color = ['#fff0f0','#fdfbe9','#f0f5ff','#f1fff0'];
          let containerWidth   = $('.guestbook-section').width();
          let containerHeight  = $('.guestbook-section').height();
          let itemWidth        = 320;
          let itemHeight       = 160;
          let paddingOffset    = 0;
          let maxWidth         = containerWidth - itemWidth - paddingOffset;
          let maxHeight        = containerHeight - itemHeight - paddingOffset;
          let backgroundColor      = $(color).eq(Math.floor(Math.random()* 4))[0];
          let zindex = tmp.data.zindex +1;
          // let htmlCss = '';
          // arr.forEach(function(card,index){
            let randomTop = tmp.randomBetween(paddingOffset,maxHeight);
            let randomLeft = tmp.randomBetween(paddingOffset,maxWidth);
            let kes = ` <div class="guestbook-item" 
                          style="
                          z-index:${zindex};
                           background:${backgroundColor};                  
                          top:${randomTop}px; 
                          left:${randomLeft}px";>  
                           <div class="guestbook-item-close"></div>
                          <h5 class="guestbook-item-title">用户ID</h5>;
                          <p class="guestbook-item-text">${input}</p>                          
                        </div>`;           
        // })      
          $('.guestbook-section').append(kes);
          $('.guestbook-item-text').val('');
          tmp.data.zindex = arr.length;
        }     
    },  
    close:function(e){  
        let closeItem = $(this).parent(".guestbook-item");     
        closeItem.css("display","none");
        // $(".guestbook-item").css("display","none");
    },  
    mousedownEvent:function(event){//鼠标按下
      tmp.data.isLock = false;                  
      let clientX = event.clientX;
      let clientY = event.clientY;       
      let offsetLeft = this.offsetLeft;
      let offsetTop = this.offsetTop;
      tmp.data.clientX = clientX;
      tmp.data.clientY = clientY;
      tmp.data.offsetLeft = offsetLeft;
      tmp.data.offsetTop = offsetTop;
      let zindex = tmp.data.zindex + 1;
      $(this).css({'z-index':zindex});
      tmp.data.zindex = zindex;
      tmp.data.item = $(this);     
    },
    mousemoveEvent:function(event){//鼠标移动
      if(tmp.data.isLock){
        isLock = true;
      }else{
        let clientX = tmp.data.clientX 
        let clientY = tmp.data.clientY       
        let offsetLeft = tmp.data.offsetLeft 
        let offsetTop = tmp.data.offsetTop                    
        let donmouseX = event.clientX - clientX;
        let donmouseY = event.clientY - clientY;
        let left = offsetLeft + donmouseX; 
        let top = offsetTop + donmouseY;
        tmp.data.item.css({
        top:top,
        left:left 
        })
      }                 
    },
    lockMouseEvent:function(){//鼠标触发 离开
      // 移动结束，锁回去
      tmp.data.isLock =true;
    },    
    randomBetween:function(min,max){
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 滚动导航
    addition:function(){
      let contentArray = tmp.data.contentArray;
      let movingRange = (contentArray).map((data) =>{
        return{
          ndy:data,
          ahh:$(`#${data}`).offset().top,
        }
      })
      this.data.contentArray = movingRange;
    },
    roll:function(){
      let windowRoll = $(window).scrollTop();
      let bannerHeight = tmp.data.bannerHeight;
      if(windowRoll >= bannerHeight){
        $('.fixation-head-list').addClass('roll');
      }else{
        $('.fixation-head-list').removeClass('roll');
      }
      tmp.bright();
    },
    arrive:function(){
      let isLook = tmp.data.isLook;
      if(isLook){
        return
      }else{
        tmp.data.isLook = true;
      }
      let clickItem = $(this).data('nav');
      let movingRange = $(`#${clickItem}`).offset().top;
      let contentHeight = tmp.data.contentHeight;
      movingRange = movingRange - contentHeight;
      $('html,body').stop();
      $('html,body').animate({scrollTop:movingRange},1000)
      tmp.data.isLook = false;
    },
    bright:function(){
      let windowRoll = $(window).scrollTop();
      let contentArray = this.data.contentArray;
      let contentHeight = tmp.data.contentHeight;
      let storage = '';
      contentArray.forEach((data) =>{
        if(windowRoll >= data.ahh - contentHeight){
        storage = data.ndy;
      }
      })       
    },
  }
  tmp.init();
})






