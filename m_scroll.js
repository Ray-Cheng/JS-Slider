var akulubala = function(){
     this.init_ = {"speed":1000,
             "direction":"bottom",//direction
             "mode":"fitful",//scroll mode durative or fitful
             "id":"akulubala_scroll",
             "auto_play":true,
             "style":{}
            };
    this.offset=null;//
    this.margin_x=0;//
    this.scroll_container=null;
    this.scroller=null;
    this.scroller_elements=0;//total elements to be scrolling
    this.intval_timer=null;//
    this.time_out_timer=null;//

}
akulubala.prototype = {

    //
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
      //
      for(var key in default_style){
              this.scroll_container.style[key] = default_style[key];
              this.scroller.style[key] = default_style[key];
      }
      //
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

      //
      this.scroller_elements = this.scroller.children.length;
      //
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
        //
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
        //
    },
    move:function(){
        var _self = this;
        this.intvalTimerStop();
        var timer_out_timer = setTimeout(function(){_self.move()},this.init_.speed/this.offset);
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
        
        var speed = this.init_.speed,offset=this.offset;
        this.scroll_container.onmouseout = function(){
                timer_out_timer = setTimeout(function(){_self.move()},speed/offset);
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
    //
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
        var _self = this;
        if(this.init_.mode==="durative"){
            this.intval_timer = setInterval(function(){_self.start()}, 0);
        }else{
            this.intval_timer = setInterval(function(){_self.start()}, this.init_.speed);
        }
    },
    intvalTimerStop:function(){
        clearInterval(this.intval_timer);
        return false;
    }
}
