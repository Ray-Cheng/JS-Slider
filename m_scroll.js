var akulubala = {
    "init_":{"speed":1000,
             "direction":"bottom",//direction 
             "mode":"fitful",//scroll mode durative or fitful
             "id":"akulubala_scroll",
             "auto_play":true,
             "style":{}
            },
    "offset":null,//æ¯æ¬¡åç§»é‡
    "margin_x":0,//æ•°å€¼åž‹çš„ç´¯è®¡margin è®°å½•
    "scroll_container":null,
    "scroller":null,
    "scroller_elements":0,//scrollå…±æœ‰å¤šå°‘ä¸ªå…ƒç´ ï¼Œå­èŠ‚ç‚¹
    "intval_timer":null,//è®¡æ—¶timer ID
    "time_out_timer":null,//åœ¨setIntvalè®¡æ—¶å†…éƒ¨çš„timer id
    //åˆå§‹åŒ–å·¥ä½œ
     scroll : function(obj){
         if(typeof obj !=="undefined"){
            for(var key in obj){
                if(this.init_[key]){
                    this.init_[key] = obj[key];
                }
            }
        }
        this.scroll_container = document.getElementById(this.init_.id);
        this.scroller = document.getElementById(this.init_.id+"_child");
        this.styleset(this.init_.style);
        this.run();
    },
    styleset:function(style){
      var default_style = {"margin":"0px","padding":"0px"};
      //é»˜è®¤è®¾ç½®
      for(var key in default_style){
              this.scroll_container.style[key] = default_style[key];
              this.scroller.style[key] = default_style[key];    
      }
      //åˆ¤æ–­ä¸€ä¸ªå¯¹è±¡æ˜¯å¦ä¸ºç©ºå¯¹è±¡
      function isEmpty(obj){
          for(var name in obj){
              return false;
          }
          return true;
      }
      //overflow
        if(style.overflow==true){
            this.scroll_container.style.overflow = "visible";
        }else{
            this.scroll_container.style.overflow = "hidden";
        }
        
      //é•¿,å®½è‡ªå®šä¹‰
      this.scroller_elements = this.scroller.children.length;
      //è®¾ç½®åç§»é‡,å’Œé•¿å®½ï¼Œå½“æ–¹å‘ä¸ºåž‚ç›´çš„æ—¶å€™ï¼Œå› ä¸ºéœ€è¦è®¾ç½®floatæ‰€ä»¥scrollerå®½åº¦ä¸èƒ½å›ºå®šï¼Œä½†scroll_container å¯ä»¥å›ºå®š
     if(this.init_.direction == "top" || this.init_.direction == "bottom"){         
            if(!isEmpty(style)){
                this.scroll_container.style.height = style.height;
                this.scroll_container.style.width = style.width;
                this.scroller.style.height = this.scroller_elements*parseInt(this.scroll_container.style.height.replace("px",""))+"px";
                this.scroller.style.width = style.width;
            }else{
                this.scroll_container.style.height = "20px";
                this.scroll_container.style.width = "200px";
                this.scroller.style.height = this.scroller_elements*20+"px";
                this.scroller.style.width = "200px";
            }
            
            if(this.init_.direction == "bottom"){
                this.scroller.style.position = "relative";                
                this.scroller.style.top = (0-(this.scroller_elements-1)*parseInt(this.scroll_container.style.height.replace("px","")))+"px";                
            }else{
                //this.scroller.style.cssFloat = "left";
            }            
            this.offset = parseInt(this.scroll_container.style.height.replace("px",""));
     }else{
            if(!isEmpty(style)){
                this.scroll_container.style.height = style.height;
                this.scroll_container.style.width = style.width;
                this.scroller.style.height = style.height;
                this.scroller.style.width = this.scroller_elements*parseInt(this.scroll_container.style.width.replace("px",""))+"px";
            }else{
                this.scroll_container.style.height = "20px";
                this.scroll_container.style.width = "200px";
                this.scroller.style.height = "20px";
                this.scroller.style.width = this.scroller_elements*200+"px";
            }
            if(this.init_.direction == "right"){
//                this.scroll_container.style.cssFloat = "right";
//                this.scroll_container.style.position = "absolute";
                this.scroller.style.position = "relative";                
                this.scroller.style.left = (0-(this.scroller_elements-1)*parseInt(this.scroll_container.style.width.replace("px","")))+"px";                
            }else{
                this.scroller.style.cssFloat = "left";
            }
             this.offset = parseInt(this.scroll_container.style.width.replace("px",""));
     }  
    },
    run :function(){
        //å¦‚æžœè‡ªåŠ¨æ’­æ”¾ç›´æŽ¥å¼€å§‹ï¼Œå¦åˆ™ç­‰å¾…äº‹ä»¶è§¦å‘
        if(this.init_.auto_play){
            this.intvalTimerStart();
        }else{
            this.waitTrigger();
        }
        this.holdEffect();
    },
    start:function(){
            this.move();
    },
    waitTrigger:function(){
        //æš‚æ—¶æœªå¼€å‘
    },
    move:function(){
        this.intvalTimerStop();
        var timer_out_timer = setTimeout("akulubala.move()",this.init_.speed/this.offset);
        if(this.margin_x<this.offset){
            this.margin_x +=1;
        }else{        
            this.margin_x = 0;
            clearTimeout(timer_out_timer);
            if(this.init_.direction !== "bottom"){
                this.scroller.appendChild(this.scroller.children[0]);
            }else{
                this.scroller.insertBefore(this.scroller.children[this.scroller_elements-1],this.scroller.childNodes[0]);
            }         
            this.intvalTimerStart();
        }
        this.effectWork();
        this.scroll_container.onmouseover = function(){
            clearTimeout(timer_out_timer);
        }
        //è¿™é‡Œå¾ˆå¥‡æ€ª,setTimeout æ–¹æ³•é‡Œé¢ä¸èƒ½ç›´æŽ¥ä½¿ç”¨this,å“¦æ˜Žç™½äº†ï¼Œä¸‹é¢æ–¹æ³•çš„é»˜è®¤ä½œç”¨åŸŸæ˜¯moveï¼Œfunctioné‡Œé¢moveæ–¹æ³•é‡Œé¢çš„ä½œç”¨åŸŸåœ¨akulubalaé‡Œé¢
        var speed = this.init_.speed,offset=this.offset;
        this.scroll_container.onmouseout = function(){
                timer_out_timer = setTimeout("akulubala.move()",speed/offset);
        }
    },
    effectWork:function(){
        switch(this.init_.direction){
            case "top":
                this.scroller.style.marginTop = (0-this.margin_x)+"px" ; 
                break;
            case "bottom":
                this.scroller.style.top = this.margin_x-parseInt((this.scroller_elements-1)*parseInt(this.scroll_container.style.height.replace("px","")))+"px" ;
                break;
            case "left":
                this.scroller.style.marginLeft = (0-this.margin_x)+"px" ;
                break;
            case "right":
                this.scroller.style.marginLeft = this.margin_x+"px" ;
                break;
        }       
    },
    //åœæ­¢æ•ˆæžœå±•ç¤º
    holdEffect:function(){
        var obj = this;
        this.scroll_container.onmouseover = (function(obj){
            obj.intvalTimerStop();
        })(obj)
        this.scroll_container.onmouseout = (function(obj){
            obj.intvalTimerStart();
        })(obj)
    },
    intvalTimerStart:function(){
        if(this.init_.mode=="durative"){
            this.intval_timer = setInterval("akulubala.start()", 0);
            console.log(this.intval_timer)
        }else{
            this.intval_timer = setInterval("akulubala.start()", this.init_.speed);
            console.log(this.intval_timer);
        }              
    },
    intvalTimerStop:function(){
        clearInterval(this.intval_timer);
        return false;
    }    
}
