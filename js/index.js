const PAGE = {
	data:{
		backgroundColor:['#fff0f0','#fdfbe9','#f0f5ff','#f1fff0'],
		cardItem:[{name:'card-01'},{name:'card-02'},{name:'card-03'},{name:'card-04'},{name:'card-01'},{name:'card-02'},{name:'card-03'},{name:'card-04'},{name:'card-01'},{name:'card-02'},{name:'card-03'},{name:'card-04'},{name:'card-01'},{name:'card-02'},{name:'card-03'},{name:'card-04'},{name:'card-01'},{name:'card-02'},{name:'card-03'},{name:'card-04'},{name:'card-01'},{name:'card-02'},{name:'card-03'},{name:'card-04'},{name:'card-01'},{name:'card-02'},{name:'card-03'},{name:'card-04'},{name:'card-01'},{name:'card-02'},{name:'card-03'},{name:'card-04'},],
		itemWidth:320,       
    itemHeight:160,      
    padding:0,    
		item:null,
		pageX:null,
		pageY:null,
		itemOffsetTop:null,
		itemOffsetLeft:null,
		isLock:true,
		zIndex:0,
	},
	init:function(){
		// this.addItem();
		this.bind();
	},
	bind:function(){
		let guestBookSection = document.getElementById('guestbook-section');
		this.onEventLister(guestBookSection,'mousedown','guestbook-item',this.handDown);
		window.addEventListener('mousemove',this.handMove);
		window.addEventListener('mouseup',this.handMouseUp);
		let input = document.getElementById('benediction-input-button');
		input.addEventListener('click',this.input);
		this.onEventLister(guestBookSection,'click','guestbook-item-close',this.remove); 
	},
	onEventLister: function(parentNode,action,childClassName,callback) {
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  handDown:function(e){
  	let item = e.target;
  	let zIndex = item.style.zIndex;
  	item.style.zIndex = zIndex + 1;
  	PAGE.data.itemOffsetTop = item.offsetTop;
  	PAGE.data.itemOffsetLeft = item.offsetLeft;
  	PAGE.data.pageX = e.pageX;
  	PAGE.data.pageY = e.pageY;
  	PAGE.data.item = item;
  	PAGE.data.isLock = false;
  },
  handMove:function(e){
  	// if(!PAGE.data.isLock){
	  // 	let guestBookSection = document.getElementById('guestbook-section');
	  // 	let contentWidth = guestBookSection.offsetWidth;
			// let contentHeight = guestBookSection.offsetHeight;
			// let itemWidth = PAGE.data.itemWidth;
			// let itemHeight = PAGE.data.itemHeight;
			// let padding = PAGE.data.padding;
			// let maxWidth = contentWidth - itemWidth - padding;
			// let maxHeight = contentHeight - itemHeight - padding;
		 //  let translateX = e.pageX - PAGE.data.pageX + PAGE.data.itemOffsetLeft;
		 //  let translateY = e.pageY - PAGE.data.pageY + PAGE.data.itemOffsetTop;
		 //  translateX = translateX > maxWidth? maxWidth:translateX;
		 //  translateY = translateY > maxHeight? maxHeight:translateY;
		 //  translateX = translateX < padding? padding : translateX;
		 //  translateY = translateY < padding? padding : translateY;
		 //  PAGE.data.item.style.left =  translateX + 'px';
		 //  PAGE.data.item.style.top =  translateY + 'px';
  	// }
  	if(PAGE.data.isLock){
      isLock = true;
    }else{
      let pageX = PAGE.data.pageX 
      let pageY = PAGE.data.pageY       
      let itemoffsetLeft = PAGE.data.itemOffsetLeft; 
      let itemoffsetTop = PAGE.data.itemOffsetTop;
      let donmouseX = e.pageX - pageX;
      let donmouseY = e.pageY - pageY;
      let left = itemoffsetLeft + donmouseX; 
      let top = itemoffsetTop + donmouseY;
      PAGE.data.item.style.left = left + 'px';
      PAGE.data.item.style.top = top + 'px';      
    }              
  },
  handMouseUp:function(){
  	PAGE.data.isLock = true;
  },
	addItem:function(e){
		let guestBookSection = document.getElementById('guestbook-section');
		let contentWidth = guestBookSection.offsetWidth;
		let contentHeight = guestBookSection.offsetHeight;
		let itemWidth = PAGE.data.itemWidth;
		let itemHeight = PAGE.data.itemHeight;
		let padding = PAGE.data.padding;
		let maxWidth = contentWidth - itemWidth - padding;
		let maxHeight = contentHeight - itemHeight - padding;
		let background = PAGE.data.backgroundColor
		let cardItem = PAGE.data.cardItem;
		let arr = cardItem.map((card,index)=>{
			let randomHeight = PAGE.randomSection(padding,maxHeight);
			let randomWidth = PAGE.randomSection(padding,maxWidth);
			return `
				<div class="guestbook-item" 
          style="z-index:${index + 1};
          background:${background[index%background.length]};                  
          top:${randomHeight}px; 
          left:${randomWidth}px";
          >  
          <div class="guestbook-item-close"></div>;
          <h5 class="guestbook-item-title">小兔兔说：</h5>;
          <p class="guestbook-item-text">耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！</p>
              ${card.name}
        </div>`;
		}).join('');
		guestBookSection.innerHTML = arr;
	},
	input:function() {
		let benedictionInputText = document.getElementById('benediction-input-text');
		let input = benedictionInputText.value;
		let guestBookSection = document.getElementById('guestbook-section');
		let contentWidth = guestBookSection.offsetWidth;
		let contentHeight = guestBookSection.offsetHeight;
		let itemWidth = PAGE.data.itemWidth;
		let itemHeight = PAGE.data.itemHeight;
		let padding = PAGE.data.padding;
		let maxWidth = contentWidth - itemWidth - padding;
		let maxHeight = contentHeight - itemHeight - padding;
		let zIndex = ++PAGE.data.zIndex;
		
		let background = PAGE.data.backgroundColor
		let cardItem = 1;
		let randomHeight = PAGE.randomSection(padding,maxHeight);
		let randomWidth = PAGE.randomSection(padding,maxWidth);		
	 	let guestbookItem = document.createElement('div');
	 	let guestbookItemClose = document.createElement('div');
	 	let guestbookItemTitle = document.createElement('div');
	 	let guestbookItemText = document.createElement('div');
	 	guestbookItem.setAttribute('class','guestbook-item');
	 	guestbookItemClose.setAttribute('class','guestbook-item-close');
	 	guestbookItemTitle.setAttribute('class','guestbook-item-title');
	 	guestbookItemText.setAttribute('class','guestbook-item-text');
	 	guestbookItemTitle.innerText = '某用户';
	 	guestbookItemText.innerText = input;
	 	let add = `
	 		z-index:${zIndex};
	 	 	background:${background[zIndex%background.length]};                  
	 	 	top:${randomHeight}px; 
	 	 	left:${randomWidth}px;
	 	 	font-size:10px;`
	 	guestbookItem.setAttribute('style',add);
	 	guestbookItem.appendChild(guestbookItemClose);
	 	guestbookItem.appendChild(guestbookItemTitle);
	 	guestbookItem.appendChild(guestbookItemText);
	      
		guestBookSection.appendChild(guestbookItem);
	},
	randomSection:function(min,max){
    return Math.floor(Math.random() * (max - min) + min);
  },
  remove:function(e){ 	
  	let item = e.target.parentNode;
  	item.remove()
  },
	
}
PAGE.init();